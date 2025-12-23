/**
 * @deprecated This file is deprecated. 
 * The main middleware in middleware.ts now handles auth directly using JWT tokens.
 * 
 * This file is kept for reference only and should not be imported.
 */

import { NextResponse, type NextRequest } from "next/server";
import { UserInfo } from "@/lib/api/types";

export interface AuthMiddleware {
  request: NextRequest;
  response: NextResponse;
  user: UserInfo | null;
}

/**
 * @deprecated This function is no longer used.
 * Auth session handling is now done directly in middleware.ts using JWT tokens.
 */
export async function updateSession(request: NextRequest) {
  console.warn("DEPRECATED: updateSession is no longer used. Auth is handled via JWT in middleware.ts");
  return NextResponse.next({ request });
}
