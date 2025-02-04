import { DataTypes, Model, Sequelize } from "sequelize";
import { modelsMap } from "../../utils/util.js";

export class RolePermission extends Model {
	declare roleId: number;
	declare permissionId: number;
	declare crud: boolean[];

	declare readonly createdAt: Date;
	declare readonly updatedAt: Date;
}

modelsMap['rolePermission'] = RolePermission

export function init(sequelize:Sequelize) {
	RolePermission.init(
		{
			roleId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: "Roles",
					key: "id",
				},
			},
			permissionId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: "Permissions",
					key: "id",
				},
			},
			crud: {
				type: DataTypes.ARRAY(DataTypes.BOOLEAN),
				allowNull: false,
				defaultValue: [false, false, false, false],
			},
		},
		{
			sequelize,
			modelName: "RolePermission",
			timestamps: true,
			indexes: [
				{
					unique: true,
					fields: ["roleId", "permissionId"],
				},
			]
		}
	);
	
}
