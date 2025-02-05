import { FastifyError, FastifyInstance, FastifyReply } from "fastify";
import { IUserBody, User } from "../user.model.js";
import { UserRepository } from "../user.repository.js";
import { SessionRepository } from "../../session/session.repository.js";
import { Session } from "../../session/session.model.js";
import { createError } from "../../../utils/util.js";

export class SignInService {
	private userRepository: UserRepository;
	private sessionRepository: SessionRepository;

	constructor() {
		this.userRepository = new UserRepository();
		this.sessionRepository = new SessionRepository();
	}

	async singIn(userData: IUserBody, agent: string = "", server: FastifyInstance) {
		const user: User | null = await this.userRepository.findByEmail(userData.email);

		if (!user) throw createError(400, "email/password_notFound");

		const isValidPass: Boolean = await user.validatePassword(userData.password);

		if (!isValidPass) throw createError(400, "email/password_notFound");

		const session: Session = await this.sessionRepository.findOrCreate(user.get("id"), agent);

		user.setDataValue("token", await server.signUser(user.get("id"), session.get("id")));

		return user;
	}
}
