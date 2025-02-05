import { Options, Sequelize } from "sequelize";
import { DB } from "./env.js";
import { FastifyBaseLogger } from "fastify";
import { init as initUser, assoc as assocUser } from "../services/user/user.model.js";
import { init as initSession, assoc as assocSession } from "../services/session/session.model.js";
import { init as initRole, assoc as assocRole } from "../services/role/role.model.js";
import { init as initRolePermission } from "../services/permission/rolepermission.model.js";
import {
	init as initPermission,
	assoc as assocPermission,
} from "../services/permission/permission.model.js";

const sequelize = new Sequelize(DB.credential, {dialect:"postgres",logging: DB.logging } as Options);

export { sequelize };

initUser(sequelize);
initSession(sequelize);
initRole(sequelize);
initPermission(sequelize);
initRolePermission(sequelize);
assocUser();
assocSession();
assocRole();
assocPermission();

export const connectDB = async (log: FastifyBaseLogger) => {
	try {
		await sequelize.authenticate();
		log.info("PostgreSQL ready [logging:"+DB.logging+"]");
	} catch (error: any) {
		log.fatal("PostgreSQL Error: " + error?.message);
		process.exit(1);
	}
};
