export const singInInputSchema = {
	type: "object",
	required: ["email", "password"],
	properties: {
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
			email: "email_required",
			password: "password_required",
		},
	},
	additionalProperties: false,
} as const;

export const signInOutputSchema = {
	type: "object",
	properties: {
		token: { type: "string" },
	},
	additionalProperties: false,
} as const;
