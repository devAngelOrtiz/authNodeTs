import Ajv from "ajv";
import addFormats from "ajv-formats";
import ajvErrors from "ajv-errors";
import auth from "@fastify/auth";
import cors from "@fastify/cors";
import fastify, { FastifyError, FastifyReply, FastifyRequest } from "fastify";
import fastifyRequestLogger from "@mgcrea/fastify-request-logger";
import helmet from "@fastify/helmet";
import jwt from "@fastify/jwt";
import rateLimit from "@fastify/rate-limit";

import allRoutes from "./routes.js";
import { connectDB } from "../config/db.js";
import { SERVER, JWT } from "../config/env.js";
import { getErrorsMessage } from "../utils/util.js";
import { IUserDecoded } from "../services/user/user.model.js";

//logs
const app = fastify({
	logger: {
		level: SERVER.logger.level,
		transport: {
			target: "@mgcrea/pino-pretty-compact",
			options: {
				translateTime: "yyyy-mm-dd HH:MM:ss Z",
				ignore: "pid,hostname",
				colorize: true,
				levelFirst: true,
			},
		},
	},
	disableRequestLogging: true,
	trustProxy: true,
});
app.register(fastifyRequestLogger);

//shcmeas
const ajv = new Ajv({
	removeAdditional: true,
	coerceTypes: true,
	useDefaults: true,
	allErrors: true,
});
addFormats(ajv);
ajvErrors(ajv);
app.setValidatorCompiler(({ schema }) => {
	return ajv.compile(schema);
});

//security
app.register(helmet);
app.register(cors, { origin: SERVER.cors });
await app.register(rateLimit, {
	global: true,
	max: SERVER.rate.max,
	timeWindow: SERVER.rate.timeWindow,
	errorResponseBuilder: (_req: FastifyRequest, _cont: any) => ({
		statusCode: 429,
		message: "Too Many Requests",
	}),
});

//auth
app.register(jwt, {
	secret: JWT.secret,
	sign: {
		expiresIn: JWT.expires,
	},
});
declare module "fastify" {
	export interface FastifyInstance {
		authByToken: any;
		signUser:any
	}
}
app.decorate("signUser", async (userId:string , sessionId:string ) => {
	return await app.jwt.sign({
		userId:userId,
		sessionId: sessionId,
	});
});
app.decorate("authByToken", async (req: FastifyRequest, reply: FastifyReply) => {
	const token = req.headers.authorization;

	if (!token) return reply.status(401).send({ message: "token_required" });

	req.user =await req.jwtVerify();
	//console.log(req.user);
});
declare module "@fastify/jwt" {
	interface FastifyJWT {
		user: IUserDecoded;
	}
}

app.register(allRoutes, { prefix: "/api/v1" });

app.setErrorHandler(function (error: FastifyError, request: FastifyRequest, reply: FastifyReply) {
	const statusCode: number = error.statusCode || 500;
	const msg: string | string[] = error.statusCode
		? getErrorsMessage(error)
		: "Internal Server Error";
	const lvl: "fatal" | "error" = error.statusCode ? "error" : "fatal";

	request.log[lvl](`===> ${statusCode}: ${msg}`);

	reply.status(statusCode).send({ msg: msg });
});

async function startServer() {
	await connectDB(app.log);
	app.listen({ port: SERVER.port }, async (err: Error | null) => {
		if (err) {
			app.log.fatal(err);
			throw err;
		}
		app.log.info("=================================================");
	});
}

export { app, startServer };
