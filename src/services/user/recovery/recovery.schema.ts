export const recoveryInputSchema = {
	type: "object",
	required: ["email"],
	properties: {
		email: { type: "string", format: "email" },
	},
	additionalProperties: false,
} as const;

export const newPasswordInputSchema = {
	type: "object",
	required: ["password"],
	properties: {
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
	additionalProperties: false,
} as const;
