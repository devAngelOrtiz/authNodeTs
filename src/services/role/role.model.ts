import { DataTypes, Model, Sequelize } from "sequelize";
import { Permission } from "./permission.model.js";
import { RolePermission } from "./rolepermission.model.js";
import { User } from "../user/user.model.js";
import { modelsMap } from "../../utils/util.js";

export class Role extends Model {
	declare id: number;
	declare code: string;
	//declare description: string;

	declare readonly createdAt: Date;
	declare readonly updatedAt: Date;
}

modelsMap['role'] = Role

export function init(sequelize:Sequelize) {
	Role.init(
		{
			id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
			//description: {
			//	type: DataTypes.STRING,
			//	allowNull: false,
			//},
			code: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
			},
		},
		{
			sequelize,
			modelName: "Role",
			timestamps: true,
		}
	);
}

export function assoc() {
	Role.belongsToMany(Permission, {
		through: RolePermission,
		as: "permissions",
		foreignKey: "roleId",
	});

	Role.hasMany(User, { foreignKey: "roleId", as: "users" });
}
