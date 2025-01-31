import fastify, { FastifyError, FastifyReply, FastifyRequest } from "fastify";
import helmet from "@fastify/helmet";
import rateLimit from "@fastify/rate-limit";
import cors from "@fastify/cors";
import jwt from "@fastify/jwt";
import auth from "@fastify/auth";
import postgres from "@fastify/postgres";
import fastifyRequestLogger from "@mgcrea/fastify-request-logger";

import { DB, SERVER, JWT } from "../config/env.js";

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
//db
app.register(postgres, { connectionString: DB.credential });
//auth
app.register(jwt, { secret: JWT.secret });
app.register(auth);

app.setErrorHandler(function (error: FastifyError, request:FastifyRequest, reply:FastifyReply) {
	const statusCode: number = error.statusCode || 500;
	const msg: string = error.statusCode ? error.message : "Internal Server Error";
	const lvl: "fatal" | "error" = error.statusCode ? "error" : "fatal";

	request.log[lvl](`===> ${statusCode}: ${msg}`);

	reply.status(statusCode).send({ msg });
});


app.get("/", async function (request, reply) {
	await new Promise((resolve) => setTimeout(resolve, 100));
	reply.send({ hello: "world" });
});

function startServer() {
	app.listen({ port: SERVER.port }, async (err) => {
		if (err) {
			app.log.fatal(err);
			throw err;
		}
		app.log.info("=================================================");
	});
}

export { app, startServer };
