import express from "express";
import { createConference, getConferenceById, deleteConference, updateConference } from "../dataAccess/conferenceDa";

let conferenceRouter = express.Router();

conferenceRouter.route('/conference').post(async (req, res) => {
    return res.json(await createConference(req.body));
});

conferenceRouter.route('/conference/:id').get(async (req, res) => {
    let id = parseInt(req.params.id);
    return res.json(await getConferenceById(id));
});

conferenceRouter.route('/conference/:id').delete(async (req, res) => {
    let id = parseInt(req.params.id);
    return res.json(await deleteConference(id));
});

conferenceRouter.route('/conference/:id').put(async (req, res) => {
    let id = parseInt(req.params.id);
    return res.json(await updateConference(req.body, id));
});

export default conferenceRouter;