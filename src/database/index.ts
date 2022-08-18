import { DataSource } from "typeorm";

export const appDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "kevin",
    password: "ignite",
    database: "rentx",
    logging: true,
});

appDataSource.initialize();
