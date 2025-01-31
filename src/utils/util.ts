import { FastifyError } from "fastify";

export const getErrorsMessage = function(error:FastifyError) {
	if(error.validation)
		return error.validation.map((error: any) => error.message);
	return error.message
}