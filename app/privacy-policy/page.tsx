import GridBackground from "@/components/molecules/grid-background";

export default function PrivacyPolicyPage() {
    return (
        <section className="relative overflow-hidden">
            <GridBackground>
                <div className="container mx-auto py-10 px-4 md:py-16">
                    <header className="text-center mb-10 md:mb-12">
                        <h1 className="text-3xl md:text-4xl font-extrabold text-primary mb-3">
                            سياسة الخصوصية – منصة "هـنّ لهن"
                        </h1>
                        <p className="text-gray-600 max-w-3xl mx-auto">
                            في "هـنّ لهن"، نحن ملتزمون بحماية خصوصية مستخدماتنا ومقدّمات الخدمات والشركات الداعمة والزوّار.
                            توضح هذه السياسة كيفية جمعنا واستخدامنا وحماية معلوماتك الشخصية عند استخدامك لموقعنا وخدماتنا.
                        </p>
                    </header>

                    <div className="mx-auto max-w-3xl space-y-8 leading-8 text-gray-800">
                        <section>
                            <h2 className="text-xl md:text-2xl font-bold text-foreground mb-2">١. المعلومات التي نقوم بجمعها</h2>
                            <ul className="list-disc pr-6 space-y-2">
                                <li>البيانات التي يتم إدخالها عند تسجيل الحساب (الاسم، البريد الإلكتروني، رقم الهاتف، كلمة المرور، التخصص أو مجال الخدمة).</li>
                                <li>البيانات الخاصة باستخدام الموقع (مثل الأنشطة داخل الحساب، تفضيلات البحث، الرسائل الداخلية إن وُجدت).</li>
                                <li>أي معلومات إضافية يتم تقديمها طوعاً أثناء التواصل مع مقدمة الخدمة أو العملاء.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl md:text-2xl font-bold text-foreground mb-2">٢. كيفية استخدام المعلومات</h2>
                            <ul className="list-disc pr-6 space-y-2">
                                <li>إنشاء وإدارة الحسابات الشخصية.</li>
                                <li>ربط العميلات بمقدّمات الخدمات أو بالشركات الداعمة.</li>
                                <li>تحسين تجربة الاستخدام وتطوير المنصة.</li>
                                <li>التواصل معك عبر البريد الإلكتروني أو وسائل الاتصال المسجّلة لتقديم الدعم أو مشاركة تحديثات مهمة.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl md:text-2xl font-bold text-foreground mb-2">٣. مشاركة البيانات</h2>
                            <ul className="list-disc pr-6 space-y-2">
                                <li>لا نقوم ببيع أو تأجير بياناتك الشخصية لأي طرف ثالث.</li>
                                <li>يتم مشاركة البيانات فقط عند اختيارك التواصل مع مقدمة الخدمة أو الجهة الداعمة.</li>
                                <li>الروابط الخارجية (مثل مواقع التواصل أو مواقع الشركات) خارجة عن سيطرتنا ولسنا مسؤولين عن سياساتها.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl md:text-2xl font-bold text-foreground mb-2">٤. إخلاء المسؤولية</h2>
                            <p>
                                "هـنّ لهن" هي منصة وسيطة فقط لعرض وتسهيل التواصل بين مقدّمات الخدمات والعميلات أو الشركات. لسنا مسؤولين عن:
                            </p>
                            <ul className="list-disc pr-6 space-y-2 mt-2">
                                <li>دقة أو جودة أو سلامة الخدمات المقدمة.</li>
                                <li>أي أضرار أو خسائر أو نزاعات تنشأ من التعامل المباشر بين الأطراف.</li>
                                <li>الالتزامات أو التعهدات التعاقدية التي تتم خارج المنصة.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl md:text-2xl font-bold text-foreground mb-2">٥. حقوق المستخدمين</h2>
                            <ul className="list-disc pr-6 space-y-2">
                                <li>يمكنك الوصول إلى بياناتك الشخصية وتحديثها أو طلب حذف الحساب في أي وقت.</li>
                                <li>
                                    يمكنك تقديم أي استفسار أو شكوى عبر البريد الإلكتروني الرسمي:
                                    <a href="mailto:support@honnalahonna.com" className="text-primary hover:underline mr-1">support@honnalahonna.com</a>
                                </li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl md:text-2xl font-bold text-foreground mb-2">٦. حماية البيانات</h2>
                            <p>
                                نطبق إجراءات معقولة لحماية بياناتك من الوصول غير المصرح به أو الاستخدام غير المشروع. ومع ذلك، لا يمكننا ضمان الحماية الكاملة بنسبة ١٠٠٪ نظرًا لطبيعة الإنترنت.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl md:text-2xl font-bold text-foreground mb-2">٧. التعديلات على السياسة</h2>
                            <p>
                                يحق لنا تعديل سياسة الخصوصية في أي وقت، وسيتم نشر النسخة المحدّثة على الموقع مع تغيير تاريخ النفاذ.
                            </p>
                        </section>
                    </div>
                </div>
            </GridBackground>
        </section>
    );
}
