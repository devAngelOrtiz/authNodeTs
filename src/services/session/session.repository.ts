import { Session } from "./session.model.js";

export class SessionRepository {
	async create(userId: string, userAgent: string): Promise<Session> {
		return await Session.create({ userId: userId, userAgent });
	}
}
