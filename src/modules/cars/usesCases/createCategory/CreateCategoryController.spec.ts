import request from "supertest";

import { app } from "@shared/infra/http/app";

describe("Create category controller", () => {
    it("Should be able to crea", async () => {
        const response = await request(app).post("/categories").send({
            name: "Category SuperTest",
            description: "Category superTest",
        });

        expect(response.status).toBe(201);
    });
});
