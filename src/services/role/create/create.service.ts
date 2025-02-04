import { FastifyError } from "fastify";
import { RoleRepository } from "../role.repository.js";
import { sequelize } from "../../../config/db.js";

export class RoleService {
	private roleRepository: RoleRepository;

	constructor() {
		this.roleRepository = new RoleRepository();
	}

	async create(body: any) {
		const transaction = await sequelize.transaction();

		try {
			const alreadyExistRole = await this.roleRepository.getByCode(body.code);

			if (alreadyExistRole) {
				throw { statusCode: 400, message: "code_alredyExists" } as FastifyError;
			}

			const role = await this.roleRepository.create(body, transaction);

			const permissionRecords = body.permissions.map((permmission: any) => ({
				roleId: role.id,
				permissionId: permmission.permissionId,
				crud: permmission.crud,
			}));

			const permissions = await this.roleRepository.bulkCreatereateRolePermission(
				permissionRecords,
				transaction
			);

			role.dataValues.permissions = permissions;

			await transaction.commit();

			return role;
		} catch (error) {
			await transaction.rollback();
			throw error;
		}
	}
}
