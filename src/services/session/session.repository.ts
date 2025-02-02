import { Session } from "./session.model.js";

export class SessionRepository {
	async findOrCreate(userId: string, userAgent: string): Promise<Session> {
		const [session, created] = await Session.findOrCreate({
			where: { userId, userAgent },
			defaults: { userId, userAgent },
		});
		return session || created;
	}

	async create(userId: string, userAgent: string): Promise<Session> {
		return await Session.create({ userId: userId, userAgent });
	}

	async findById(id: string): Promise<Session | null> {
		const session = await Session.findOne({ where: { id } });
		return session;
	}
}
