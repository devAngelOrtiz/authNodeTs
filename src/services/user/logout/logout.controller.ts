import { FastifyReply, FastifyRequest } from "fastify";
import { LogOutService } from "./logout.service.js";
import { IUser } from "src/services/user/user.model.js";

export class LogOutController {
	private logOutService: LogOutService;

	constructor() {
		this.logOutService = new LogOutService(  );
	}

	async logOut(request: FastifyRequest, reply: FastifyReply) {
			const user = await this.logOutService.logOut(request.user.sessionId, request.headers["user-agent"]);

			reply.status(201).send(user);
	}
}
