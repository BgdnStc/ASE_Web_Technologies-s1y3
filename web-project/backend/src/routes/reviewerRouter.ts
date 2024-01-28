import express from "express";
import { createReviewer, deleteReviewer, getReviewerById } from "../dataAccess/reviewerDa";

let reviewerRouter = express.Router();

reviewerRouter.route('/reviewer').post(async (req, res) => {
    return res.json(await createReviewer(req.body));
});

reviewerRouter.route('/reviewer/:id').get(async (req, res) => {
    let id = parseInt(req.params.id);
    return res.json(await getReviewerById(id));
});

reviewerRouter.route('/reviewer/:id').delete(async (req, res) => {
    let id = parseInt(req.params.id);
    return res.json(await deleteReviewer(id));
});

export default reviewerRouter;