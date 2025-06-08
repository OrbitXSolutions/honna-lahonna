// Data types and fetching functions for service provider form

export interface ServiceCategory {
  id: string;
  name: string;
  nameAr: string;
  description?: string;
}

export interface Governorate {
  id: string;
  name: string;
  nameAr: string;
}

// Mock data - Lebanese service categories
const serviceCategories: ServiceCategory[] = [
  {
    id: "home-maintenance",
    name: "Home Maintenance & Repair",
    nameAr: "صيانة وإصلاح المنازل",
  },
  { id: "cleaning", name: "Cleaning Services", nameAr: "خدمات التنظيف" },
  {
    id: "beauty-wellness",
    name: "Beauty & Wellness",
    nameAr: "التجميل والعافية",
  },
  { id: "tutoring", name: "Tutoring & Education", nameAr: "التدريس والتعليم" },
  { id: "event-planning", name: "Event Planning", nameAr: "تنظيم الفعاليات" },
  {
    id: "photography",
    name: "Photography & Videography",
    nameAr: "التصوير الفوتوغرافي والفيديو",
  },
  { id: "transportation", name: "Transportation", nameAr: "النقل والمواصلات" },
  {
    id: "tech-services",
    name: "Technology Services",
    nameAr: "الخدمات التقنية",
  },
  { id: "healthcare", name: "Healthcare Services", nameAr: "الخدمات الصحية" },
  { id: "business", name: "Business Services", nameAr: "الخدمات التجارية" },
  { id: "legal", name: "Legal Services", nameAr: "الخدمات القانونية" },
  { id: "other", name: "Other Services", nameAr: "خدمات أخرى" },
];

// Lebanese governorates
const governorates: Governorate[] = [
  { id: "beirut", name: "Beirut", nameAr: "بيروت" },
  { id: "mount-lebanon", name: "Mount Lebanon", nameAr: "جبل لبنان" },
  { id: "north-lebanon", name: "North Lebanon", nameAr: "شمال لبنان" },
  { id: "south-lebanon", name: "South Lebanon", nameAr: "جنوب لبنان" },
  { id: "bekaa", name: "Bekaa", nameAr: "البقاع" },
  { id: "nabatieh", name: "Nabatieh", nameAr: "النبطية" },
  { id: "akkar", name: "Akkar", nameAr: "عكار" },
  { id: "baalbek-hermel", name: "Baalbek-Hermel", nameAr: "بعلبك الهرمل" },
];

// Fetch functions with simulated delays
export async function fetchServiceCategories(): Promise<ServiceCategory[]> {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 100));
  return serviceCategories;
}

export async function fetchGovernorates(): Promise<Governorate[]> {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 100));
  return governorates;
}

// Business type options
export const businessTypeOptions = [
  { value: "individual", label: "فردي" },
  { value: "company", label: "شركة" },
  { value: "partnership", label: "شراكة" },
  { value: "llc", label: "شركة ذات مسؤولية محدودة" },
];

// Experience options
export const experienceOptions = [
  { value: "0-1", label: "أقل من سنة" },
  { value: "1-3", label: "1-3 سنوات" },
  { value: "3-5", label: "3-5 سنوات" },
  { value: "5-10", label: "5-10 سنوات" },
  { value: "10+", label: "أكثر من 10 سنوات" },
];

// Helper functions
export function getServiceCategoryById(
  id: string
): ServiceCategory | undefined {
  return serviceCategories.find((category) => category.id === id);
}

export function getGovernorateById(id: string): Governorate | undefined {
  return governorates.find((gov) => gov.id === id);
}
