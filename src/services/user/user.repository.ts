import { Model } from "sequelize";
import { User } from "./user.model.js";
import { buildIncludes } from "../../utils/util.js";

export class UserRepository {
	async create(userData: any): Promise<User> {
		return await User.create(userData);
	}

	async findByEmail(email: string): Promise<User | null> {
		return await User.findOne({ where: { email } });
	}

	async findById(userId: string, models?: string[]) {
		return await User.findByPk(userId, buildIncludes(models));
	}
}
