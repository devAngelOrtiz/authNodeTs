import { FastifyError, FastifyInstance } from "fastify";
import { IUserBody, User } from "../user.model.js";
import { UserRepository } from "../user.repository.js";
import { SessionRepository } from "../../session/session.repository.js";
import { Session } from "../../session/session.model.js";
import { createError } from "../../../utils/util.js";

export class SignUpService {
	private userRepository: UserRepository;
	private sessionRepository: SessionRepository;

	constructor() {
		this.userRepository = new UserRepository();
		this.sessionRepository = new SessionRepository();
	}

	async registerUser(userData: IUserBody, agent: string = "", server: FastifyInstance) {
		const alreadyExistUser = await this.userRepository.findByEmail(userData.email);

		if (alreadyExistUser) throw createError(400, "email_alredyExists");

		const user: User = await this.userRepository.create(userData);

		const session: Session = await this.sessionRepository.findOrCreate(user.get("id"), agent);

		user.setDataValue("token", await server.signUser(user.get("id"), session.get("id")));

		return user;
	}
}
