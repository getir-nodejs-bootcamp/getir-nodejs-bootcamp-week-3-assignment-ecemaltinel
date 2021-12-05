import winston from 'winston';

//logs will be written in 2 different files --info/error--
const logger = winston.createLogger({
    transports: [
        new winston.transports.File({
            filename: 'info.log',
            level: 'info',
            format: winston.format.combine(winston.format.timestamp(), winston.format.json())
        }),
        new winston.transports.File({
            filename: 'error.log',
            level: 'error'
        })
    ]
})
export default logger;