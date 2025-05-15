import { Participant, Result } from "@prisma/client";

export type ParticipantResponse = {
    id: number;
    name: string;
    age: number;
    email: string;
    created_at: string;
    updated_at: string;
};

export type ParticipantListResponse = {
    status: string;
    data: ParticipantResponse[];
    pagination: {
        total_items: number;
        total_pages: number;
        current_page: number;
        items_per_page: number;
    };
};

export type ParticipantCreateRequest = {
    name: string;
    age: number;
    email: string;
};

export type ParticipantUpdateRequest = {
    name?: string;
    age?: number;
    email?: string;
};

export type ParticipantCompleteResponse = {
    status: string;
    data: ParticipantResponse[];
};

export type ParticipantDeleteResponse = {
    status: string;
};

export function toParticipantResponse(participant: Participant): ParticipantResponse {
    return {
        id: participant.id,
        name: participant.name,
        age: participant.age,
        email: participant.email,
        created_at: participant.created_at.toISOString(),
        updated_at: participant.updated_at.toISOString()
    };
}

export function toParticipantListResponse(
    participants: Participant[],
    total_items: number,
    total_pages: number,
    current_page: number,
    items_per_page: number
): ParticipantListResponse {
    return {
        status: "success",
        data: participants.map(toParticipantResponse),
        pagination: {
            total_items,
            total_pages,
            current_page,
            items_per_page
        }
    };
}

export function toParticipantCompleteResponse(participant: Participant): ParticipantCompleteResponse {
    return {
        status: "success",
        data: [toParticipantResponse(participant)]
    };
}

export function toParticipantDeleteResponse(): ParticipantDeleteResponse {
    return {
        status: "success"
    };
}

// GetAllWithResult

export type ResultResponse = {
    id: string;
    level_result: number;
    description?: string | null;
    created_at: string;
    updated_at: string;
};

export type ParticipantWithResultResponse = {
    id: number;
    name: string;
    age: number;
    email: string;
    created_at: string;
    updated_at: string;
    results: ResultResponse[];
};

export type ParticipantWithResultListResponse = {
    status: string;
    data: ParticipantWithResultResponse[];
    pagination: {
        total_items: number;
        total_pages: number;
        current_page: number;
        items_per_page: number;
    };
};

export function toResultResponse(result: Result): ResultResponse {
    return {
        id: result.id,
        level_result: result.level_result,
        description: result.description,
        created_at: result.created_at.toISOString(),
        updated_at: result.updated_at.toISOString()
    };
}

export function toParticipantWithResultResponse(participant: Participant & { results: Result[] }): ParticipantWithResultResponse {
    return {
        id: participant.id,
        name: participant.name,
        age: participant.age,
        email: participant.email,
        created_at: participant.created_at.toISOString(),
        updated_at: participant.updated_at.toISOString(),
        results: participant.results.map(toResultResponse)
    };
}

export function toParticipantWithResultListResponse(
    participants: (Participant & { results: Result[] })[],
    total_items: number,
    total_pages: number,
    current_page: number,
    items_per_page: number
): ParticipantWithResultListResponse {
    return {
        status: "success",
        data: participants.map(toParticipantWithResultResponse),
        pagination: {
            total_items,
            total_pages,
            current_page,
            items_per_page
        }
    };
}