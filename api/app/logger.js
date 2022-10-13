const { createLogger, transports, format } = require("winston");

const logsFolder = `./logs/`;

const loggerTransports = [new transports.Console()];

const loggerRequestTransports = [
    new transports.File({
        level: "info",
        filename: `${logsFolder}requests.log`,
    }),
    new transports.Console(),
];

const logger = createLogger({
    transports: loggerTransports,
    format: format.combine(
        format.timestamp(),
        format.json(),
        format.prettyPrint()
    ),
});

const requestLogger = createLogger({
    transports: loggerRequestTransports,
    format: format.combine(
        format.timestamp(),
        format.json(),
        format.prettyPrint()
    ),
});

module.exports = {
    logger,
    requestLogger,
    logsFolder,
};
