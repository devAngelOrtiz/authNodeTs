"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert("Roles", [
			{ id: 1, code: "admin", createdAt: new Date(), updatedAt: new Date() },
			{ id: 2, code: "user", createdAt: new Date(), updatedAt: new Date() }

		  ]);
	  
		  await queryInterface.bulkInsert("Permissions", [
			{ id: 1, code: "role", createdAt: new Date(), updatedAt: new Date() },
			{ id: 2, code: "someModule", createdAt: new Date(), updatedAt: new Date() }
		  ]);
	  
		  // Insertar Relaciones en RolePermissions
		  await queryInterface.bulkInsert("RolePermissions", [
			{ roleId: 1, permissionId: 1, crud:[true, true, true, true], createdAt: new Date(), updatedAt: new Date() },
			{ roleId: 1, permissionId: 2, crud:[true, true, true, true], createdAt: new Date(), updatedAt: new Date() },
			{ roleId: 2, permissionId: 1, crud:[false, true, false, false], createdAt: new Date(), updatedAt: new Date() },
			{ roleId: 2, permissionId: 2, crud:[false, true, false, false], createdAt: new Date(), updatedAt: new Date() }
		  ]);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("RolePermissions", {});
		await queryInterface.bulkDelete("Permissions", {});
		await queryInterface.bulkDelete("Roles", {});
	},
};
