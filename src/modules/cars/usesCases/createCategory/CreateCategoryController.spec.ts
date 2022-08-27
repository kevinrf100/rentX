import { hash } from "bcryptjs";
import request from "supertest";
import { DataSource } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { app } from "@shared/infra/http/app";
import { createConnection } from "@shared/infra/typeorm";

let connection: DataSource;
describe("Create category controller", () => {
    beforeAll(async () => {
        connection = await createConnection("localhost");

        await connection.runMigrations();

        const password = await hash("admin", 8);
        const id = uuidV4();

        await connection.query(
            `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license ) 
          values('${id}', 'admin', 'admin@rentx.com.br', '${password}', true, 'now()', 'XXXXXX')
        `
        );
    });

    afterAll(async () => {
        await connection.dropDatabase();
        await connection.destroy();
    });

    it("Should be able to create a category", async () => {
        const responseToken = await request(app)
            .post("/sessions")
            .send({ email: "admin@rentx.com.br", password: "admin" });

        const { token } = responseToken.body;
        const response = await request(app)
            .post("/categories")
            .set({ Authorization: `Bearer ${token}` })
            .send({
                name: "Category SuperTest",
                description: "Category superTest",
            });

        expect(response.status).toBe(201);
    });

    it("Should not be able to create a category with same name", async () => {
        const responseToken = await request(app)
            .post("/sessions")
            .send({ email: "admin@rentx.com.br", password: "admin" });

        const { token } = responseToken.body;
        const response = await request(app)
            .post("/categories")
            .set({ Authorization: `Bearer ${token}` })
            .send({
                name: "Category SuperTest",
                description: "Category superTest",
            });
        await request(app)
            .post("/categories")
            .set({ Authorization: `Bearer ${token}` })
            .send({
                name: "Category SuperTest",
                description: "Category superTest",
            });

        expect(response.status).toBe(400);
    });
});
