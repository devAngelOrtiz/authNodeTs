import {
	FastifyInstance,
	FastifyPluginAsync,
	FastifyPluginOptions,
	FastifyReply,
	FastifyRequest,
} from "fastify";
import { SignUpController } from "./signup/signup.controller.js";
import { userInputSchema, userOutputSchema, userAgentHeaders } from "./signup/signup.schema.js";
import { IUser } from "src/services/user/user.model.js";

const signUpController: SignUpController = new SignUpController();

const userRoutes: FastifyPluginAsync = async (
	server: FastifyInstance,
	opts: FastifyPluginOptions
) => {
	server.post(
		"/",
		{
			schema: {
				headers: userAgentHeaders,
				body: userInputSchema,
				response: {
					201: userOutputSchema,
				},
			},
		},
		async (req: FastifyRequest<{ Body: IUser }>, reply: FastifyReply) =>
			signUpController.signUp(req, reply)
	);
};

export default userRoutes;
