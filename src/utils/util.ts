import { FastifyError } from "fastify";
import { Model } from "sequelize";

export const getErrorsMessage = function (error: FastifyError) {
	if (error.validation) return error.validation.map((error: any) => error.message);
	return error.message;
};

export function buildIncludes(modelNames?: string[]) {
	if (!modelNames?.length) return {};
	return {
		include: modelNames.map((modelName) => ({
			model: modelsMap[modelName],
			as: modelName.toLowerCase(),
		})),
	};
}

export const modelsMap: Record<string, any> = {};

export function createError(statusCode?: number, message?: string): FastifyError {
	return { statusCode, message } as FastifyError;
}

export type CRUD = "C" | "R" | "U" | "D";
