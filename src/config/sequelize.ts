import { Sequelize } from "sequelize";
import { config } from "./config";


export const sequelize = new Sequelize(
    {
        database: config.nameDatabase,
        username: config.userDatabase,
        password: config.passwordDatabase,
        host: config.hostDatabase,
        dialect: "postgres",
        logging: false,
        pool: {
            max: 50,
            min: 5,
            acquire: 60000,
            idle: 30000
        }
    }
)