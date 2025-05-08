import { Result, Participant } from "@prisma/client";

export type ParticipantBasic = {
    id: number;
    name: string;
    email: string;
    age: number;
};

export type ResultResponse = {
    id: string;
    participant_id: number;
    level_result: number;
    description?: string;
    total_correct: number;
    created_at: string;
    updated_at: string;
    participant?: ParticipantBasic; // optional, hanya kalau include
};

export type ResultListResponse = {
    status: string;
    data: ResultResponse[];
    pagination?: {
        total_items: number;
        total_pages: number;
        current_page: number;
        items_per_page: number;
    };
};

export type ResultCreateRequest = {
    participant_id: number;
    level_result: number;
    description?: string;
    total_correct: number;
};

export type ResultCompleteResponse = {
    status: string;
    data: ResultResponse[];
};

export function toResultResponse(result: Result & { participant?: Participant }): ResultResponse {
    return {
        id: result.id,
        participant_id: result.participant_id,
        level_result: result.level_result,
        description: result.description ?? undefined,
        total_correct: result.total_correct,
        created_at: result.created_at.toISOString(),
        updated_at: result.updated_at.toISOString(),
        participant: result.participant 
            ? {
                id: result.participant.id,
                name: result.participant.name,
                email: result.participant.email,
                age: result.participant.age
            } 
            : undefined
    };
}


export function toResultListResponse(
    results: Result[],
    total_items?: number,
    total_pages?: number,
    current_page?: number,
    items_per_page?: number
): ResultListResponse {
    const response: ResultListResponse = {
        status: "success",
        data: results.map(toResultResponse)
    };

    if (total_items !== undefined && total_pages !== undefined && 
        current_page !== undefined && items_per_page !== undefined) {
        response.pagination = {
            total_items,
            total_pages,
            current_page,
            items_per_page
        };
    }

    return response;
}

export function toResultCompleteResponse(result: Result): ResultCompleteResponse {
    return {
        status: "success",
        data: [toResultResponse(result)]
    };
}

export function toResultParticipantResponse(results: Result | Result[]): ResultCompleteResponse {
    return {
        status: "success",
        data: Array.isArray(results) 
            ? results.map(toResultResponse) 
            : [toResultResponse(results)]
    };
}