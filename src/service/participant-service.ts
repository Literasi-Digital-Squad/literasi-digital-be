import { prismaClient } from "../app/database";
import { ResponseErorr } from "../error/reponse-error";
import { Validation } from "../validation/validation";
import { ParticipantValidation } from "../validation/participant-validation";
import {
    ParticipantListResponse,
    ParticipantWithResultListResponse,
    toParticipantWithResultListResponse,
    ParticipantCreateRequest,
    ParticipantUpdateRequest,
    ParticipantCompleteResponse,
    ParticipantDeleteResponse,
    toParticipantCompleteResponse,
    toParticipantListResponse,
    toParticipantDeleteResponse,
} from "../model/participant-model";
import { ResultCompleteResponse, toResultParticipantResponse } from "../model/result-model"
import { ParticipantNotFound, ParticipantDataRequired, ResultNotFound } from "../lib/constant";

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

    static async getAllWithResult(page?: number, limit?: number): Promise<ParticipantWithResultListResponse> {
        const validatedQuery = Validation.validate(ParticipantValidation.LIST_QUERY, { page, limit });

        const currentPage = validatedQuery.page ?? 1;
        const itemsPerPage = validatedQuery.limit ?? 10;

        const skip = (currentPage - 1) * itemsPerPage;

        const [totalParticipants, participants] = await Promise.all([
            prismaClient.participant.count(),
            prismaClient.participant.findMany({
                skip,
                take: itemsPerPage,
                include: {
                    results: true
                }
            })
        ]);

        if (totalParticipants === 0) {
            throw new ResponseErorr(404, ParticipantNotFound);
        }

        const totalPages = Math.ceil(totalParticipants / itemsPerPage);

        return toParticipantWithResultListResponse(
            participants,
            totalParticipants,
            totalPages,
            currentPage,
            itemsPerPage
        );
    }

    static async get(id: number): Promise<ParticipantCompleteResponse> {
        const participant = await prismaClient.participant.findUnique({
            where: { id }
        });

        if (!participant) {
            throw new ResponseErorr(404, ParticipantNotFound);
        }

        return toParticipantCompleteResponse(participant);
    }

    static async getResultsByParticipantId(participantId: number): Promise<ResultCompleteResponse> {
        // First, check if the participant exists
        const participantExists = await prismaClient.participant.findUnique({
            where: { id: participantId }
        });

        if (!participantExists) {
            throw new ResponseErorr(404, ParticipantNotFound);
        }

        // Find results for the specific participant
        const results = await prismaClient.result.findMany({
            where: { participant_id: participantId }
        });

        if (results.length === 0) {
            throw new ResponseErorr(404, ResultNotFound);
        }

        return toResultParticipantResponse(results);
    }

    static async create(req: ParticipantCreateRequest): Promise<ParticipantCompleteResponse> {
        const createRequest = Validation.validate(ParticipantValidation.CREATE, req);

        // Todo: If Email taken, update the data

        const participant = await prismaClient.participant.create({
            data: createRequest
        });

        return toParticipantCompleteResponse(participant);
    }

    static async update(id: number, req: ParticipantUpdateRequest): Promise<ParticipantCompleteResponse> {
        await this.get(id);

        if (!Object.keys(req).length) {
            throw new ResponseErorr(400, ParticipantDataRequired);
        }

        // Todo: If Email taken by other participant, update the data. Or else cannot update email.

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
