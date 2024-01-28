import db from "../dbConfig";
import Conference, { ConferenceCreationAttributes } from "../entities/Conference";
import Reviewer from "../entities/Reviewer";
import { Reviewers } from "../entities/dbConst";

async function createConference(conference: ConferenceCreationAttributes) {
    return await Conference.create(conference, { include: [{ model: Reviewer, as: Reviewers }] });
}

async function getConferenceById(id: number) {
    return await Conference.findByPk(id, { include: Reviewers });
}

async function deleteConference(id: number) {
    let deleteElem = await Conference.findByPk(id);

    if (!deleteElem) {
        console.log('This conference does not exist or it has been already deleted');
        return;
    }
    return await deleteElem.destroy();
}

async function updateConference(conference: ConferenceCreationAttributes, id: number) {
    const findConference = await getConferenceById(id);

    if (!findConference) {
        console.log('This conference does not exist');
        return;
    }

    const transaction = db.transaction();
    try {
        await findConference.update(conference);

        const existReviwers = await Reviewer.findAll({
            where: {
                ReviewerConference: conference.ConferenceId
            }
        });

        if (existReviwers.length > 0) {
            let reviewerIds = existReviwers.map(a => a.dataValues.ReviewerId);
            let reviewerIdsDeleted = reviewerIds.filter(id => !conference.Reviewers.find(add => add.ReviewerId === id)?.ReviewerId);
            if (reviewerIdsDeleted.length > 0) {
                await Reviewer.destroy({
                    where: {
                        ReviewerId: reviewerIdsDeleted
                    }
                });
            }
        }

        // const insertedA = conference.Reviewers.filter(a => a.UserId === 0);
        // if (insertedA.length > 0) {
        //     await User.bulkCreate(insertedA);
        // }

        const updatedA = conference.Reviewers.filter(a => a.ReviewerId !== 0);
        if (updatedA.length > 0) {
            for (let item of updatedA) {
                const findA = await Reviewer.findByPk(item.ReviewerId.toString());
                await findA?.update(item);
            }
        }

        (await transaction).commit();
    } catch (error) {
        (await transaction).rollback();
        throw error;
    }
}

export {
    createConference,
    getConferenceById,
    deleteConference,
    updateConference
}