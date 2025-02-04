import { RoleRepository } from "../role.repository.js";
import { sequelize } from "../../../config/db.js";

export class UpdateService {
	private roleRepository: RoleRepository;

	constructor() {
		this.roleRepository = new RoleRepository();
	}

	async updateAccess(permissions: any) {
		const transaction = await sequelize.transaction();

		try {
			const updatePermissions = [];
			for (const permission of permissions) {
				updatePermissions.push(await this.roleRepository.updateOrCreateAccess(permission, transaction));
			}

			await transaction.commit();

		} catch (error) {
			await transaction.rollback();
			throw error;
		}
	}
}
