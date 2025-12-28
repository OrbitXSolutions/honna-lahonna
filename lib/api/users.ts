/**
 * Users API Service
 * Endpoints: /api/Users
 * Note: Admin-only endpoints
 */

import { get } from "./client";
import type { ApiResponse, UserDto } from "./types";

/**
 * Get user by ID (Admin only)
 */
export async function getUserById(
    userId: string
): Promise<ApiResponse<UserDto>> {
    return get<ApiResponse<UserDto>>(`/api/Users/${userId}`);
}
