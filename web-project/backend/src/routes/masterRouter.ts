import express, { request, response } from "express";
import db from "../dbConfig";

let masterRouter = express.Router();

masterRouter.route('/create').get(async (request, response) => {
    try {
        await db.sync({ force: true });
        response.status(201).json({ message: 'created' });
    } catch (error) {
        console.warn(error);
        response.status(500).json({ message: 'server error' });
    }
});

export default masterRouter;