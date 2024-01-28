import db from "../dbConfig";
import Sequelize, { ModelDefined } from "sequelize";

export interface UserAttributes {
    UserId: Number,
    UserName: String,
    UserType: String
};

export interface UserCreationAttributes extends UserAttributes { };

const User: ModelDefined<UserAttributes, UserCreationAttributes> = db.define("User", {
    UserId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    UserName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    UserType: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

export default User;