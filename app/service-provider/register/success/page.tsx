import { CheckCircle2, ArrowRight, Clock, Shield } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function ServiceProviderRegistrationSuccess() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto">
        <Card className="border-primary/20 shadow-xl">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <CardTitle className="text-3xl font-bold text-green-700 dark:text-green-400">
              تم التسجيل بنجاح!
            </CardTitle>
            <CardDescription className="text-lg">
              شكراً لك على تسجيلك كمقدم خدمة في منصة حونة لحونة
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Success Message */}
            <Alert className="border-green-200 bg-green-50 dark:bg-green-900/20">
              <Shield className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800 dark:text-green-200">
                تم إرسال طلبك بنجاح! سيقوم فريقنا بمراجعة المعلومات والوثائق المقدمة وسنتواصل معك قريباً.
              </AlertDescription>
            </Alert>

            {/* What happens next */}
            <div className="bg-muted/50 rounded-lg p-6">
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                ما الخطوات التالية؟
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-semibold text-primary">1</span>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">مراجعة الطلب</p>
                    <p>سيقوم فريق المراجعة بفحص معلوماتك والوثائق المرفقة خلال 24-48 ساعة</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-semibold text-primary">2</span>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">التحقق من الهوية</p>
                    <p>سيتم التحقق من وثائق الهوية والشهادات المهنية المقدمة</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-semibold text-primary">3</span>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">إشعار النتيجة</p>
                    <p>ستتلقى إشعاراً عبر البريد الإلكتروني بقبول أو رفض طلبك مع توضيح الأسباب</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-semibold text-primary">4</span>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">بدء تقديم الخدمات</p>
                    <p>بعد الموافقة، ستتمكن من تسجيل الدخول وبدء تقديم خدماتك على المنصة</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Important Notes */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">ملاحظات مهمة:</h4>
              <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                <li>• تأكد من صحة البريد الإلكتروني المقدم لتلقي الإشعارات</li>
                <li>• احتفظ برقم الطلب للمتابعة إذا لزم الأمر</li>
                <li>• في حالة وجود استفسارات، يمكنك التواصل مع خدمة العملاء</li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button asChild className="flex-1">
                <Link href="/" className="flex items-center justify-center gap-2">
                  العودة للصفحة الرئيسية
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="flex-1">
                <Link href="/service-provider/login" className="flex items-center justify-center gap-2">
                  تسجيل الدخول
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>

            {/* Contact Information */}
            <div className="text-center pt-6 border-t border-border">
              <p className="text-sm text-muted-foreground mb-2">
                هل تحتاج للمساعدة؟
              </p>
              <p className="text-sm">
                تواصل معنا عبر البريد الإلكتروني:{" "}
                <a 
                  href="mailto:support@honna-lahonna.com" 
                  className="text-primary hover:underline font-medium"
                >
                  support@honna-lahonna.com
                </a>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
