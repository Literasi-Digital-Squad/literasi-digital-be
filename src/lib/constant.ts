import { Prisma } from "@prisma/client";

// App constant
export const Server = {
    PORT: 3000,
    RunningMsg: "server is running",
    StartMsg: (port: string | number) =>
        `Server is listening on http://localhost:${port}`,
};

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

// API Message
export const Status = {
    Success: "success",
    Error: "error"
}
export const InvalidID = "invalid id format"

// Level constant
export const LevelNotFound = "level not found"

// Question constant
export const QuestionNotFound = "question not found"

// Participant constant
export const ParticipantNotFound = "Participant not found"
export const InvalidParticipantID = "Invalid participant ID"
export const ParticipantDataRequired = "Participants Data Is Required"

// Admin constant
export const AdminNotFound = "Admin not found"
export const EmailAlreadyTaken = "Email has already been taken"
export const EmailOrPasswordInvalid = "Email or password is invalidd"
export const InvalidAdminID = "Invalid admin ID"
export const UpdateCannotEmpty = "Update request cannot be empty"