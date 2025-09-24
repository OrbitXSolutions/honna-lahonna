import GridBackground from "@/components/molecules/grid-background";

export default function TermsOfServicePage() {
    return (
        <section className="relative overflow-hidden">
            <GridBackground>
                <div className="container mx-auto py-10 px-4 md:py-16">
                    <header className="text-center mb-10 md:mb-12">
                        <h1 className="text-3xl md:text-4xl font-extrabold text-primary mb-3">
                            شروط الاستخدام – منصة "هـنّ لهن"
                        </h1>

                    </header>

                    <div className="mx-auto max-w-3xl space-y-8 leading-8 text-gray-800">
                        <section>
                            <h2 className="text-xl md:text-2xl font-bold text-foreground mb-2">١. طبيعة المنصة</h2>
                            <ul className="list-disc pr-6 space-y-2">
                                <li>
                                    "هـنّ لهن" منصة مخصصة لتمكين المرأة عبر ربط مقدّمات الخدمات، الفريلانسرز، والشركات الداعمة بالعميلات.
                                </li>
                                <li>المنصة ليست طرفًا في أي اتفاق أو عقد يتم بين المستخدمين.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl md:text-2xl font-bold text-foreground mb-2">٢. التزامات المستخدم</h2>
                            <ul className="list-disc pr-6 space-y-2">
                                <li>تقديم بيانات صحيحة ودقيقة عند التسجيل.</li>
                                <li>الحفاظ على سرية بيانات الدخول وعدم مشاركتها مع أي طرف آخر.</li>
                                <li>الالتزام باستخدام المنصة لأغراض مشروعة فقط.</li>
                                <li>الامتناع عن نشر أي محتوى مسيء أو غير لائق أو مخالف للقوانين.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl md:text-2xl font-bold text-foreground mb-2">٣. المسؤولية</h2>
                            <ul className="list-disc pr-6 space-y-2">
                                <li>المستخدم (مقدمة الخدمة أو العميلة أو الشركة) يتحمل المسؤولية الكاملة عن أي تعامل أو اتفاق أو ضرر ينشأ نتيجة لاستخدام المنصة.</li>
                                <li>"هـنّ لهن" غير مسؤولة عن أي أخطاء أو أعطال تقنية أو توقف مؤقت للخدمة.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl md:text-2xl font-bold text-foreground mb-2">٤. الملكية الفكرية</h2>
                            <ul className="list-disc pr-6 space-y-2">
                                <li>جميع الحقوق المتعلقة بالتصميم، العلامة التجارية، المحتوى، والمواد المنشورة على المنصة مملوكة حصريًا لـ "هـنّ لهن".</li>
                                <li>لا يجوز إعادة إنتاج أو نسخ أو استخدام أي جزء من المنصة دون إذن خطي مسبق.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl md:text-2xl font-bold text-foreground mb-2">٥. إنهاء الحساب</h2>
                            <ul className="list-disc pr-6 space-y-2">
                                <li>تحتفظ إدارة "هـنّ لهن" بحقها في تعليق أو إلغاء أي حساب في حال خرق الشروط أو إساءة الاستخدام.</li>
                                <li>يحق للمستخدم حذف حسابه في أي وقت.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl md:text-2xl font-bold text-foreground mb-2">٦. القوانين المطبقة</h2>
                            <p>
                                تخضع هذه الشروط وتُفسّر وفقًا للقوانين السارية في [الدولة – مثال: جمهورية مصر العربية]، وتكون المحاكم المحلية هي الجهة المختصة في حال وقوع أي نزاع.
                            </p>
                        </section>
                    </div>
                </div>
            </GridBackground>
        </section>
    );
}
