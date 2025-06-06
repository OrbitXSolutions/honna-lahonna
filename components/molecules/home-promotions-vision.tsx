import { IconArticle, IconShiningStar } from "../icons";

const CurvedSection = ({
  title,
  content,
  icon: Icon,
  bgColor = "bg-gray-100",
  iconBgColor = "bg-blue-500",
  textColor = "text-gray-800",
  borderColor = "border-gray-300",
}: {
  title: string;
  content: string;
  icon: React.ComponentType<any>;
  bgColor?: string;
  iconBgColor?: string;
  textColor?: string;
  borderColor?: string;
}) => {
  return (
    <div className="relative ">
      <div className="flex items-center justify-center absolute top-0 left-1/2 p-2 bg-background rounded-full shadow-lg shadow-primary-dark -translate-1/2 ">
        <div
          className={`p-5 ${iconBgColor} ${textColor} rounded-full border ${
            borderColor ?? ""
          }`}
        >
          <Icon className="h-12 w-12" />
        </div>
      </div>
      <div
        className={`p-5 pt-15 ${bgColor} ${textColor} rounded-4xl space-y-6 text-center border ${
          borderColor ?? ""
        }`}
      >
        <h3 className="text-3xl font-bold">{title}</h3>
        <p className="">{content}</p>
      </div>
    </div>
  );
};

export default function HomePromotionsVision() {
  return (
    <div className="container mx-auto px-4 max-w-[1000px]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-18 gap-x-5 pt-14 ">
        <CurvedSection
          icon={IconArticle}
          bgColor="bg-primary"
          iconBgColor="bg-primary"
          textColor="text-white"
          borderColor="border-primary-dark/40"
          title="الرسالة"
          content="أدعمك لتزدادي وعياً وتمكناً وثقة وقدرة لخوض الرحلة بكامل صحتك وعافيتك كإمرأة وأم، كما تستحقين بالإضافة إلي تقديم خدمات استشارية مخصصة لكي …"
        />
        <CurvedSection
          icon={IconShiningStar}
          bgColor="bg-white"
          iconBgColor="bg-white"
          borderColor="border-gray-300"
          textColor="text-primary"
          title="الرؤية"
          content="أدعمك لتزدادي وعياً وتمكناً وثقة وقدرة لخوض الرحلة بكامل صحتك وعافيتك كإمرأة وأم، كما تستحقين بالإضافة إلي تقديم خدمات استشارية مخصصة لكي …"
        />
      </div>
    </div>
  );
}
