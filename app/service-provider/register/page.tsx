import { ServiceProviderForm } from '@/components/forms/service-provider-form';
import { getServiceCategories, getGovernorates } from '@/lib/data/service-providers';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'تسجيل مقدم خدمة - هنا لهنا',
  description: 'انضم إلى منصة هنا لهنا كمقدم خدمة وابدأ في تقديم خدماتك للعملاء',
  keywords: ['تسجيل', 'مقدم خدمة', 'هنا لهنا', 'خدمات', 'أعمال'],
};

export default async function ServiceProviderRegistrationPage() {
  // Fetch the required data on server-side
  const [serviceCategories, governorates] = await Promise.all([
    getServiceCategories(),
    getGovernorates(),
  ]);

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <ServiceProviderForm 
        serviceCategories={serviceCategories}
        governorates={governorates}
      />
    </main>
  );
}
