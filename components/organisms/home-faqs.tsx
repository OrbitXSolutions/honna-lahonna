import React from "react";
import QuickFaq from "../molecules/quick-faq";
import GridBackground from "../molecules/grid-background";

export default function HomeFaqs() {
  return (
    <section className="faqs relative">
      <GridBackground color="text-background" className="p-5">
        <div className="container mx-auto text-center space-y-10">
          <p>
            <span className="font-medium">{"ــــــــــــــ"}</span>&nbsp;
            <span className="font-medium">{"الأسئلة الشائعة"}</span>
          </p>

          <h2 className="text-3xl md:text-4xl font-bold">
            <span>{"أهم"}</span>&nbsp;
            <span className="text-primary">{"الأسئلة"}</span>&nbsp;
            <span>{"التي تدور في تفكيرك"}</span>
          </h2>

          <QuickFaq />
        </div>
      </GridBackground>
    </section>
  );
}
