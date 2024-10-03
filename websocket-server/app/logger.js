const { createLogger, transports, format } = require("winston");

const logsFolder = `./logs/`;

const loggerTransports = [
    new transports.Console(),
    new transports.File({ filename: "logs.log" }),
];

const logger = createLogger({
    transports: loggerTransports,
    format: format.combine(
        format.timestamp(),
        format.json(),
        format.prettyPrint()
    ),
});

module.exports = {
    logger,
    logsFolder,
};
