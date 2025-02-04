import { DataTypes, Model, Sequelize } from "sequelize";
import { RolePermission } from "./rolepermission.model.js";
import { Role } from "./role.model.js";
import { modelsMap } from "../../utils/util.js";

export class Permission extends Model {
	declare id: number;
	declare code: string;

	declare readonly createdAt: Date;
	declare readonly updatedAt: Date;
}

modelsMap["permission"] = Permission;

export function init(sequelize: Sequelize) {
	Permission.init(
		{
			id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
			code: {
				type: DataTypes.STRING,
				allowNull: false,
			},
		},
		{
			sequelize,
			modelName: "Permission",
			timestamps: true,
		}
	);
}

export function assoc() {
	Permission.belongsToMany(Role, {
		through: RolePermission,
		as: "roles",
		foreignKey: "permissionId",
	});
}
