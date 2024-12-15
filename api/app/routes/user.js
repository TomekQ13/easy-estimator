const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { createUser, deleteUser, getUser } = require("../models/user");
const { addRefreshToken, getRefreshToken } = require("../models/refreshToken");
const { authenticateToken, generateAccessToken } = require("../auth");
const { v4: uuidv4 } = require("uuid");
const { addUserSession } = require("../models/userSession");

router.post("/register", async (req, res) => {
    console.log("got user registration");
    if (req.body.username === undefined || req.body.username === "")
        return res.status(400).send({ message: "Username is missing" });

    if (req.body.username.length > 20)
        return res
            .status(400)
            .send({ message: "Username can be maximum 20 characters long" });

    const userId = uuidv4();
    try {
        if (req.body.sessionId !== undefined) {
            await Promise.all([
                await createUser(userId, req.body.username),
                await addUserSession(userId, req.body.sessionId),
            ]);
        } else {
            await createUser(userId, req.body.username);
        }
    } catch (e) {
        console.error(e);
        return res
            .status(500)
            .json({ message: "There has been an error. Please try again." });
    }
    const user = {
        username: req.body.username,
        userId,
    };
    const accessToken = generateAccessToken(user);
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);

    try {
        await addRefreshToken(refreshToken, userId);
    } catch (e) {
        console.error(e);
        return res
            .status(500)
            .send({ message: "There was an error. Please try again." });
    }

    return res.status(201).json({
        message: `User registered with id ${userId} and username ${req.body.username}`,
        accessToken: accessToken,
        refreshToken: refreshToken,
        userid: user.userId,
    });
});

router.delete("/delete", authenticateToken, async (req, res) => {
    try {
        await deleteUser(req.body.userId);
    } catch (e) {
        console.error(e);
    }
});

router.post("/token", (req, res) => {
    const refreshToken = req.body.refreshToken;
    if (refreshToken === null)
        return res.status(403).send({ message: "Refresh token is missing" });
    if (getRefreshToken(refreshToken) === null)
        res.status(401).send({ message: "Refresh token is invalid" });

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err)
            return res
                .status(403)
                .send({ message: "Refresh token is invalid" });
        const { username, userId } = user;
        const accessToken = generateAccessToken({ username, userId });
        res.json({ accessToken: accessToken });
    });
});

router.get("/:userId", async (req, res) => {
    let user;
    try {
        user = await getUser(req.params.userId);
    } catch (e) {
        console.error(e);
        return res
            .status(500)
            .json({ message: "There was an error. Please try again." });
    }

    if (user === null)
        return res.status(404).send({ message: "User not found" });

    return res.json({
        userId: user.user_id,
        username: user.username,
    });
});

module.exports = router;
