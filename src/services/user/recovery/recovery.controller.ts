import { FastifyReply, FastifyRequest } from "fastify";
import { RecoveryService } from "./recovery.service.js";
import { IUserBody } from "src/services/user/user.model.js";

export class RecoveryController {
	private recoveryService: RecoveryService;

	constructor() {
		this.recoveryService = new RecoveryService();
	}

	async recovery(request: FastifyRequest<{ Body: IUserBody }>, reply: FastifyReply) {
		const user = await this.recoveryService.recovery(request.body.email, request.server);

		reply.status(201).send({ msg: "check_your_mail" });
	}

	async newPassword(request: FastifyRequest<{ Body: IUserBody }>, reply: FastifyReply) {
		const user = await this.recoveryService.newPassword(request.userDecoded.user, request.body.password);

		reply.status(201).send({ msg: "login_again" });
	}
}
