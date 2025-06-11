import MultiStepForm from "../organisms/multi-step-form";
import ServiceProviderRegisterForm from "../organisms/service-provider-form";
import ServiceProviderRegisterV2Form from "../organisms/service-provider-form-v2";
import SetPhoneForm from "../organisms/set-phone-form";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/card";

export default function ServiceProviderRegisterTemplate() {
  return <MultiStepForm />;
  return (
    <Card className="mx-auto max-w-sm bg-white my-10" suppressHydrationWarning>
      <CardHeader>
        <CardTitle className="text-2xl">{"سجل كمقدم خدمة"}</CardTitle>
        <CardDescription>{"قم بتعئة البيانات"}</CardDescription>
      </CardHeader>
      <CardContent>
        <MultiStepForm />
        {/* <ServiceProviderRegisterV2Form /> */}
        {/* <ServiceProviderRegisterForm /> */}
      </CardContent>
    </Card>
  );
}
