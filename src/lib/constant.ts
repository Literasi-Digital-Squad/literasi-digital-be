import { Prisma } from "@prisma/client";

// App constant
export const Server = {
    PORT: 3000,
    RunningMsg: "server is running",
    StartMsg: (host: string, port: number) =>
        `Server is listening on ${host}:${port}`,
};
export const ENV = {
    DEVELOPMENT: "development",
    STAGING: "staging",
    PRODUCTION: "production"
}
export const ServerHost = {
    Development: "127.0.0.1",
    Production: "0.0.0.0"
}

export const NotAllowedCorsErr = new Error('Not allowed by CORS')
export const AllowedCorsMethods = ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
export const AllowedCorsHeaders = ['Content-Type', 'Authorization']

// Database constant
export enum Emit {
    EVENT = "event",
    STDOUT = "stdout",
}
export const Database = {
    LevelQuery: "query" as Prisma.LogLevel,
    LevelError: "error" as Prisma.LogLevel,
    LevelInfo: "info" as Prisma.LogLevel,
    LevelWarn: "warn" as Prisma.LogLevel
}

// Logging constant
export const LogLevel = {
    Debug: "debug"
}

// API Prefix
export const APIPrefix = {
    V1: "/api/v1"
}

// Middleware
export const TokenRequired = "token is required"
export const Unauthorized = "unauthorized"

// AWS S3
export const AWSRegion = "ap-southeast-3"
export const FailedUploadFile = "failed to upload file"
export const FailedDeleteFile = "failed to delete file"

// IRT
export const CacheExpirationTime: number = 5 * 60 * 1000
export const getAllLevelCache = "level:getAll"

// API Message
export const Status = {
    Success: "success",
    Error: "error"
}
export const InvalidID = "invalid id format"

// Admin constant
export const DefaultJwtDur = '10800'

// Level constant
export const LevelNotFound = "level not found"

// Question constant
export const QuestionNotFound = "question not found"
export const InitialQuestionLevel = 3

// Participant constant
export const ParticipantNotFound = "Participant not found"
export const InvalidParticipantID = "Invalid participant ID"
export const ParticipantDataRequired = "Participants Data Is Required"

// Result constant
export const ResultNotFound = "Result Not Found"

// Admin constant
export const AdminNotFound = "Admin Not Found"
export const EmailAlreadyTaken = "Email Has Already Been Taken"
export const EmailOrPasswordInvalid = "Email or Password is Invalidd"
export const InvalidAdminID = "Invalid Admin ID"
export const UpdateCannotEmpty = "Update Request Cannot be Empty"

// Answer constant
export const AnswerNotFound = "result not found"