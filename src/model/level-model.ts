import { Level } from "@prisma/client"

export type LevelResponse = {
    id: number
    level: number
    description?: string
    created_at: Date
    updated_at: Date
}

export type UpdateLevelRequest = {
    level?: number
    description?: string
}

export function toLevelResponse(level: Level): LevelResponse {
    return {
        id: level.id,
        level: level.level,
        description: level.description!,
        created_at: level.created_at,
        updated_at: level.updated_at
    }
}

export function toLevelResponseArray(levels: Level[]): LevelResponse[] {     
    return levels.map(toLevelResponse);
}
