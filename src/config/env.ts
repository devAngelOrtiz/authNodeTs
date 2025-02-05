/* istanbul ignore file */
import dotenv from "dotenv";
dotenv.config();

const config = {
	EMAIL: {
		user: process.env.EMAIL || "",
		client: process.env.EMAIL_CLIENT_ID || "",
		secret: process.env.EMAIL_CLIENT_SECRET || "",
		refreshToken: process.env.EMAIL_REFRESH_TOKEN || "",
		expiresIn: process.env.EMAIL_TOKEN_EXPIRES || "",		
	},
	DB: {
		credential: process.env.AWS_CONNECTION_STRING || "",
		logging: Number(process.env.DB_LOGGING) || false,
	},
	JWT: {
		secret:
			process.env.JWT_SECRET ??
			"cc29fdb08061cd1158af44f2420bafb8b58a71a4b658dd2e90965772c0a38ada",
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

export const { DB, SERVER, JWT, EMAIL } = config;
