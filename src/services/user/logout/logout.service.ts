import { SessionRepository } from "../../session/session.repository.js";
import { Session } from "../../session/session.model.js";
import { createError } from "../../../utils/util.js";

export class LogOutService {
	private sessionRepository: SessionRepository;

	constructor() {
		this.sessionRepository = new SessionRepository();
	}

	async logOut(sessionId: number, agent:string = "") {
		const session: Session|null = await this.sessionRepository.findById(sessionId);

		if(!session || session.get('userAgent') != agent) throw createError(400, "session_invalid");

		await session.destroy()

		return;
	}
}
