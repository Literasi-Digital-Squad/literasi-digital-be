import { prismaClient } from "../app/database";
import { ResponseErorr } from "../error/reponse-error";
import { LevelNotFound } from "../lib/constant";
import { IRT } from "../lib/irt";
import { LevelResponse, toLevelResponse, toLevelResponseArray, UpdateLevelRequest } from "../model/level-model";
import { LevelValidation } from "../validation/level-validation";
import { Validation } from "../validation/validation";

export class LevelService {
    static async getAll(): Promise<LevelResponse[]> {
        const levels = await prismaClient.level.findMany({
            orderBy: {
                level: 'asc'
            }
        })

        if (levels.length == 0) {
            throw new ResponseErorr(404, LevelNotFound)
        }

        return toLevelResponseArray(levels)
    }

    static async get(id: number): Promise<LevelResponse> {
        const level = await prismaClient.level.findUnique({
            where: {
                id: id
            }
        })

        if (!level) {
            throw new ResponseErorr(404, LevelNotFound)
        }

        return toLevelResponse(level)
    }

    static async update(id: number, req: UpdateLevelRequest): Promise<LevelResponse> {
        await this.get(id)

        const updateRequest = Validation.validate(LevelValidation.UPDATE, req)

        const level = await prismaClient.level.update({
            where: {
                id: id
            },
            data: updateRequest
        })
        
        IRT.clearCache()

        return toLevelResponse(level)
    }
}