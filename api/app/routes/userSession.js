const express = require("express");
const router = express.Router();
const { addUserSession, deleteUserSession } = require("../models/userSession");

router.use(authenticateToken);

router.post("/usersession/:sessionId", async (req, res) => {
    try {
        const userId = req.body.userid;
        if (userId === undefined) {
            return res.status(401).send({ message: "UserId is missing" });
        }
        await addUserSession(userId, req.params.sessionId);
    } catch (e) {
        console.error(e);
        return res
            .status(500)
            .send({ message: "There has been an error. Please try again." });
    }
    return res.status(201);
});

router.delete("/usersession/:sessionId", async (req, res) => {
    try {
        const userId = req.body.userid;
        if (userId === undefined) {
            return res.status(401).send({ message: "UserId is missing" });
        }
        await deleteUserSession(userId, req.params.sessionId);
    } catch (e) {
        console.error(e);
        return res
            .status(500)
            .send({ message: "There has been an error. Please try again." });
    }
    return res.status(201);
});
