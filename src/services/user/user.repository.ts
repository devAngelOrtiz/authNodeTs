import { User } from "./user.model.js";

export class UserRepository {
	async create(userData: any): Promise<User> {
		return await User.create(userData);
	}

	async findByEmail(email: string): Promise<User | null> {
		return await User.findOne({ where: { email } });
	}
}
