/**
 * Categories API Service
 * Endpoints: /api/Categories
 */

import { get, post, put, del } from "./client";
import type {
    ApiResponse,
    PaginatedResult,
    PaginationRequest,
    CategoryDto,
    CategoryAdminDto,
    CreateCategoryDto,
    UpdateCategoryDto,
} from "./types";
import { getCategoryIconUrl } from "./types";

// =========================================
// Public Endpoints (No Auth Required)
// =========================================

/**
 * Get all active categories with pagination and search
 */
export async function getCategories(
    params: PaginationRequest = {}
): Promise<ApiResponse<PaginatedResult<CategoryDto>>> {
    const queryParams = new URLSearchParams();

    if (params.pageNumber) queryParams.set("pageNumber", params.pageNumber.toString());
    if (params.pageSize) queryParams.set("pageSize", params.pageSize.toString());
    if (params.search) queryParams.set("search", params.search);
    if (params.sortBy) queryParams.set("sortBy", params.sortBy);
    if (params.sortDescending !== undefined) queryParams.set("sortDescending", params.sortDescending.toString());

    const query = queryParams.toString();
    return get<ApiResponse<PaginatedResult<CategoryDto>>>(
        `/api/Categories${query ? `?${query}` : ""}`
    );
}

/**
 * Get all categories (unpaginated) - fetches all at once
 * Returns empty array if the API fails (graceful fallback for static generation)
 */
export async function getAllCategories(): Promise<CategoryDto[]> {
    try {
        const response = await getCategories({ pageSize: 100 });
        return response.data?.items ?? [];
    } catch (error) {
        console.error("Error fetching categories:", error);
        return [];
    }
}

/**
 * Get category by ID
 */
export async function getCategoryById(
    id: number
): Promise<ApiResponse<CategoryDto>> {
    return get<ApiResponse<CategoryDto>>(`/api/Categories/${id}`);
}

/**
 * Get category by slug
 */
export async function getCategoryBySlug(
    slug: string
): Promise<ApiResponse<CategoryDto>> {
    return get<ApiResponse<CategoryDto>>(`/api/Categories/by-slug/${slug}`);
}

// =========================================
// Admin Endpoints (Auth Required)
// =========================================

interface AdminPaginationRequest extends PaginationRequest {
    includeDeleted?: boolean;
}

/**
 * Get all categories including deleted (Admin)
 */
export async function getCategoriesAdmin(
    params: AdminPaginationRequest = {}
): Promise<ApiResponse<PaginatedResult<CategoryAdminDto>>> {
    const queryParams = new URLSearchParams();

    if (params.pageNumber) queryParams.set("pageNumber", params.pageNumber.toString());
    if (params.pageSize) queryParams.set("pageSize", params.pageSize.toString());
    if (params.search) queryParams.set("search", params.search);
    if (params.sortBy) queryParams.set("sortBy", params.sortBy);
    if (params.sortDescending !== undefined) queryParams.set("sortDescending", params.sortDescending.toString());
    if (params.includeDeleted !== undefined) queryParams.set("includeDeleted", params.includeDeleted.toString());

    const query = queryParams.toString();
    return get<ApiResponse<PaginatedResult<CategoryAdminDto>>>(
        `/api/Categories/admin${query ? `?${query}` : ""}`
    );
}

/**
 * Get category by ID (Admin - includes deleted)
 */
export async function getCategoryByIdAdmin(
    id: number
): Promise<ApiResponse<CategoryAdminDto>> {
    return get<ApiResponse<CategoryAdminDto>>(`/api/Categories/admin/${id}`);
}

/**
 * Create a new category
 */
export async function createCategory(
    data: CreateCategoryDto
): Promise<ApiResponse<CategoryDto>> {
    return post<ApiResponse<CategoryDto>>("/api/Categories", data);
}

/**
 * Update a category
 */
export async function updateCategory(
    id: number,
    data: UpdateCategoryDto
): Promise<ApiResponse<CategoryDto>> {
    return put<ApiResponse<CategoryDto>>(`/api/Categories/${id}`, data);
}

/**
 * Soft delete a category
 */
export async function deleteCategory(
    id: number
): Promise<ApiResponse<void>> {
    return del<ApiResponse<void>>(`/api/Categories/${id}`);
}

/**
 * Restore a soft-deleted category
 */
export async function restoreCategory(
    id: number
): Promise<ApiResponse<void>> {
    return post<ApiResponse<void>>(`/api/Categories/${id}/restore`);
}

/**
 * Permanently delete a category (SuperAdmin only)
 */
export async function permanentDeleteCategory(
    id: number
): Promise<ApiResponse<void>> {
    return del<ApiResponse<void>>(`/api/Categories/${id}/permanent`);
}

// =========================================
// Helper Functions
// =========================================

/**
 * Get category with full icon URL
 */
export function mapCategoryWithIconUrl(category: CategoryDto): CategoryDto & { iconUrl?: string } {
    return {
        ...category,
        iconUrl: getCategoryIconUrl(category.icon),
    };
}
