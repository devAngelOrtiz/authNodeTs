import { FastifyError, FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { agentSession, Session } from "../services/session/session.model.js";
import { SessionRepository } from "../services/session/session.repository.js";
import { UserRepository } from "../services/user/user.repository.js";
import { RoleRepository } from "../services/role/role.repository.js";
import { getErrorsMessage, CRUD, createError } from "../utils/util.js";
import { JWT } from "../config/env.js";
import { IUserDecoded, User } from "src/services/user/user.model.js";

const roleRepository = new RoleRepository();
const permissionMap = {
	C: 0,
	R: 1,
	U: 2,
	D: 3,
};

export function checkPermission(module: string, checkPermision: CRUD) {
	let moduleId: number;
	roleRepository.findPermission(module).then((role) => {
		if (!role) throw createError(undefined,`${module}_permission_notFound`)
		moduleId = role.get("id");
	});

	return async function (req: FastifyRequest, reply: FastifyReply) {
		const permission = await roleRepository.findRolePermission(
			req.userDecoded.user.roleId,
			moduleId
		);

		if (!permission || !permission.crud[permissionMap[checkPermision]]) {
			throw createError(403,"forbidden_access")
		}
	};
}

export async function signUser(
	this: FastifyInstance,
	userId: string,
	sessionId: string,
	expiresIn?: string
) {
	return await this.jwt.sign(
		{
			userId: userId,
			sessionId: sessionId,
		},
		{ expiresIn: expiresIn ?? JWT.expires }
	);
}

const sessionRepository = new SessionRepository();
const userRepository = new UserRepository();

async function getUserAndSession(userDecoded: IUserDecoded) {
	const user: User | null = await userRepository.findById(userDecoded.userId);

	if (!user) throw  createError(400,"token_invalid")

	const session: Session | null = await sessionRepository.findById(userDecoded.sessionId);

	if (!session) throw createError(400,"session_invalid")

	return { user, session };
}

export const customErrorLogins = {
	badRequestErrorMessage: "token_badFormat",
	noAuthorizationInHeaderMessage: "token_required",
	authorizationTokenExpiredMessage: "token_expired",
	//authorizationTokenUntrusted: 'Untrusted authorization token',
	//authorizationTokenUnsigned: 'Unsigned authorization token'
};

export async function authByToken(req: FastifyRequest, reply: FastifyReply) {
	req.userDecoded = await req.jwtVerify();

	const { user, session } = await getUserAndSession(req.userDecoded);
	
	if (
		session.get("userAgent") != req.headers["user-agent"] ||
		session.get("userAgent") == agentSession
	) {
		
		throw createError(400,"session_invalid")
	}

	req.userDecoded.session = session;
	req.userDecoded.user = user;

}

export async function recoveryByToken(req: FastifyRequest, reply: FastifyReply) {
	req.userDecoded = await req.jwtVerify();

	const { user, session } = await getUserAndSession(req.userDecoded);

	if (session.get("userAgent") != agentSession) throw createError(400, "session_invalid");

	req.userDecoded.session = session;
	req.userDecoded.user = user;
}

export function customErrorHandler(
	error: FastifyError,
	request: FastifyRequest,
	reply: FastifyReply
) {
	const statusCode: number = error.statusCode || 500;
	const msg: string | string[] = error.statusCode
		? getErrorsMessage(error)
		: "Internal Server Error";
	const lvl: "fatal" | "error" = error.statusCode ? "error" : "fatal";

	request.log[lvl](`===> ${statusCode}: ${msg}`);

	reply.status(statusCode).send({ msg: msg });
}

export const userAgentHeaders = {
	type: "object",
	required: ["user-agent"],
	properties: {
		"user-agent": { type: "string", minLength: 5, errorMessage: "user-agent_minLength" },
	},
	errorMessage: {
		required: {
			"user-agent": "user-agent_required",
		},
	},
	additionalProperties: true,
} as const;


export const statusEndSchema = {
	type: "object",
	properties: {
	  msg: { type: "string" }
	},
	additionalProperties: false
  };