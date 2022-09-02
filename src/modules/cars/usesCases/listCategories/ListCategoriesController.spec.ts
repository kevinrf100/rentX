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

    it("Should be able to list all categories", async () => {
        const responseToken = await request(app)
            .post("/sessions")
            .send({ email: "admin@rentx.com.br", password: "admin" });

        const { refresh_token } = responseToken.body;

        await request(app)
            .post("/categories")
            .set({ Authorization: `Bearer ${refresh_token}` })
            .send({
                name: "Category SuperTest",
                description: "Category superTest",
            });

        const response = await request(app).get("/categories");

        expect(response.status).toBe(200);
        expect(response.body.length).toBe(1);
    });
});
