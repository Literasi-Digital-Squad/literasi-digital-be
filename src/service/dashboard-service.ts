import { prismaClient } from "../app/database";
import {
    GetLevelDistributionResponse,
    GetLevelStatsResponse,
    ResultTotalResponse,
    toResultTotalResponse,
    toParticipantTotalResponse,
    ParticipantTotalResponse
} from "../model/dashboard-model";

export class DashboardService {
    static async getLevelDistribution(): Promise<GetLevelDistributionResponse> {
        const groupedResults = await prismaClient.result.groupBy({
            by: ['level_result'],
                _count: {
                _all: true,
            },
                orderBy: {
                level_result: 'asc',
            },
        });

        const total_result = groupedResults.reduce((acc, item) => acc + item._count._all, 0);

        const distribution = groupedResults.map((item) => ({
            level: item.level_result,
            total: item._count._all,
        }));

        return {
            distribution,
            total_result,
        };
    }

    static async getLevelStats(level_id: number): Promise<GetLevelStatsResponse> {
        const results = await prismaClient.result.findMany({
            where: { 
                level_result: level_id 
            },
            include: {
                participant: true,
            },
        });

        if (results.length === 0) {
            return {
                total_participant: 0,
                correct_avg: 0,
                age_avg: 0,
            };
        }

        const uniqueParticipants = new Map<number, number>();

        let totalCorrect = 0;
        results.forEach((res) => {
            totalCorrect += res.total_correct;
            uniqueParticipants.set(res.participant_id, res.participant.age);
        });

        const total_participant = uniqueParticipants.size;
        const correct_avg = totalCorrect / results.length;
        const age_avg =
            Array.from(uniqueParticipants.values()).reduce((sum, age) => sum + age, 0) /
            total_participant;

        return {
            total_participant,
            correct_avg: Number(correct_avg.toFixed(2)),
            age_avg: Number(age_avg.toFixed(2)),
        };
    }

    static async getTotalResult(): Promise<ResultTotalResponse> {
        const result = await prismaClient.result.count();
        return toResultTotalResponse(result);
    }

    static async getTotalParticipant(): Promise<ParticipantTotalResponse> {
        const total = await prismaClient.participant.count();
        return toParticipantTotalResponse(total);
    }

    static async getTotalParticipantToday(): Promise<ParticipantTotalResponse> {
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);
    
        const total = await prismaClient.participant.count({
            where: {
                created_at: {
                    gte: startOfDay,
                },
            },
        });
    
        return toParticipantTotalResponse(total); // tetap return meskipun 0
    }
}