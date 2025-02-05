import { FastifyInstance } from "fastify";
import { User } from "../user.model.js";
import { UserRepository } from "../user.repository.js";
import { SessionRepository } from "../../session/session.repository.js";
import { agentSession, Session } from "../../session/session.model.js";
import { EMAIL } from "../../../config/env.js";
import { createError } from "../../../utils/util.js";

export class RecoveryService {
	private userRepository: UserRepository;
	private sessionRepository: SessionRepository;

	constructor() {
		this.userRepository = new UserRepository();
		this.sessionRepository = new SessionRepository();
	}

	async recovery(email: string, server: FastifyInstance) {
		const user: User | null = await this.userRepository.findByEmail(email);

		if (!user) throw createError(400, "email_notFound");

		const session: Session = await this.sessionRepository.findOrCreate(
			user.get("id"),
			agentSession
		);

		user.setDataValue(
			"token",
			await server.signUser(user.get("id"), session.get("id"), EMAIL.expiresIn)
		);

		await server.nodemailer.sendMail({
			to: user.email,
			subject: "Recovery Mail",
			text: `Token for revery your password:\n${user.dataValues.token}\n Expires in: ${EMAIL.expiresIn}`,
		});

		return user;
	}

	async newPassword(user: User, password: string) {
		user.password = password;

		await user.save()

		await this.sessionRepository.destroyOldSessions(user.get("id"));

		return user;
	}
}
