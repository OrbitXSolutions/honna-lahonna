import { ROUTES } from "@/lib/constants/routes";
import AppButton from "../atoms/app-button";
import AppLink from "../atoms/app-link";
import { IconArrow, IconCall } from "../icons";

export default function HeaderButtons({
  children,
  className = "",

  ...props
}: Readonly<{
  className?: string;

  children?: React.ReactNode;
}>) {
  return (
    <div className={`flex gap-1 ${className ?? ""}`} {...props}>
      <AppButton variant="outline">
        <span>{"تواصلي معنا"}</span>
        <IconCall />
      </AppButton>
      <AppButton asChild>
        <AppLink loaderClassName="text-white" href={ROUTES.REGISTER}>
          <span>{"سجلي الأن"}</span>
          <IconArrow />
        </AppLink>
      </AppButton>
    </div>
  );
}
