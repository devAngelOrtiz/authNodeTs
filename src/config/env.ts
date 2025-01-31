/* istanbul ignore file */
import dotenv from "dotenv";
dotenv.config();

const config = {
	DB: {
		credential: process.env.AWS_CONNECTION_STRING,
	},
	JWT: {
		secret: process.env.JWT_SECRET ?? "Y3D*1m9B$#Aqz!8Lp^t@hWx+7VfGj&KoR",
		expires: process.env.JWT_EXPIRES ?? "1d",
	},
	SERVER: {
		logger: {
			level: process.env.LOG_LEVEL || "error",
		},
		port: parseInt(process.env.PORT ?? "3000"),
		cors: (process.env.CORS ?? "*").split(","),
		rate: {
			max: parseInt(process.env.RATE_MAX ?? "10"),
			timeWindow: process.env.RATE_TIME ?? 10,
		},
	},
};

export default config;

export const { DB, SERVER, JWT } = config;
