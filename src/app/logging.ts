import winston, { debug } from "winston";
import { LogLevel } from "../lib/constant";

export const logger = winston.createLogger({
    level: LogLevel.Debug,
    format: winston.format.json(),
    transports: [
        new winston.transports.Console({})
    ]
})