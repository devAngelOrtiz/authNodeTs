export const userInputSchema = {
	type: "object",
	required: ["name", "email", "password", "roleId"],
	properties: {
		name: { type: "string", minLength: 5, errorMessage: "name_minLength" },
		roleId: { type: "integer"},
		email: { type: "string", format: "email", errorMessage: "email_format" },
		password: {
			type: "string",
			minLength: 8,
			pattern: "^(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$",
			errorMessage: {
				minLength: "password_minLength",
				pattern: "password_format",
			},
		},
	},
	errorMessage: {
		required: {
			name: "name_required",
			email: "email_required",
			password: "password_required",
			roleId: "roleId_required",
		},
	},
	additionalProperties: false,
} as const;

export const userOutputSchema = {
	type: "object",
	properties: {
		id: { type: "string", format: "uuid" },
		name: { type: "string" },
		email: { type: "string", format: "email" },
		token: { type: "string" },
		roleId: { type: "integer" },
		createdAt: { type: "string", format: "date-time" },
		updatedAt: { type: "string", format: "date-time" },
	},
	additionalProperties: false,
} as const;
