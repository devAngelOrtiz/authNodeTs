import { RoleRepository } from "../role.repository.js";
import { sequelize } from "../../../config/db.js";
import { createError } from "../../../utils/util.js";

export class RoleService {
	private roleRepository: RoleRepository;

	constructor() {
		this.roleRepository = new RoleRepository();
	}

	async create(body: any) {
		const transaction = await sequelize.transaction();

		try {
			const alreadyExistRole = await this.roleRepository.getByCode(body.code);

			if (alreadyExistRole) throw createError(400, "code_alredyExists");

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
