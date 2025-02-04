import { FastifyError } from "fastify";
import { UserRepository } from "../user.repository.js";
import { SessionRepository } from "../../session/session.repository.js";
import { Session } from "../../session/session.model.js";

export class LogOutService {
	private sessionRepository: SessionRepository;

	constructor() {
		this.sessionRepository = new SessionRepository();
	}

	async logOut(sessionId: number, agent:string = "") {
		const session: Session|null = await this.sessionRepository.findById(sessionId);

		if(!session || session.get('userAgent') != agent) throw { statusCode: 400, message: "session_invalid" } as FastifyError;

		await session.destroy()

		return;
	}
}
