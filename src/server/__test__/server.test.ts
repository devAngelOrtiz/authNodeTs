import { SERVER } from "../../config/env.js";
import TestAgent from "supertest/lib/agent.js";

const requestServer:TestAgent = (global as any).test.requestServer

describe("API Middlewares", () => {
	it("Helmet should include security headers", async () => {
		const response = await requestServer.get("/api/v1/").set("x-forwarded-for", "192.168.0.1");

		expect(response.headers).toHaveProperty("x-dns-prefetch-control");
		expect(response.headers["x-dns-prefetch-control"]).toBe("off");

		expect(response.headers).toHaveProperty("x-content-type-options");
		expect(response.headers["x-content-type-options"]).toBe("nosniff");

		expect(response.headers).toHaveProperty("x-frame-options");
		expect(response.headers["x-frame-options"]).toBe("SAMEORIGIN");
	});

	it("RateLimit whithin the limit", async () => {
		const allRequest: any[] = [];
		for (let i = 0; i < SERVER.rate.max; i++) {
			allRequest.push(
				requestServer.get("/api/v1/").set("x-forwarded-for", "192.168.0.2")
			);
		}

		const responses = await Promise.all(allRequest);

		for (const response of responses) {
			expect(response.statusCode).toBe(200);
		}
	});

	it("RateLimit exceed the limit", async () => {
		const allRequest: any[] = [];
		for (let i = 0; i < SERVER.rate.max; i++) {
			allRequest.push(
				requestServer.get("/api/v1/").set("x-forwarded-for", "192.168.0.3")
			);
		}

		const responses = await Promise.all(allRequest);

		for (const response of responses) {
			expect(response.statusCode).toBe(200);
		}

		const failRequest = await requestServer
			.get("/api/v1/")
			.set("x-forwarded-for", "192.168.0.3");

		expect(failRequest.status).toBe(429);
		expect(failRequest.body).toHaveProperty("msg", "Too Many Requests");
	});

	//it("Fastify inject", async () => {
	//	const response = await app.inject({
	//		method: "get",
	//		url: "/",
	//	});

	//	expect(response.statusCode).toBe(200);
	//	const body = JSON.parse(response.body);
	//	expect(body).toHaveProperty("hello");
	//});
});
