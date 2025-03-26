import { Result } from "@prisma/client";

export type ResultResponse = {
    id: string;
    participant_id: number;
    level_result: number;
    description?: string;
    created_at: string;
    updated_at: string;
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
};

export type ResultCompleteResponse = {
    status: string;
    data: ResultResponse[];
};

export function toResultResponse(result: Result): ResultResponse {
    return {
        id: result.id,
        participant_id: result.participant_id,
        level_result: result.level_result,
        description: result.description ?? undefined,
        created_at: result.created_at.toISOString(),
        updated_at: result.updated_at.toISOString()
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