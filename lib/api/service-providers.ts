/**
 * Service Providers API Service
 * Endpoints: /api/ServiceProviders
 */

import { get, post, apiClient } from "./client";
import type {
    ApiResponse,
    PaginatedResult,
    ServiceProviderListDto,
    ServiceProviderDetailDto,
    ServiceProviderUserDto,
    CreateServiceProviderDto,
    ServiceProviderFilterDto,
} from "./types";
import { getProviderImageUrl, getDocumentUrl } from "./types";

// =========================================
// Public Endpoints (No Auth Required)
// =========================================

/**
 * Get all approved service providers with filtering and pagination
 */
export async function getServiceProviders(
    params: ServiceProviderFilterDto = {}
): Promise<ApiResponse<PaginatedResult<ServiceProviderListDto>>> {
    const queryParams = new URLSearchParams();

    if (params.search) queryParams.set("search", params.search);
    if (params.categoryId) queryParams.set("categoryId", params.categoryId.toString());
    if (params.governorateId) queryParams.set("governorateId", params.governorateId.toString());
    if (params.serviceDeliveryMethod !== undefined) queryParams.set("serviceDeliveryMethod", params.serviceDeliveryMethod.toString());
    if (params.sortBy) queryParams.set("sortBy", params.sortBy);
    if (params.sortDescending !== undefined) queryParams.set("sortDescending", params.sortDescending.toString());
    if (params.pageNumber) queryParams.set("pageNumber", params.pageNumber.toString());
    if (params.pageSize) queryParams.set("pageSize", params.pageSize.toString());

    const query = queryParams.toString();
    return get<ApiResponse<PaginatedResult<ServiceProviderListDto>>>(
        `/api/ServiceProviders${query ? `?${query}` : ""}`
    );
}

/**
 * Get approved service provider details by ID
 */
export async function getServiceProviderById(
    id: number
): Promise<ApiResponse<ServiceProviderDetailDto>> {
    return get<ApiResponse<ServiceProviderDetailDto>>(`/api/ServiceProviders/${id}`);
}

/**
 * Get approved service provider details by slug
 */
export async function getServiceProviderBySlug(
    slug: string
): Promise<ApiResponse<ServiceProviderDetailDto>> {
    return get<ApiResponse<ServiceProviderDetailDto>>(`/api/ServiceProviders/by-slug/${slug}`);
}

// =========================================
// User Endpoints (Auth Required)
// =========================================

/**
 * Create service provider info (Step 1: JSON only)
 * Uses internal API route to avoid CORS issues
 */
export async function createServiceProviderInfo(
    data: CreateServiceProviderDto
): Promise<ApiResponse<ServiceProviderUserDto>> {
    console.log("📤 Step 1 - Create Service Provider Info Request:", JSON.stringify(data, null, 2));

    // Use internal API route to avoid CORS
    const response = await fetch("/api/service-providers/info", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    const result = await response.json();

    console.log("📥 Step 1 - Create Service Provider Info Response:", JSON.stringify(result, null, 2));

    return result;
}

/**
 * Upload files for service provider (Step 2: multipart/form-data)
 * Uses internal API route to avoid CORS issues
 */
export async function uploadServiceProviderFiles(
    serviceProviderId: number,
    files: {
        logoImage?: File;
        coverImage?: File;
        idCardFront?: File;
        idCardBack?: File;
        certificates?: File[];
    }
): Promise<ApiResponse<ServiceProviderUserDto>> {
    console.log("📤 Step 2 - Upload Service Provider Files Request:", {
        serviceProviderId,
        hasLogoImage: !!files.logoImage,
        hasCoverImage: !!files.coverImage,
        hasIdCardFront: !!files.idCardFront,
        hasIdCardBack: !!files.idCardBack,
        certificatesCount: files.certificates?.length || 0,
    });

    const formData = new FormData();

    if (files.logoImage) {
        formData.append("logoImage", files.logoImage);
    }
    if (files.coverImage) {
        formData.append("coverImage", files.coverImage);
    }
    if (files.idCardFront) {
        formData.append("idCardFront", files.idCardFront);
    }
    if (files.idCardBack) {
        formData.append("idCardBack", files.idCardBack);
    }

    if (files.certificates && files.certificates.length > 0) {
        files.certificates.forEach((cert) => {
            formData.append("certificates", cert);
        });
    }

    // Use internal API route to avoid CORS
    const response = await fetch(`/api/service-providers/${serviceProviderId}/files`, {
        method: "POST",
        body: formData,
    });

    const data = await response.json();

    console.log("📥 Step 2 - Upload Service Provider Files Response:", JSON.stringify(data, null, 2));

    if (!response.ok) {
        throw new Error(data.message || "Failed to upload files");
    }

    return data as ApiResponse<ServiceProviderUserDto>;
}

/**
 * Get current user's service provider profile
 */
export async function getMyServiceProviderProfile(): Promise<ApiResponse<ServiceProviderUserDto>> {
    return get<ApiResponse<ServiceProviderUserDto>>("/api/ServiceProviders/my-profile");
}

// =========================================
// Helper Functions
// =========================================

/**
 * Map service provider with full image URLs
 */
export function mapProviderWithImageUrls<T extends ServiceProviderListDto>(
    provider: T
): T & { logoImageUrl?: string; coverImageUrl?: string } {
    return {
        ...provider,
        logoImageUrl: getProviderImageUrl(provider.logoImage),
        coverImageUrl: getProviderImageUrl(provider.coverImage),
    };
}

/**
 * Map service provider user dto with all URLs
 */
export function mapUserProviderWithUrls(
    provider: ServiceProviderUserDto
): ServiceProviderUserDto & {
    logoImageUrl?: string;
    coverImageUrl?: string;
    idCardFrontImageUrl?: string;
    idCardBackImageUrl?: string;
    certificatesImageUrls?: string[];
} {
    let certificatesImageUrls: string[] | undefined;

    if (provider.certificatesImages) {
        try {
            const certArray = JSON.parse(provider.certificatesImages) as string[];
            certificatesImageUrls = certArray.map(cert => getDocumentUrl(cert)).filter(Boolean) as string[];
        } catch {
            certificatesImageUrls = undefined;
        }
    }

    return {
        ...provider,
        logoImageUrl: getProviderImageUrl(provider.logoImage),
        coverImageUrl: getProviderImageUrl(provider.coverImage),
        idCardFrontImageUrl: getDocumentUrl(provider.idCardFrontImage),
        idCardBackImageUrl: getDocumentUrl(provider.idCardBackImage),
        certificatesImageUrls,
    };
}

/**
 * Convert local filter params to API filter params
 * This helps bridge the gap between old Prisma-based queries and new API
 */
export function convertToApiFilter(params: {
    category_code?: string;
    governorate_code?: string;
    search?: string;
    page?: number;
    limit?: number;
}): ServiceProviderFilterDto {
    return {
        search: params.search,
        // Note: The API uses IDs, not codes. You may need to resolve these.
        // For now, we pass them as-is and the backend should handle slug/code lookups
        pageNumber: params.page || 1,
        pageSize: params.limit || 10,
        sortBy: "CreatedDate",
        sortDescending: true,
    };
}

// =========================================
// Home Page Grouped Providers
// =========================================

import { getAllCategories } from "./categories";
import type { CategoryDto } from "./types";

interface GroupedServiceProviders {
    servicesCategories: CategoryDto[];
    serviceProviders: {
        [key: string]: ServiceProviderListDto[];
    };
}

/**
 * Get service providers grouped by categories (for home page)
 * Fetches top providers for each category plus an "all" group
 * Returns empty result if API fails (graceful fallback for static generation)
 */
export async function getServiceProvidersGroupedByCategories(
    takeCategories = 4,
    takeProviders = 4,
    includeAll = true
): Promise<GroupedServiceProviders> {
    try {
        // Get categories
        const categories = await getAllCategories();
        const topCategories = categories.slice(0, takeCategories);

        const serviceProviders: { [key: string]: ServiceProviderListDto[] } = {};

        // Get "all" providers
        if (includeAll) {
            const allResponse = await getServiceProviders({
                pageNumber: 1,
                pageSize: takeProviders,
                sortBy: "CreatedDate",
                sortDescending: true,
            });
            serviceProviders["all"] = (allResponse.data?.items ?? []).map(mapProviderWithImageUrls);
        }

        // Get providers for each category
        for (const category of topCategories) {
            const response = await getServiceProviders({
                categoryId: category.id,
                pageNumber: 1,
                pageSize: takeProviders,
                sortBy: "CreatedDate",
                sortDescending: true,
            });
            serviceProviders[category.slug ?? category.id.toString()] = (response.data?.items ?? []).map(mapProviderWithImageUrls);
        }

        return {
            servicesCategories: topCategories,
            serviceProviders,
        };
    } catch (error) {
        console.error("Error fetching grouped service providers:", error);
        return {
            servicesCategories: [],
            serviceProviders: {},
        };
    }
}
