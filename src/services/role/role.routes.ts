import {
	FastifyInstance,
	FastifyPluginAsync,
	FastifyPluginOptions,
	FastifyReply,
	FastifyRequest,
} from "fastify";
import { CreateController } from "./create/create.controller.js";

import { roleInputSchema, roleOutputSchema } from "./create/create.schema.js";
import { roleUpdateInputSchema, roleUpdateOutputSchema } from "./update/update.schema.js";
import { UpdateController } from "./update/update.controller.js";

const createController: CreateController = new CreateController();
const updateController: UpdateController = new UpdateController();

const codePermission: string = "role";

const roleRoutes: FastifyPluginAsync = async (
	server: FastifyInstance,
	opts: FastifyPluginOptions
) => {
	server.post(
		"/",
		{
			preHandler: [server.authByToken, server.checkPermission(codePermission, "C")],
			schema: {
				headers: server.agentSchema,
				body: roleInputSchema,
				response: {
					201: roleOutputSchema,
				},
			},
		},
		async (req: FastifyRequest, reply: FastifyReply) => createController.create(req, reply)
	);

	server.put(
		"/access",
		{
			preHandler: [server.authByToken, server.checkPermission(codePermission, "U")],
			schema: {
				headers: server.agentSchema,
				body: roleUpdateInputSchema,
				response: {
					201: roleUpdateOutputSchema,
				},
			},
		},
		async (req: FastifyRequest, reply: FastifyReply) => updateController.update(req, reply)
	);
};

export default roleRoutes;
