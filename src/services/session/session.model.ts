import { DataTypes, Model } from "sequelize";
import { User } from "../user/user.model.js";
import { sequelize } from "../../config/db.js";

export class Session extends Model {
	public id!: number;
	public userId!: string;
	public userAgent!: string;
	//public expiresAt!: Date;
}

Session.init(
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		userId: {
			type: DataTypes.UUID,
			allowNull: false,
			references: {
				model: User,
				key: "id",
			},
		},
		userAgent: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		//expiresAt: {
		//	type: DataTypes.DATE,
		//	allowNull: true,
		//},
	},
	{
		sequelize,
		modelName: "Session",
		timestamps: true,
	}
);

Session.belongsTo(User, { foreignKey: "userId" });
 