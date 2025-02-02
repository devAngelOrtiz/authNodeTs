import { Session } from "../../session/session.model.js";
import { User } from "../user.model.js";

export class SignInRepository {
	async create(userData: any): Promise<User> {
		return await User.create(userData);
	}

	async createSession(user: User, agent: string): Promise<Session> {
		return await Session.create({ userId: user.id, agent });
	}

	async findByEmail(email: string): Promise<User|null> {
		return await User.findOne({ where: { email } });
	}
}
