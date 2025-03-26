import { Participant } from "@prisma/client";

export type ParticipantResponse = {
    id: number;
    name: string;
    age: number;
    phone: string;
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
    phone: string;
    email: string;
};

export type ParticipantUpdateRequest = {
    name?: string;
    age?: number;
    phone?: string;
    email?: string;
};

export type ParticipantCreateUpdateResponse = {
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
        phone: participant.phone,
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

export function toParticipantCompleteResponse(participant: Participant): ParticipantCreateUpdateResponse {
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
