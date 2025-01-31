import request from "supertest";
import { app, startServer } from "../server/server";
import { SERVER } from "../config/env";
import { jest } from "@jest/globals";

jest.mock("../server/server", () => ({
	startServer: jest.fn(), 
}));

describe("API Middlewares", () => {
	afterAll(async () => {
		await app.close();
	});

	beforeAll(async () => {
		startServer()
		await app.ready();
	});

	test("Helmet should include security headers", async () => {
		const response = await request(app.server).get("/");

		expect(response.headers).toHaveProperty("x-dns-prefetch-control");
		expect(response.headers["x-dns-prefetch-control"]).toBe("off");

		expect(response.headers).toHaveProperty("x-content-type-options");
		expect(response.headers["x-content-type-options"]).toBe("nosniff");

		expect(response.headers).toHaveProperty("x-frame-options");
		expect(response.headers["x-frame-options"]).toBe("SAMEORIGIN");
	});

	test("RateLimit whithin the limit", async () => {
		const allRequest: any[] = [];
		for (let i = 0; i < SERVER.rate.max; i++) {
			allRequest.push(request(app.server).get("/").set("x-forwarded-for", "192.168.0.2"));
			//let response = await request(app.server).get("/").set("x-forwarded-for", "192.168.0.2");
			//expect(response.statusCode).toBe(200);
		}

		const responses = await Promise.all(allRequest);

		for (const response of responses) {
			expect(response.statusCode).toBe(200);
		}
	});

	test("RateLimit exceed the limit", async () => {
		const allRequest: any[] = [];
		for (let i = 0; i < SERVER.rate.max; i++) {
			allRequest.push(request(app.server).get("/").set("x-forwarded-for", "192.168.0.3"));
			//let response = await request(app.server).get("/").set("x-forwarded-for", "192.168.0.3");
			//expect(response.statusCode).toBe(200);
		}

		const responses = await Promise.all(allRequest);

		for (const response of responses) {
			expect(response.statusCode).toBe(200);
		}

		const failRequest = await request(app.server)
			.get("/")
			.set("x-forwarded-for", "192.168.0.3");

		expect(failRequest.status).toBe(429);
		expect(failRequest.body).toHaveProperty("msg", "Too Many Requests");
	});

	//test("Fastify inject", async () => {
	//	const response = await app.inject({
	//		method: "get",
	//		url: "/",
	//	});

	//	expect(response.statusCode).toBe(200);
	//	const body = JSON.parse(response.body);
	//	expect(body).toHaveProperty("hello");
	//});
});
