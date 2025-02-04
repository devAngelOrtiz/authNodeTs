import { FastifyReply, FastifyRequest } from "fastify";
import { RoleService } from "./create.service.js";

export class CreateController {
	private roleService: RoleService;

	constructor() {
		this.roleService = new RoleService();
	}

	async create(request: FastifyRequest, reply: FastifyReply) {
		const role = await this.roleService.create(request.body);

		reply.status(201).send(role);
	}
}
