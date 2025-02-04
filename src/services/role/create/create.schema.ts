export const roleInputSchema = {
	type: 'object',
	required: ['code', 'permissions'],
	properties: {
		code: {
			type: 'string',
			minLength: 1,
			errorMessage: {
				type: 'code_invalidType',
				minLength: 'code_minLength',
			},
		},
		permissions: {
			type: 'array',
			minItems: 1,
			errorMessage: {
				type: 'permissions_invalidType',
				minItems: 'permissions_notEmpty',
			},
			items: {
				type: 'object',
				required: ['permissionId', 'crud'],
				properties: {
					permissionId: {
						type: 'integer',
						minimum: 1,
						errorMessage: {
							type: 'permissionId_invalidType',
							minimum: 'permissionId_InvalidValue',
						},
					},
					crud: {
						type: 'array',
						items: { type: 'boolean' },
						minItems: 4,
						maxItems: 4,
						errorMessage: {
							type: 'crud_invalidType',
							minItems: 'crud_invalidLength',
							maxItems: 'crud_invalidLength',
						},
					},
				},
				errorMessage: {
					required: {
						permissionId: 'permissionId_required',
						crud: 'crud_required',
					},
				},
			},
		},
	},
	errorMessage: {
		required: {
			code: 'code_required',
			permissions: 'permissions_required',
		},
	},
} as const;

export const roleOutputSchema =  {
	type: 'object',
	properties: {
		id: { type: 'integer' },
		code: { type: 'string' },
		createdAt: { type: 'string', format: 'date-time' },
		updatedAt: { type: 'string', format: 'date-time' },
		permissions: {
			type: 'array',
			items: {
				type: 'object',
				properties: {
					roleId: { type: 'integer' },
					permissionId: { type: 'integer' },
					crud: {
						type: 'array',
						items: { type: 'boolean' }
					},
				},
			},
		},
	},
	additionalProperties: false
};
