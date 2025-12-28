// =========================================
// Generic API Types
// =========================================

export interface ApiResponse<T = undefined> {
    success: boolean;
    message?: string;
    data?: T;
    errors?: string[];
}

export interface PaginationRequest {
    pageNumber?: number;
    pageSize?: number;
    search?: string;
    sortBy?: string;
    sortDescending?: boolean;
}

export interface PaginatedResult<T> {
    items: T[];
    pageNumber: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
}

// =========================================
// Auth API Types
// =========================================

export interface RegisterRequest {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email?: string;
    password: string;
    confirmPassword: string;
}

export interface LoginRequest {
    phoneNumber?: string;
    email?: string;
    password: string;
}

export interface GoogleLoginRequest {
    idToken: string;
}

export interface SendVerificationCodeRequest {
    phoneNumber: string;
}

export interface VerifyPhoneRequest {
    phoneNumber: string;
    code: string;
}

export interface ResendCodeRequest {
    phoneNumber: string;
}

export interface UserInfo {
    id: string;
    firstName: string;
    lastName: string;
    phoneNumber?: string;
    email?: string;
    photo?: string;
    phoneNumberConfirmed: boolean;
    emailConfirmed: boolean;
    roles: string[];
    isServiceProvider?: boolean;
    serviceProviderId?: number | null;
}

export interface UserDto {
    id: string;
    firstName: string;
    lastName: string;
    email?: string;
    phoneNumber?: string;
    photo?: string;
    isBlocked: boolean;
    phoneNumberConfirmed: boolean;
    emailConfirmed: boolean;
    createdAt: string;
    updatedAt?: string;
    roles: string[];
}

// Inner auth data returned inside the data property
export interface AuthData {
    success: boolean;
    message?: string;
    token?: string;
    expiresAt?: string;
    user?: UserInfo;
}

// Wrapped response from backend
export interface AuthResponse {
    success: boolean;
    message?: string;
    data?: AuthData;
    errors?: string[] | null;
    // Also support flat structure for backward compatibility
    token?: string;
    expiresAt?: string;
    user?: UserInfo;
}

export interface AuthState {
    user: UserInfo | null;
    token: string | null;
    expiresAt: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
}

// =========================================
// Governorate API Types
// =========================================

export interface GovernorateDto {
    id: number;
    name: string;
    code: string;
    metaTitle?: string;
    metaDescription?: string;
}

export interface GovernorateAdminDto extends GovernorateDto {
    createdBy?: string;
    createdDate?: string;
    updatedBy?: string;
    updatedDate?: string;
    deletedBy?: string;
    deletedDate?: string;
    isDeleted: boolean;
}

export interface CreateGovernorateDto {
    name: string;
    code: string;
    metaTitle?: string;
    metaDescription?: string;
}

export interface UpdateGovernorateDto extends CreateGovernorateDto { }

// =========================================
// Category API Types
// =========================================

export interface CategoryDto {
    id: number;
    name: string;
    code: string;
    slug: string;
    icon?: string;
    metaTitle?: string;
    metaDescription?: string;
}

export interface CategoryAdminDto extends CategoryDto {
    createdBy?: string;
    createdDate?: string;
    updatedBy?: string;
    updatedDate?: string;
    deletedBy?: string;
    deletedDate?: string;
    isDeleted: boolean;
}

export interface CreateCategoryDto {
    name: string;
    code: string;
    slug: string;
    icon?: string;
    metaTitle?: string;
    metaDescription?: string;
}

export interface UpdateCategoryDto extends CreateCategoryDto { }

// =========================================
// Service Provider API Types
// =========================================

export enum ServiceDeliveryMethod {
    Online = 0,
    InPerson = 1,
    Both = 2,
}

export enum ProviderStatus {
    Pending = 0,
    Approved = 1,
    Rejected = 2,
    Suspended = 3,
}

export interface ServiceProviderListDto {
    id: number;
    serviceName?: string;
    serviceDescription?: string;
    bio?: string;
    logoImage?: string;
    coverImage?: string;
    slug?: string;
    metaTitle?: string;
    metaDescription?: string;
    yearsOfExperience: number;
    serviceDeliveryMethod: ServiceDeliveryMethod;
    categoryId: number;
    categoryName?: string;
    governorateId: number;
    governorateName?: string;
    phone?: string;
    address?: string;
    facebookUrl?: string;
    instagramUrl?: string;
    whatsappUrl?: string;
    officialUrl?: string;
}

export interface ServiceProviderDetailDto extends ServiceProviderListDto {
    otherUrls?: string;
    videoUrl?: string;
    keywords?: string;
    services?: string;
    providerFirstName?: string;
    providerLastName?: string;
}

export interface ServiceProviderUserDto extends ServiceProviderDetailDto {
    providerStatus: ProviderStatus;
    statusNotes?: string;
    documentList?: string;
    idCardFrontImage?: string;
    idCardBackImage?: string;
    certificatesImages?: string;
    createdDate: string;
    updatedDate?: string;
}

export interface CreateServiceProviderDto {
    categoryId: number;
    governorateId: number;
    serviceName: string;
    serviceDescription: string;
    bio: string;
    serviceDeliveryMethod?: ServiceDeliveryMethod;
    yearsOfExperience?: number;
    facebookUrl?: string;
    instagramUrl?: string;
    whatsappUrl?: string;
    otherUrls?: string;
    documentList?: string;
    videoUrl?: string;
    keywords?: string;
    address?: string;
    officialUrl?: string;
    services?: string;
    phone?: string;
}

export interface ServiceProviderFilterDto {
    search?: string;
    categoryId?: number;
    governorateId?: number;
    serviceDeliveryMethod?: ServiceDeliveryMethod;
    sortBy?: string;
    sortDescending?: boolean;
    pageNumber?: number;
    pageSize?: number;
}

// =========================================
// API Paths Configuration
// =========================================

export const API_PATHS = {
    // Image paths
    CATEGORIES_ICONS: "https://back.honnalahonna.com/categories",
    UPLOADS_IMAGES: "https://back.honnalahonna.com/uploads/Images",
    UPLOADS_DOCUMENTS: "https://back.honnalahonna.com/uploads/Documents",
} as const;

/**
 * Get full URL for category icon
 */
export function getCategoryIconUrl(icon?: string): string | undefined {
    if (!icon) return undefined;
    return `${API_PATHS.CATEGORIES_ICONS}/${icon}`;
}

/**
 * Get full URL for service provider image (logo/cover)
 */
export function getProviderImageUrl(imagePath?: string): string | undefined {
    if (!imagePath) return undefined;
    // Remove leading slash if present
    const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
    return `${API_PATHS.UPLOADS_IMAGES}/${cleanPath}`;
}

/**
 * Get full URL for documents (ID cards, certificates)
 */
export function getDocumentUrl(docPath?: string): string | undefined {
    if (!docPath) return undefined;
    const cleanPath = docPath.startsWith('/') ? docPath.slice(1) : docPath;
    return `${API_PATHS.UPLOADS_DOCUMENTS}/${cleanPath}`;
}
