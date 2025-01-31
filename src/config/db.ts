import { Sequelize } from "sequelize";
import { DB } from "./env.js";
import { FastifyBaseLogger } from "fastify";

const sequelize = new Sequelize(DB.credential);

export { sequelize };

export const connectDB = async (log: FastifyBaseLogger) => {
	try {
		await sequelize.authenticate();
		log.info("PostgreSQL ready");
	} catch (error: any) {
		log.fatal("PostgreSQL Error: " + error?.message);
		process.exit(1);
	}
};
