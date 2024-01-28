import db from "../dbConfig";
import Sequelize, { ModelDefined } from "sequelize";
import { ReviewerAttributes } from "./Reviewer";

export interface ConferenceAttributes {
    ConferenceId: number,
    Reviewers: ReviewerAttributes[]
};

export interface ConferenceCreationAttributes extends ConferenceAttributes { };

const Conference: ModelDefined<ConferenceAttributes, ConferenceCreationAttributes> = db.define("Conference", {
    ConferenceId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    ConferenceName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    ConferenceDescription: {
        type: Sequelize.STRING,
        allowNull: true
    }
});

export default Conference;