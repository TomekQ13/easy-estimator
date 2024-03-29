const { createLogger, transports, format } = require('winston')

const logsFolder = `./logs/`

const loggerTransports = [new transports.Console()]

const logger = createLogger({
    transports: loggerTransports,
    format: format.combine(
        format.timestamp(),
        format.json(),
        format.prettyPrint()
    )
})

module.exports = {
    logger,
    logsFolder
}