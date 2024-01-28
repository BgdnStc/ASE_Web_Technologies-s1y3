import db from "../dbConfig";
import Sequelize, { ModelDefined } from "sequelize";

export interface ReviewerAttributes {
    ReviewerId: number,
    ReviewerFeedback: string,
    ReviewerUserId: number,
    ReviewerConference: number
}

export interface ReviwerCreationAttributes extends ReviewerAttributes { };

const Reviewer: ModelDefined<ReviewerAttributes, ReviwerCreationAttributes> = db.define("Reviewer", {
    ReviewerId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    ReviewerFeedback: {
        type: Sequelize.STRING,
        allowNull: true
    }, 
    ReviewerUserId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    ReviewerConference: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

export default Reviewer;