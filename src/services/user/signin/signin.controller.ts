import { FastifyReply, FastifyRequest } from "fastify";
import { SignInService } from "./signin.service.js";
import { IUser } from "src/services/user/user.model.js";

export class SignInController {
	private signInService: SignInService;

	constructor() {
		this.signInService = new SignInService();
	}

	async signIn(request: FastifyRequest<{ Body: IUser }>, reply: FastifyReply) {
		const user = await this.signInService.singIn(
			request.body,
			request.headers["user-agent"],
			request.server.signUser
		);

		reply.status(201).send(user);
	}
}
