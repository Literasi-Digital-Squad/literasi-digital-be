export type LevelDistribution = {
    level: number;
    total: number;
};

export type GetLevelDistributionResponse = {
    distribution: LevelDistribution[];
    total_result: number;
};

export type GetLevelStatsResponse = {
    total_participant: number
    correct_avg: number
    age_avg: number
}