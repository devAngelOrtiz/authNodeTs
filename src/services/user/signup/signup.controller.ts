import { errorCodes, FastifyReply, FastifyRequest } from "fastify";
import { SignUpService } from "./signup.service.js";
import { IUserBody } from "src/services/user/user.model.js";

export class SignUpController {
	private signUpService: SignUpService;

	constructor() {
		this.signUpService = new SignUpService();
	}

	async signUp(request: FastifyRequest<{ Body: IUserBody }>, reply: FastifyReply) {
		const user = await this.signUpService.registerUser(
			request.body,
			request.headers["user-agent"],
			request.server
		);

		reply.status(201).send(user);
	}
}
