import { ServiceProviderUserDto, ProviderStatus } from "@/lib/api/types";
import { service_provider_status } from "@/lib/generated/prisma";

/**
 * Unified Service Provider type that can be used by templates
 * Maps backend DTO fields to the format expected by the profile templates
 */
export interface UnifiedServiceProvider {
    id: number;
    service_name?: string;
    service_description?: string;
    bio?: string;
    logo_image?: string;
    cover_image?: string;
    slug?: string;
    years_of_experience?: number;
    phone?: string;
    address?: string;
    facebook_url?: string;
    instagram_url?: string;
    whatsapp_url?: string;
    official_url?: string;
    other_urls?: string;
    video_url?: string;
    keywords?: string;
    services?: string;
    status: service_provider_status;
    status_notes?: string;

    // Related entities
    users?: {
        first_name?: string;
        last_name?: string;
        avatar?: string;
    };
    service_categories?: {
        name?: string;
    };
    governorates?: {
        name?: string;
    };
}

/**
 * Transform backend DTO to unified format for templates
 */
export function transformBackendToUnified(dto: ServiceProviderUserDto): UnifiedServiceProvider {
    // Map backend providerStatus to Prisma enum
    let status: service_provider_status;
    switch (dto.providerStatus) {
        case ProviderStatus.Approved:
            status = service_provider_status.approved;
            break;
        case ProviderStatus.Rejected:
            status = service_provider_status.rejected;
            break;
        case ProviderStatus.Suspended:
            status = service_provider_status.rejected; // Map suspended to rejected for display
            break;
        case ProviderStatus.Pending:
        default:
            status = service_provider_status.pending;
            break;
    }

    return {
        id: dto.id,
        service_name: dto.serviceName,
        service_description: dto.serviceDescription,
        bio: dto.bio,
        logo_image: dto.logoImage,
        cover_image: dto.coverImage,
        slug: dto.slug,
        years_of_experience: dto.yearsOfExperience,
        phone: dto.phone,
        address: dto.address,
        facebook_url: dto.facebookUrl,
        instagram_url: dto.instagramUrl,
        whatsapp_url: dto.whatsappUrl,
        official_url: dto.officialUrl,
        other_urls: dto.otherUrls,
        video_url: dto.videoUrl,
        keywords: dto.keywords,
        services: dto.services,
        status,
        status_notes: dto.statusNotes,

        users: {
            first_name: dto.providerFirstName,
            last_name: dto.providerLastName,
        },
        service_categories: {
            name: dto.categoryName,
        },
        governorates: {
            name: dto.governorateName,
        },
    };
}
