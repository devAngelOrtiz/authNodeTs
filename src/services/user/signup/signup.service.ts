import { FastifyError } from "fastify";
import { IUser, User } from "../user.model.js";
import { UserRepository } from "../user.repository.js";
import { JWT } from "../../../config/env.js";
import { SessionRepository } from "../../session/session.repository.js";
import { Session } from "../../session/session.model.js";

export class SignUpService {
	private userRepository: UserRepository;
	private sessionRepository: SessionRepository;

	constructor() {
		this.userRepository = new UserRepository();
		this.sessionRepository = new SessionRepository();
	}

	async registerUser(userData: IUser, agent: string = "", sign: Function) {
		const alreadyExistUser = await this.userRepository.findByEmail(userData.email);

		if (alreadyExistUser)
			throw { statusCode: 400, message: "email_alredyExists" } as FastifyError;

		const user:User = await this.userRepository.create(userData);

		const session:Session =  await this.sessionRepository.findOrCreate(user.get('id'), agent);

		user.setDataValue("token", await sign(user.get("id"), session.get("id")));

		return user;
	}
}
