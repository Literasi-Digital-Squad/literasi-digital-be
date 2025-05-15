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

export type ResultTotalResponse = {
    status: string;
    total: number;
};

export function toResultTotalResponse(total: number): ResultTotalResponse {
  return {
    status: "success",
    total: total
  };
}

export type ParticipantTotalResponse = {
  status: string;
  total: number;
};

export function toParticipantTotalResponse(total: number): ParticipantTotalResponse {
  return {
    status: "success",
    total: total,
  };
}
