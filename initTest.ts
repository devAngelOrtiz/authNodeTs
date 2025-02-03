
import request from "supertest";
import { app } from "./src/server/server.js";

beforeAll(async () => {
	await app.ready();
	app.log.level = 'silent'
});

afterAll(async () => {
	await app.close();

});


(global as any).test = {
	requestServer: request(app.server),
};