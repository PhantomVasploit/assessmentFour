const winston = require('winston')

const logger = winston.createLogger({
    level: 'verbose',
    format: winston.format.json(),
    defaultMeta: {service: 'The Notebook API Server'},
    transports: [
        new winston.transports.File({filename: 'error.log', level: 'error'}),
        new winston.transports.File({filename: 'combined.log'})
    ]
})

module.exports = logger;