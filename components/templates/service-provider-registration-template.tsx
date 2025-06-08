'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { ChevronRight, ChevronLeft, CheckCircle } from 'lucide-react';
import { DynamicForm } from '@/components/organisms/dynamic-form';
import { serviceProviderStep1Config } from '@/lib/validation/service-provider-step1-config';
import { serviceProviderStep2Config } from '@/lib/validation/service-provider-step2-config';
import { cn } from '@/lib/utils';

interface ServiceProviderRegistrationTemplateProps {
  className?: string;
}

const steps = [
  {
    id: 1,
    title: 'معلومات الخدمة',
    description: 'أدخل معلومات الخدمة الأساسية',
    config: serviceProviderStep1Config,
  },
  {
    id: 2,
    title: 'التحقق والوثائق',
    description: 'تحميل الوثائق والصور المطلوبة',
    config: serviceProviderStep2Config,
  },
];

export function ServiceProviderRegistrationTemplate({
  className,
}: ServiceProviderRegistrationTemplateProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentStepData = steps.find(step => step.id === currentStep);
  const progress = ((currentStep - 1) / (steps.length - 1)) * 100;

  const handleStepComplete = (stepData: Record<string, any>) => {
    setFormData(prev => ({ ...prev, ...stepData }));
    setCompletedSteps(prev => new Set([...prev, currentStep]));
    
    if (currentStep < steps.length) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleStepBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleFinalSubmit = async (stepData: Record<string, any>) => {
    setIsSubmitting(true);
    try {
      const finalData = { ...formData, ...stepData };
      // TODO: Implement service provider registration server action
      console.log('Final form data:', finalData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Handle success
      alert('تم التسجيل بنجاح!');
    } catch (error) {
      console.error('Registration failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={cn('min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8', className)}>
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            تسجيل مقدم خدمة
          </h1>
          <p className="text-gray-600">
            انضم إلى منصة هنا لهنا وابدأ في تقديم خدماتك
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-medium text-gray-700">
              الخطوة {currentStep} من {steps.length}
            </span>
            <span className="text-sm text-gray-500">
              {Math.round(progress)}% مكتمل
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Steps Navigation */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={cn(
                    'flex items-center justify-center w-10 h-10 rounded-full text-sm font-medium',
                    currentStep === step.id
                      ? 'bg-blue-600 text-white'
                      : completedSteps.has(step.id)
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-200 text-gray-600'
                  )}
                >
                  {completedSteps.has(step.id) ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    step.id
                  )}
                </div>
                <div className="mr-3 rtl:ml-3 rtl:mr-0">
                  <div
                    className={cn(
                      'text-sm font-medium',
                      currentStep === step.id
                        ? 'text-blue-600'
                        : completedSteps.has(step.id)
                        ? 'text-green-600'
                        : 'text-gray-500'
                    )}
                  >
                    {step.title}
                  </div>
                  <div className="text-xs text-gray-500">
                    {step.description}
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <ChevronLeft className="w-5 h-5 text-gray-400 mx-4" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Card */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl text-center">
              {currentStepData?.title}
            </CardTitle>
            <p className="text-center text-gray-600">
              {currentStepData?.description}
            </p>
          </CardHeader>
          <CardContent>
            {currentStepData && (
              <DynamicForm
                config={currentStepData.config}
                onSubmit={currentStep === steps.length ? handleFinalSubmit : handleStepComplete}
                initialData={formData}
                submitButtonText={
                  currentStep === steps.length 
                    ? isSubmitting ? 'جاري التسجيل...' : 'إتمام التسجيل'
                    : 'التالي'
                }
                disabled={isSubmitting}
                className="space-y-6"
              />
            )}

            {/* Navigation Buttons */}
            {currentStep > 1 && (
              <div className="flex justify-start mt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleStepBack}
                  disabled={isSubmitting}
                  className="flex items-center gap-2"
                >
                  <ChevronRight className="w-4 h-4" />
                  السابق
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Help Text */}
        <div className="text-center mt-8 text-sm text-gray-600">
          <p>
            هل تحتاج مساعدة؟{' '}
            <a href="/contact" className="text-blue-600 hover:underline">
              اتصل بنا
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
