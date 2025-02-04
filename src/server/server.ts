import Ajv from "ajv";
import addFormats from "ajv-formats";
import ajvErrors from "ajv-errors";
import cors from "@fastify/cors";
import fastify, { FastifyInstance, FastifyRequest } from "fastify";
import fastifyRequestLogger from "@mgcrea/fastify-request-logger";
import helmet from "@fastify/helmet";
import jwt from "@fastify/jwt";
import rateLimit from "@fastify/rate-limit";

import allRoutes from "./routes.js";
import { connectDB } from "../config/db.js";
import { SERVER, JWT } from "../config/env.js";
import { authByToken, checkPermission, customErrorHandler, signUser, userAgentHeaders } from "./custom.middleware.js";
import { IUserDecoded } from "../services/user/user.model.js";
import { Session } from "../services/session/session.model.js";

//logs
const app: FastifyInstance = fastify({
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

//schemas
const ajv = new Ajv({
	removeAdditional: true,
	coerceTypes: true,
	useDefaults: true,
	allErrors: true,
});
addFormats(ajv);
ajvErrors(ajv);
app.setValidatorCompiler(({ schema }) => ajv.compile(schema));

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

//middlewares
declare module "fastify" {
	export interface FastifyInstance {
		authByToken: any;
		signUser: any;
		checkPermission: any;
		agentSchema:any
	}
	export interface FastifyRequest {
		userDecoded: IUserDecoded;
		session: Session;
	}
}
app.decorate("checkPermission", checkPermission);
app.decorate("authByToken", authByToken);
app.decorate("agentSchema", userAgentHeaders);


//auth
app.register(jwt, {
	secret: JWT.secret,
	sign: { expiresIn: JWT.expires },
});
app.decorate("signUser", signUser);

//Error handler
app.setErrorHandler(customErrorHandler);

app.register(allRoutes, { prefix: "/api/v1" });

async function startServer() {
	await connectDB(app.log);
	app.listen({ port: SERVER.port }, async (err: Error | null) => {
		if (err) {
			app.log.fatal(err);
			throw err;
		}
	});
}

export { app, startServer };
