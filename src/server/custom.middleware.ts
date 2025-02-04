import { FastifyError, FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { Session } from "../services/session/session.model.js";
import { SessionRepository } from "../services/session/session.repository.js";
import { UserRepository } from "../services/user/user.repository.js";
import { RoleRepository } from "../services/role/role.repository.js";
import { CRUD } from "src/utils/util.js";
import { getErrorsMessage } from "../utils/util.js";

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
		if (!role) throw { message: `${module}_permission_notFound` } as FastifyError;
		moduleId = role.get("id");
	});

	return async function (req: FastifyRequest, reply: FastifyReply) {
		const permission = await roleRepository.findRolePermission(
			req.userDecoded.roleId,
			moduleId
		);

		if (!permission || !permission.crud[permissionMap[checkPermision]]) {
			throw { statusCode: 403, message: "forbidden_access" } as FastifyError;
		}
	};
}

export async function signUser(this: FastifyInstance, userId: string, sessionId: string) {
	return await this.jwt.sign({
		userId: userId,
		sessionId: sessionId,
	});
}

const sessionRepository = new SessionRepository();
const userRepository = new UserRepository();

export async function authByToken(req: FastifyRequest, reply: FastifyReply) {
	const token = req.headers.authorization;

	if (!token) throw { statusCode: 401, message: "token_required" } as FastifyError;

	req.userDecoded = await req.jwtVerify();

	const user = await userRepository.findById(req.userDecoded.userId);

	if (!user) {
		throw { statusCode: 400, message: "token_invalid" } as FastifyError;
	}

	const session: Session | null = await sessionRepository.findById(req.userDecoded.sessionId);

	if (!session || session.get("userAgent") != req.headers["user-agent"])
		throw { statusCode: 400, message: "session_invalid" } as FastifyError;

	req.userDecoded.session = session;
	req.userDecoded.roleId = user.roleId;
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
