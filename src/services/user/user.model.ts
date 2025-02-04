import { DataTypes, Model, Sequelize } from "sequelize";
import { Session } from "../session/session.model.js";
import { Role } from "../role/role.model.js";
import { modelsMap } from "../../utils/util.js";
import bcrypt from "bcrypt";

export interface IUserBody {
	email: string;
	password: string;
	name: string;
	roleId:number
}

export interface IUserDecoded {
	sessionId: number;
	userId: string;
	roleId: number;
	session: Session;
}

export class User extends Model {
	declare id: string;
	declare email: string;
	declare password: string;
	declare name: string;
	declare roleId: number;

	declare readonly createdAt: Date;
	declare readonly updatedAt: Date;

	public async validatePassword(password: string): Promise<boolean> {
		return await bcrypt.compare(password, this.get("password"));
	}
}

modelsMap["user"] = User;

export function init(sequelize: Sequelize) {
	User.init(
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
				validate: {
					isEmail: true,
				},
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			roleId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: "Role",
					key: "id",
				},
				onUpdate: "CASCADE",
				onDelete: "RESTRICT",
			},
		},
		{
			sequelize,
			modelName: "User",
			timestamps: true,
			hooks: {
				beforeCreate: async function (user) {
					user.set("password", await bcrypt.hash(user.get("password"), 10));
				},
				beforeUpdate: async function (user) {
					if (user.changed("password")) {
						user.set("password", await bcrypt.hash(user.get("password"), 10));
					}
				},
			},
			//defaultScope: {
			//	attributes: {
			//		exclude: ['password']
			//	},
			//}
		}
	);
}

export function assoc() {
	User.belongsTo(Role, { foreignKey: "roleId", as: "role" });
}
