import { Admin } from "@prisma/client"

export type AdminResponse = {
    id: number,
    name: string,
    email: string,
    created_at: string,
    updated_at: string
}

export type AdminLoginResponse = {
    status: string,
    data: AdminResponse,
    token: string
}

export type AdminRegisterResponse = {
    status: string,
    data: AdminResponse
}

export type AdminErrorResponse = {
    status: string,
    error: string
}

export type AdminRegisterRequest = {
    name: string,
    password: string,
    email: string
}

export type AdminUpdateRequest = {
    name?: string,
    password?: string,
    email?: string
}

export type AdminLoginRequest = {
    email: string,
    password: string
}

export function toAdminResponse(admin: Admin): AdminResponse {
    return {
        id: admin.id,
        name: admin.name,
        email: admin.email,
        created_at: admin.created_at.toISOString(),
        updated_at: admin.updated_at.toISOString()
    }
}

export function toAdminLoginResponse(admin: Admin, token: string): AdminLoginResponse {
    return {
        status: "success",
        data: toAdminResponse(admin),
        token: token
    }
}

export function toAdminRegisterResponse(admin: Admin): AdminRegisterResponse {
    return {
        status: "success",
        data: toAdminResponse(admin)
    }
}

export function toAdminErrorResponse(errorMessage: string): AdminErrorResponse {
    return {
        status: "error",
        error: errorMessage
    }
}