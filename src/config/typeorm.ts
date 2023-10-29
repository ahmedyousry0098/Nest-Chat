import {config} from 'dotenv'
import { DataSource, DataSourceOptions } from "typeorm";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

config({path: ".env"})

export const dbConfig: PostgresConnectionOptions = {
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    entities: ['dist/**/model/*.entity{.js, .ts}'],
    synchronize: true,
    migrations: [
      'dist/db/migrations/*{.js, .ts}'
    ], 
}

export const dataSource = new DataSource(dbConfig as DataSourceOptions)