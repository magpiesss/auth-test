import {CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize} from "sequelize";

export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
    declare id: CreationOptional<number>;

    declare name: string;
    declare email: string;
    declare password: string;
}

export function initialiseUser(sequelize: Sequelize) {
    User.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            name: {
                type: new DataTypes.STRING(500),
                allowNull: false
            },
            email: {
                type: new DataTypes.STRING(500),
                allowNull: false
            },
            password: {
                type: new DataTypes.STRING(500),
                allowNull: false
            }
        },
        {
            sequelize,
            modelName: 'User',
            tableName: 'users',
            timestamps: false
        }
    );
}

