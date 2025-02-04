import { FastifyReply, FastifyRequest } from "fastify";
import { UpdateService } from "./update.service.js";

export class UpdateController {
	private updateService: UpdateService;

	constructor() {
		this.updateService = new UpdateService();
	}

	async update(request: FastifyRequest, reply: FastifyReply) {
		const role = await this.updateService.updateAccess(request.body);

		reply.status(201).send(role);
	}
}
