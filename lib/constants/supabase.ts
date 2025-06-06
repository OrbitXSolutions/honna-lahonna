export class SupabasePaths {
  static readonly BASE =
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    "https://xcijvgwuzxhfwgszypyw.supabase.co";
  static readonly STORAGE = `${SupabasePaths.BASE}/storage/v1/object/public`;
  static readonly IMAGES = `${SupabasePaths.STORAGE}/images`;
  static readonly SERVICE_CATEGORIES = `${SupabasePaths.IMAGES}/service_categories`;
  static readonly SERVICE_PROVIDERS = `${SupabasePaths.IMAGES}/service_providers`;
  static readonly USERS = `${SupabasePaths.IMAGES}/users`;
}
