export const roleUpdateInputSchema = {
	type: "array",
	minItems: 1,
	errorMessage: {
		type: "body_invalidType",
		minItems: "body_notEmpty",
	},
	items: {
		type: "object",
		required: ["roleId", "permissionId", "crud"],
		properties: {
			roleId: {
				type: "integer",
				minimum: 1,
				errorMessage: {
					type: "roleId_invalidType",
					minimum: "roleId_InvalidValue",
				},
			},
			permissionId: {
				type: "integer",
				minimum: 1,
				errorMessage: {
					type: "permissionId_invalidType",
					minimum: "permissionId_InvalidValue",
				},
			},
			crud: {
				type: "array",
				items: { type: "boolean" },
				minItems: 4,
				maxItems: 4,
				errorMessage: {
					type: "crud_invalidType",
					minItems: "crud_invalidLength",
					maxItems: "crud_invalidLength",
				},
			},
		},
		errorMessage: {
			required: {
				roleId: "roleId_required",
				permissionId: "permissionId_required",
				crud: "crud_required",
			},
		},
	},
} as const;

export const roleUpdateOutputSchema = {
	type: "array",
	items: {
		type: "object",
		properties: {
			roleId: { type: "integer" },
			permissionId: { type: "integer" },
			crud: {
				type: "array",
				items: { type: "boolean" },
			},
		},
	},
	additionalProperties: false,
};
