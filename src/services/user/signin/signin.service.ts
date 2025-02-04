import { FastifyError, FastifyInstance, FastifyReply } from "fastify";
import { IUserBody, User } from "../user.model.js";
import { UserRepository } from "../user.repository.js";
import { SessionRepository } from "../../session/session.repository.js";
import { Session } from "../../session/session.model.js";

export class SignInService {
	private userRepository: UserRepository;
	private sessionRepository: SessionRepository;

	constructor() {
		this.userRepository = new UserRepository();
		this.sessionRepository = new SessionRepository();
	}

	async singIn(userData: IUserBody, agent: string = "", server: FastifyInstance) {
		const user: User | null = await this.userRepository.findByEmail(userData.email);

		if (!user) throw { statusCode: 400, message: "email/password_notFound" } as FastifyError;

		const isValidPass: Boolean = await user.validatePassword(userData.password);

		if (!isValidPass)
			throw { statusCode: 400, message: "email/password_notFound" } as FastifyError;

		const session: Session = await this.sessionRepository.findOrCreate(user.get("id"), agent);

		user.setDataValue("token", await server.signUser(user.get("id"), session.get("id")));

		return user;
	}
}
