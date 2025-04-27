import { Level } from "@prisma/client"

export type LevelResponse = {
    id: number
    level: number
    description?: string
    a: number
    created_at: string
    updated_at: string
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
        a: level.a,
        created_at: level.created_at.toISOString(),
        updated_at: level.updated_at.toISOString()
    }
}

export function toLevelResponseArray(levels: Level[]): LevelResponse[] {     
    return levels.map(toLevelResponse);
}
