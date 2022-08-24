import { DataSource } from "typeorm";

const appDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "kevin",
    password: "ignite",
    database: "rentx",
    entities: ["./src/modules/**/entities/*.ts"],
    migrations: ["./src/shared/infra/typeorm/migrations/*.ts"],
});

export function createConnection(host = "pg"): Promise<DataSource> {
    return appDataSource.setOptions({ host }).initialize();
}

export default appDataSource;
