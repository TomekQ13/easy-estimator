const express = require("express");
const expressWinston = require("express-winston");

const app = express();
const cors = require("cors");

const { requestLogger } = require("./logger");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());

app.use(
    expressWinston.logger({
        winstonInstance: requestLogger,
        statusLevels: true,
    })
);

const voteRouter = require("./routes/vote");
app.use("/vote", voteRouter);
const sessionRouter = require("./routes/session");
app.use("/session", sessionRouter);
const userRotuer = require("./routes/user");
app.use("/user", userRotuer);
const userSessionRotuer = require("./routes/userSession");
app.use("/usersession", userRotuer);

app.listen(process.env.PORT || 4000, () => {
    console.log("Application started and Listening on port 4000");
});

module.exports = app;
