import { prismaClient } from "../app/database";
import { ResponseErorr } from "../error/reponse-error";
import { Validation } from "../validation/validation";
import { ParticipantValidation } from "../validation/participant-validation";
import {
    ParticipantResponse,
    ParticipantListResponse,
    ParticipantCreateRequest,
    ParticipantUpdateRequest,
    ParticipantCreateUpdateResponse,
    ParticipantDeleteResponse,
    toParticipantCompleteResponse,
    toParticipantResponse,
    toParticipantListResponse,
    toParticipantDeleteResponse,
} from "../model/participant-model";
import {
    ParticipantNotFound,
    ParticipantDataRequired
} from "../lib/constant";

export class ParticipantService {
    static async getAll(page?: number, limit?: number): Promise<ParticipantListResponse> {
        const validatedQuery = Validation.validate(ParticipantValidation.LIST_QUERY, { page, limit });

        const currentPage = validatedQuery.page ?? 1;
        const itemsPerPage = validatedQuery.limit ?? 10;

        const skip = (currentPage - 1) * itemsPerPage;

        const [totalParticipants, participants] = await Promise.all([
            prismaClient.participant.count(),
            prismaClient.participant.findMany({
                skip,
                take: itemsPerPage
            })
        ]);

        if (totalParticipants === 0) {
            throw new ResponseErorr(404, ParticipantNotFound);
        }

        const totalPages = Math.ceil(totalParticipants / itemsPerPage);

        return toParticipantListResponse(
            participants,
            totalParticipants,
            totalPages,
            currentPage,
            itemsPerPage);
    }

    static async get(id: number): Promise<ParticipantResponse> {
        const participant = await prismaClient.participant.findUnique({
            where: { id }
        });

        if (!participant) {
            throw new ResponseErorr(404, ParticipantNotFound);
        }

        return toParticipantResponse(participant);
    }

    static async create(req: ParticipantCreateRequest): Promise<ParticipantCreateUpdateResponse> {
        const createRequest = Validation.validate(ParticipantValidation.CREATE, req);

        const participant = await prismaClient.participant.create({
            data: createRequest
        });

        return toParticipantCompleteResponse(participant);
    }

    static async update(id: number, req: ParticipantUpdateRequest): Promise<ParticipantCreateUpdateResponse> {
        await this.get(id);

        if (!Object.keys(req).length) {
            throw new ResponseErorr(400, ParticipantDataRequired);
        }

        const updateRequest = Validation.validate(ParticipantValidation.UPDATE, req);

        const participant = await prismaClient.participant.update({
            where: { id },
            data: updateRequest
        });

        return toParticipantCompleteResponse(participant);
    }

    static async delete(id: number): Promise<ParticipantDeleteResponse> {
        await this.get(id);

        await prismaClient.participant.delete({
            where: { id }
        });

        return toParticipantDeleteResponse();
    }
}
