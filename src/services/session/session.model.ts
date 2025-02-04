import { DataTypes, Model, Sequelize } from "sequelize";
import { User } from "../user/user.model.js";
import { modelsMap } from "../../utils/util.js";

export class Session extends Model {
	declare id: number;
	declare userId: string;
	declare userAgent: string;
	//declare expiresAt: Date;
	declare readonly createdAt: Date;
	declare readonly updatedAt: Date;
}

modelsMap["session"] = Session;

export function init(sequelize: Sequelize) {
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
}

export function assoc() {
	Session.belongsTo(User, { foreignKey: "userId" });
}
