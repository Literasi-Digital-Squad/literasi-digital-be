import { prismaClient } from "../app/database";
import { ResponseErorr } from "../error/reponse-error";
import { Validation } from "../validation/validation";
import { ResultValidation } from "../validation/result-validation";
import {
    ResultListResponse,
    ResultCompleteResponse,
    ResultCreateRequest,
    toResultCompleteResponse,
    toResultListResponse,
} from "../model/result-model";
import { ResultNotFound } from "../lib/constant";

export class ResultService {
    static async getAll(
        page?: number, 
        limit?: number, 
        participant_id?: number
    ): Promise<ResultListResponse> {
        const validatedQuery = Validation.validate(ResultValidation.LIST_QUERY, { 
            page, 
            limit, 
            participant_id 
        });

        const currentPage = validatedQuery.page ?? 1;
        const itemsPerPage = validatedQuery.limit ?? 10;

        const skip = (currentPage - 1) * itemsPerPage;

        const whereCondition = participant_id 
            ? { participant_id: validatedQuery.participant_id } 
            : {};

        const [totalResults, results] = await Promise.all([
            prismaClient.result.count({ where: whereCondition }),
            prismaClient.result.findMany({
                where: whereCondition,
                skip,
                take: itemsPerPage,
                include: { participant: true } // Include data participant
            })
        ]);

        if (totalResults === 0) {
            throw new ResponseErorr(404, ResultNotFound);
        }

        const totalPages = Math.ceil(totalResults / itemsPerPage);

        return toResultListResponse(
            results,
            totalResults,
            totalPages,
            currentPage,
            itemsPerPage
        );
    }

    static async get(id: string): Promise<ResultCompleteResponse> {
        const result = await prismaClient.result.findUnique({
            where: { id }
        });

        if (!result) {
            throw new ResponseErorr(404, ResultNotFound);
        }

        return toResultCompleteResponse(result);
    }

    static async create(req: ResultCreateRequest): Promise<ResultCompleteResponse> {
        const createRequest = Validation.validate(ResultValidation.CREATE, req);

        // Ambil deskripsi dari level yang sesuai
        const level = await prismaClient.level.findFirst({
            where: {
                level: createRequest.level_result
            }
        });

        if (!level) {
            throw new ResponseErorr(404, `Level with value ${createRequest.level_result} not found`);
        }

        // Tambahkan description dari level ke createRequest
        const result = await prismaClient.result.create({
            data: {
                ...createRequest,
                description: level.description ?? null
            }
        });

        return toResultCompleteResponse(result);
    }
}