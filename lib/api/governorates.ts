/**
 * Governorates API Service
 * Endpoints: /api/Governorates
 */

import { get, post, put, del } from "./client";
import type {
    ApiResponse,
    PaginatedResult,
    PaginationRequest,
    GovernorateDto,
    GovernorateAdminDto,
    CreateGovernorateDto,
    UpdateGovernorateDto,
} from "./types";

// =========================================
// Public Endpoints (No Auth Required)
// =========================================

/**
 * Get all active governorates with pagination and search
 */
export async function getGovernorates(
    params: PaginationRequest = {}
): Promise<ApiResponse<PaginatedResult<GovernorateDto>>> {
    const queryParams = new URLSearchParams();

    if (params.pageNumber) queryParams.set("pageNumber", params.pageNumber.toString());
    if (params.pageSize) queryParams.set("pageSize", params.pageSize.toString());
    if (params.search) queryParams.set("search", params.search);
    if (params.sortBy) queryParams.set("sortBy", params.sortBy);
    if (params.sortDescending !== undefined) queryParams.set("sortDescending", params.sortDescending.toString());

    const query = queryParams.toString();
    return get<ApiResponse<PaginatedResult<GovernorateDto>>>(
        `/api/Governorates${query ? `?${query}` : ""}`
    );
}

/**
 * Get all governorates (unpaginated) - fetches all at once
 * Returns empty array if the API fails (graceful fallback for static generation)
 */
export async function getAllGovernorates(): Promise<GovernorateDto[]> {
    try {
        const response = await getGovernorates({ pageSize: 100 });
        return response.data?.items ?? [];
    } catch (error) {
        console.error("Error fetching governorates:", error);
        return [];
    }
}

/**
 * Get governorate by ID
 */
export async function getGovernorateById(
    id: number
): Promise<ApiResponse<GovernorateDto>> {
    return get<ApiResponse<GovernorateDto>>(`/api/Governorates/${id}`);
}

/**
 * Get governorate by code
 */
export async function getGovernorateByCode(
    code: string
): Promise<ApiResponse<GovernorateDto>> {
    return get<ApiResponse<GovernorateDto>>(`/api/Governorates/by-code/${code}`);
}

// =========================================
// Admin Endpoints (Auth Required)
// =========================================

interface AdminPaginationRequest extends PaginationRequest {
    includeDeleted?: boolean;
}

/**
 * Get all governorates including deleted (Admin)
 */
export async function getGovernoratesAdmin(
    params: AdminPaginationRequest = {}
): Promise<ApiResponse<PaginatedResult<GovernorateAdminDto>>> {
    const queryParams = new URLSearchParams();

    if (params.pageNumber) queryParams.set("pageNumber", params.pageNumber.toString());
    if (params.pageSize) queryParams.set("pageSize", params.pageSize.toString());
    if (params.search) queryParams.set("search", params.search);
    if (params.sortBy) queryParams.set("sortBy", params.sortBy);
    if (params.sortDescending !== undefined) queryParams.set("sortDescending", params.sortDescending.toString());
    if (params.includeDeleted !== undefined) queryParams.set("includeDeleted", params.includeDeleted.toString());

    const query = queryParams.toString();
    return get<ApiResponse<PaginatedResult<GovernorateAdminDto>>>(
        `/api/Governorates/admin${query ? `?${query}` : ""}`
    );
}

/**
 * Get governorate by ID (Admin - includes deleted)
 */
export async function getGovernorateByIdAdmin(
    id: number
): Promise<ApiResponse<GovernorateAdminDto>> {
    return get<ApiResponse<GovernorateAdminDto>>(`/api/Governorates/admin/${id}`);
}

/**
 * Create a new governorate
 */
export async function createGovernorate(
    data: CreateGovernorateDto
): Promise<ApiResponse<GovernorateDto>> {
    return post<ApiResponse<GovernorateDto>>("/api/Governorates", data);
}

/**
 * Update a governorate
 */
export async function updateGovernorate(
    id: number,
    data: UpdateGovernorateDto
): Promise<ApiResponse<GovernorateDto>> {
    return put<ApiResponse<GovernorateDto>>(`/api/Governorates/${id}`, data);
}

/**
 * Soft delete a governorate
 */
export async function deleteGovernorate(
    id: number
): Promise<ApiResponse<void>> {
    return del<ApiResponse<void>>(`/api/Governorates/${id}`);
}

/**
 * Restore a soft-deleted governorate
 */
export async function restoreGovernorate(
    id: number
): Promise<ApiResponse<void>> {
    return post<ApiResponse<void>>(`/api/Governorates/${id}/restore`);
}

/**
 * Permanently delete a governorate (SuperAdmin only)
 */
export async function permanentDeleteGovernorate(
    id: number
): Promise<ApiResponse<void>> {
    return del<ApiResponse<void>>(`/api/Governorates/${id}/permanent`);
}
