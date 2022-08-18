import "reflect-metadata";
import { DataSource } from "typeorm";

export const appDataSource = new DataSource({
    type: "postgres",
    host: "pg",
    port: 5432,
    username: "kevin",
    password: "ignite",
    database: "rentx",
    entities: ["./src/modules/cars/entities/*.ts"],
    migrations: ["./src/database/migrations/*.ts"],
});

appDataSource
    .initialize()
    .then(() => console.log("Success to connect in postgres"))
    .catch((err) => console.error(err));
