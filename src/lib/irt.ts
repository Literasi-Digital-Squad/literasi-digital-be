import { Cache } from "memory-cache";
import { LevelResponse } from "../model/level-model";
import { LevelService } from "../service/level-service";
import { CacheExpirationTime, getAllLevelCache } from "./constant";

export class IRT {
    static cache = new Cache()

    private static calculateProbability(theta: number, a: number, b: number): number {
        return 1 / (1 + Math.exp(-a * (theta - b)))
    }

    private static async getLevels(): Promise<LevelResponse[]> {
        let levels = this.cache.get(getAllLevelCache) as LevelResponse[]
        if (levels) {
            return levels
        }

        levels = await LevelService.getAll()
        this.cache.put(getAllLevelCache, levels, CacheExpirationTime)

        return levels
    }

    static async calculate(theta: number): Promise<number> {
        const levels = await this.getLevels()

        const probabilities = levels.map((level) => ({
            level: level.level,
            probability: this.calculateProbability(theta, level.a, level.level)
        }))

        probabilities.sort((a, b) => Math.abs(0.5 - a.probability) - Math.abs(0.5 - b.probability))

        const nextQuestion = probabilities[0]

        return nextQuestion.level
    }

    static updateTheta(oldTheta: number, isCorrect: boolean, wrongStreak: number, correctStreak: number): number {
        let step = 0.5

        if (isCorrect) {
            if (correctStreak >= 3) step *= 1.5;
            if (wrongStreak >= 2) step *= 0.5;
        } else {
            if (correctStreak >= 3) step *= 0.5;
            if (wrongStreak >= 2) step *= 1.5;
        }
    
        let newTheta = oldTheta + (isCorrect ? step : -step)
    
        return Math.max(1, Math.min(10, newTheta))
    }
    
    static clearCache() {
        this.cache.del(getAllLevelCache)
    }
}
