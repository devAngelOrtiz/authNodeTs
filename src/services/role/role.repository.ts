import { Role } from "./role.model.js";
import { RolePermission } from "./rolepermission.model.js";
import { Permission } from "./permission.model.js";
import { Transaction } from "sequelize";

export class RoleRepository {
	async create(roleData: any, transaction?: Transaction): Promise<Role> {
		return await Role.create(roleData, { transaction });
	}

	async getByCode(code: string, transaction?: Transaction): Promise<Role | null> {
		return await Role.findOne({ where: { code }, transaction });
	}

	//async createPermission(permission: any): Promise<Permission> {
	//	return await Permission.create(permission);
	//}

	async findPermission(code: string): Promise<Permission | null> {
		return await Permission.findOne({
			where: { code },
		});
	}

	async findRolePermission(roleId: number, permissionId: number): Promise<RolePermission | null> {
		return await RolePermission.findOne({
			where: { roleId, permissionId },
		});
	}

	async bulkCreatereateRolePermission(
		permissions: any[],
		transaction?: Transaction
	): Promise<RolePermission[]> {
		return await RolePermission.bulkCreate(permissions, { transaction, returning: true });
	}

	async updateOrCreateAccess(
		data: any,
		transaction?: Transaction
	): Promise<RolePermission> {
		const [update, created] = await RolePermission.upsert(data, {
			transaction,
		});
		return update || created;
	}
}
