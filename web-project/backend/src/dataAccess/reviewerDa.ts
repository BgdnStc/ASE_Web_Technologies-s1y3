import Reviewer, { ReviwerCreationAttributes } from "../entities/Reviewer";

async function createReviewer(reviewer: ReviwerCreationAttributes) {
    return await Reviewer.create(reviewer);
}

async function getReviewerById(id: number) {
    return await Reviewer.findByPk(id);
}

async function deleteReviewer(id: number) {
    let deleteElem = await Reviewer.findByPk(id);

    if (!deleteElem) {
        console.log('This reviewer does not exist or it has been already deleted');
        return;
    }
    return await deleteElem.destroy();
}

export {
    createReviewer,
    getReviewerById,
    deleteReviewer
}