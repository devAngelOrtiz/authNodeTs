import {
	FastifyInstance,
	FastifyPluginAsync,
	FastifyPluginOptions,
	FastifyReply,
	FastifyRequest,
} from "fastify";
import { SignUpController } from "./signup/signup.controller.js";
import { SignInController } from "./signin/signin.controller.js";
import { LogOutController } from "./logout/logout.controller.js";

import { userInputSchema, userOutputSchema } from "./signup/signup.schema.js";
import { IUserBody } from "src/services/user/user.model.js";
import { singInInputSchema } from "./signin/signin.schema.js";
import { signInOutputSchema } from "./signin/signin.schema.js";
import { newPasswordInputSchema, recoveryInputSchema } from "./recovery/recovery.schema.js";
import { RecoveryController } from "./recovery/recovery.controller.js";

const signUpController: SignUpController = new SignUpController();
const signInController: SignInController = new SignInController();
const logOutController: LogOutController = new LogOutController();
const recoveryController: RecoveryController = new RecoveryController();

const userRoutes: FastifyPluginAsync = async (
	server: FastifyInstance,
	opts: FastifyPluginOptions
) => {
	server.post(
		"/",
		{
			schema: {
				headers: server.agentSchema,
				body: userInputSchema,
				response: {
					201: userOutputSchema,
				},
			},
		},
		async (req: FastifyRequest<{ Body: IUserBody }>, reply: FastifyReply) =>
			signUpController.signUp(req, reply)
	);

	server.post(
		"/sign-in",
		{
			//config: {
			//	rateLimit: {
			//		max: 3,
			//		timeWindow: "1 minute",
			//	},
			//},
			schema: {
				headers: server.agentSchema,
				body: singInInputSchema,
				response: {
					201: signInOutputSchema,
				},
			},
		},
		async (req: FastifyRequest<{ Body: IUserBody }>, reply: FastifyReply) =>
			signInController.signIn(req, reply)
	);

	server.post(
		"/recovery",
		{
			schema: {
				headers: server.agentSchema,
				body: recoveryInputSchema,
				response: {
					201: server.statusEndSchema,
				},
			},
		},
		async (req: FastifyRequest<{ Body: IUserBody }>, reply: FastifyReply) =>
			recoveryController.recovery(req, reply)
	);

	server.put(
		"/new-password",
		{
			preHandler: [server.recoveryByToken],
			schema: {
				headers: server.agentSchema,
				body: newPasswordInputSchema,
				response: {
					201: server.statusEndSchema,
				},
			},
		},
		async (req: FastifyRequest<{ Body: IUserBody }>, reply: FastifyReply) =>
			recoveryController.newPassword(req, reply)
	);

	server.delete(
		"/log-out",
		{
			preHandler: [server.authByToken],
			schema: {
				headers: server.agentSchema,
				response: {
					201: server.statusEndSchema,
				},
			},
		},
		async (req: FastifyRequest<{ Body: IUserBody }>, reply: FastifyReply) =>
			logOutController.logOut(req, reply)
	);
};

export default userRoutes;
