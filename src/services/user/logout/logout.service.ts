import { FastifyError } from "fastify";
import { IUser, User } from "../user.model.js";
import { UserRepository } from "../user.repository.js";
import { JWT } from "../../../config/env.js";
import { SessionRepository } from "../../session/session.repository.js";
import { Session } from "../../session/session.model.js";

export class LogOutService {
	private userRepository: UserRepository;
	private sessionRepository: SessionRepository;

	constructor() {
		this.userRepository = new UserRepository();
		this.sessionRepository = new SessionRepository();
	}

	async logOut(sessionId: string, agent:string = "") {

		const session: Session|null = await this.sessionRepository.findById(sessionId);

		if(!session || session.get('userAgent') != agent) throw { statusCode: 400, message: "session_invalid" } as FastifyError;

		await session.destroy()

		return;
	}
}
