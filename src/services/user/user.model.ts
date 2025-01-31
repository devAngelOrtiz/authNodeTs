import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../config/db.js";
import bcrypt from "bcrypt";

export interface IUser {
	email: string;
	password: string;
	name: string;
} 


export class User extends Model {
	public id!: string;
	public email!: string;
	public password!: string;
	public name!: string;

	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;

	public async validatePassword(password: string): Promise<boolean> {
		return await bcrypt.compare(password, this.dataValues.password);
	}
}

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
	},
	{
		sequelize,
		modelName: "User",
		timestamps: true,
		hooks: {
			beforeCreate: async function (user) {
				user.dataValues.password = await bcrypt.hash(user.dataValues.password, 10);
			},
			beforeUpdate: async function (user) {
				if (user.changed("password")) {
					user.dataValues.password = await bcrypt.hash(user.dataValues.password, 10);
				}
			},
		},
		defaultScope: {
			attributes: {
				exclude: ['password']
			},
		}
	}
);

//(async () => await sequelize.sync({ alter: true }))();
