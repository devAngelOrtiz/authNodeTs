import { FastifyInstance, FastifyPluginAsync, FastifyPluginOptions, FastifyReply, FastifyRequest, FastifyServerOptions } from "fastify";
import authRoutes from "../services/user/user.routes.js";

const allRoutes:FastifyPluginAsync  = async (server: FastifyInstance, opts: FastifyPluginOptions) => {
	server.register(authRoutes,{ prefix: "/user" });

	server.get("/", async function (request:FastifyRequest, reply:FastifyReply) {
		await new Promise((resolve) => setTimeout(resolve, 100));
		reply.send({ hello: "konfio" });
	});
};

export default allRoutes;