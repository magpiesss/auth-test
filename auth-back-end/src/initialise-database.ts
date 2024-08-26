import {Sequelize} from "sequelize";
import {initialiseUser, User} from "./models/User";

export async function initialiseDatabase(): Promise<Sequelize> {
    const databaseName = process.env.DATABASE_NAME;
    const databaseUser = process.env.DATABASE_USER;
    const databasePassword = process.env.DATABASE_PASSWORD;
    const databaseHost = process.env.DATABASE_HOST;

    if (!databaseName) throw new Error("Missing env var DATABASE_NAME");
    if (!databaseUser) throw new Error("Missing env var DATABASE_USER");
    if (!databasePassword) throw new Error("Missing env var DATABASE_PASSWORD");
    if (!databaseHost) throw new Error("Missing env var DATABASE_HOST");

    const sequelize = new Sequelize(
        databaseName,
        databaseUser,
        databasePassword,
        {
            host: databaseHost,
            dialect: 'postgres',
        });

    await sequelize.authenticate();

    initialiseUser(sequelize);
    await User.sync();

    return sequelize;
}