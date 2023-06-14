const express = require("express");
const router = express.Router();
const { deleteVotesFromSession, vote } = require("../models/userSession");
const { authenticateToken } = require("../auth");

router.use(authenticateToken);

router.put("/:sessionId", async (req, res) => {
    try {
        await vote(req.params.sessionId, req.body.userid, req.body.votevalue);
    } catch (e) {
        console.error(e);
        return res.status(500).send("There was an error. Please try again.");
    }
    return res.status(201).send("Vote updated successfully");
});

router.delete("/all/:sessionId", async (req, res) => {
    try {
        await deleteVotesFromSession(req.params.sessionId);
    } catch (e) {
        console.error(e);
        return res.status(500).send("There was an error. Please try again.");
    }
    return res.status(200).json({
        message: `Votes for sessionId ${req.params.sessionId} deleted successfully.`,
    });
});

// router.delete("/one/:voteId", async (req, res) => {
//     try {
//         const resp = await deleteVote(req.params.voteId);
//         if (resp.rowCount === 0) {
//             return res.status(404).json({
//                 message: `Vote with voteId ${req.params.voteId} not found.`,
//             });
//         }
//     } catch (e) {
//         console.error(e);
//         return res.status(500).send("There was an error. Please try again.");
//     }
//     return res.status(200).json({
//         message: `Vote with voteId ${req.params.voteId} deleted successfully.`,
//     });
// });

module.exports = router;
