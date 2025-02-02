
import { jest } from "@jest/globals";
import request from "supertest";

jest.unstable_mockModule("./src/server/server.js", () => ({
	startServer: jest.fn(),
}));


jest.unstable_mockModule("../../config/db.js", () => {
	const mockSequelize = {
		authenticate: jest.fn().mockResolvedValue(undefined as never),
		close: jest.fn().mockResolvedValue(undefined as never), 
	};

	return {
		sequelize: mockSequelize, 
		connectDB: jest.fn().mockResolvedValue(undefined as never),
	};
});


import { app, startServer} from "./src/server/server.js";

beforeAll(async () => {
	//console.log("start server");
	await app.ready();
});

afterAll(async () => {
	//console.log("end server");
	startServer();
	await app.close();
});


(global as any).test = {
	requestServer: request(app.server),
	//apiKey: 'secret-key',
};