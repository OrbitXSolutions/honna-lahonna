import Image from "next/image";

interface AuthPromoSectionProps {
  className?: string;
}

export function AuthPromoSection({ className = "" }: AuthPromoSectionProps) {
  return (
    <div className={`bg-background relative overflow-hidden ${className}`}>
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-50 to-purple-50 opacity-60" />

      {/* Content container */}
      <div className="relative z-10 flex flex-col justify-center items-center p-12 text-center">
        {/* Header text */}
        <div className="mb-8 space-y-4">
          <h1 className="text-4xl font-bold text-gray-800 leading-tight">
            معك لتزدهري في رحلة <span className="text-pink-500">حياتك</span>{" "}
            الخاصة
          </h1>
          <p className="text-lg text-gray-600 max-w-md mx-auto leading-relaxed">
            أدعمك لتزدادي وعياً وثقة وقدرة لخوض الرحلة بكامل محبتك وتعافيك
            كأخبراء وأم، كما ستجدين بالإضافة إلى ذلك خدمات استشارية متخصصة لكل
            ...
          </p>
        </div>

        {/* Main image */}
        <div className="relative mb-8">
          <Image
            src="/auth.png"
            alt="Women supporting each other"
            width={400}
            height={300}
            className="rounded-lg shadow-lg"
            priority
          />

          {/* Statistics badges */}
          <div className="absolute top-4 left-4 bg-white rounded-lg p-3 shadow-md">
            <div className="text-2xl font-bold text-gray-800">20k</div>
            <div className="text-sm text-gray-600">عضو نشيطة</div>
          </div>

          <div className="absolute bottom-4 right-4 bg-white rounded-lg p-3 shadow-md">
            <div className="text-2xl font-bold text-gray-800">60+</div>
            <div className="text-sm text-gray-600">استشارية متخصصة</div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-20 right-20 w-20 h-20 border-2 border-pink-200 rounded-full opacity-60" />
        <div className="absolute bottom-20 left-20 w-16 h-16 border-2 border-purple-200 rounded-full opacity-60" />
        <div className="absolute top-1/2 left-10 w-12 h-12 border-2 border-pink-300 rounded-full opacity-40" />
      </div>
    </div>
  );
}
