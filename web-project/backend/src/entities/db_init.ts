import mysql from 'mysql2/promise.js'
import env from 'dotenv';
import User from './User';
import Conference from './Conference';
import { Reviewers } from './dbConst';
import Reviewer from './Reviewer';

env.config();

function createDatabase() {
    mysql.createConnection({
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD
    }).then((connection) => {
        return connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_DATABASE}`)
    }).catch((error) => {
        console.warn(error.stack)
    })
}

function fkConfig() {
    Conference.hasMany(Reviewer, { as: Reviewers, foreignKey: 'ConferenceId' });
    Reviewer.belongsTo(Conference, { foreignKey: 'ReviewerConference' });

    User.hasOne(Reviewer, { foreignKey: 'UserId' });
    Reviewer.belongsTo(User, { foreignKey: "ReviewerUserId" });
}

function db_init() {
    createDatabase();
    fkConfig();
}

export default db_init;