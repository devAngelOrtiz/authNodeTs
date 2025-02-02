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

export const userInputSchema = {
	type: "object",
	required: ["name", "email", "password"],
	properties: {
		name: { type: "string", minLength: 5, errorMessage: "name_minLength" },
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
		createdAt: { type: "string", format: "date-time" },
		updatedAt: { type: "string", format: "date-time" },
	},
	additionalProperties: false,
} as const;
