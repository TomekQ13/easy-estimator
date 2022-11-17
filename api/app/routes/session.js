const express = require("express");
const router = express.Router();
const {
    getSession,
    createNewSession,
    updateSession,
    deleteSession,
} = require("../models/session");
const { authenticateToken } = require("../auth");
const { ParameterError } = require("../errors");

router.use(authenticateToken);

router.get("/:sessionId", async (req, res) => {
    let results;
    try {
        results = await getSession(req.params.sessionId);
        if (!results) {
            return res
                .status(404)
                .send({ message: "Session with this ID does not exist." });
        }
    } catch (e) {
        console.error(e);
        return res
            .status(500)
            .send({ message: "There has been an error. Please try again." });
    }
    return res.status(200).json(results);
});

router.post("/:sessionId", async (req, res) => {
    if (req.params.sessionId === undefined)
        return res.status(400).send({ message: "SessionId is missing" });
    if (req.body.hostId === undefined)
        return res.status(400).send({ message: "HostId is missing" });
    if ((await getSession(req.params.sessionId)) !== undefined)
        return res
            .status(400)
            .send({ message: "Session with this Id already exists" });

    try {
        await createNewSession(
            req.params.sessionId,
            req.body.hostId,
            req.body.sessionPassword,
            req.body.params
        );
    } catch (e) {
        console.error(e);
        return res
            .status(500)
            .send("There has been an error. Please try again.");
    }
    console.log(`Session with id ${req.params.sessionId} created successfully`);
    return res.status(201).json({
        sessionId: req.params.sessionId,
        message: "Session created successfully",
        params: req.body.params,
    });
});

router.put("/:sessionId", async (req, res) => {
    if (Object.keys(req.body.params).length > 1) {
        return res.status(400).json({
            message: "Only one session parameter can be updated at a time",
        });
    }
    try {
        const resp = await updateSession({
            sessionId: req.params.sessionId,
            paramKey: Object.keys(req.body.params)[0],
            newParamValue: req.body.params[Object.keys(req.body.params)[0]],
        });
        if (resp.rowCount === 0) {
            return res.status(404).send("Session not found");
        }
    } catch (e) {
        console.error(e);
        if (e instanceof ParameterError) {
            return res.status(400).json({
                message: e.message,
            });
        }
        return res
            .status(500)
            .send("There has been an error. Please try again.");
    }
    return res.status(201).json({
        sessionId: req.params.sessionId,
        message: "Session update successfully",
    });
});

router.delete("/:sessionId", async (req, res) => {
    try {
        const resp = await deleteSession(req.params.sessionId);
        if (resp.rowCount === 0) {
            return res.status(404).send("Session not found");
        }
    } catch (e) {
        console.error(e);
        return res
            .status(500)
            .send("There has been an error. Please try again.");
    }
    return res.status(200).json({
        sessionId: req.params.sessionId,
        message: "Session deleted successfully",
        newParams: req.body.params,
    });
});

module.exports = router;
