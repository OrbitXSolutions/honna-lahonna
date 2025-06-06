import { Grid } from "lucide-react";
import React from "react";
import GridBackground from "../molecules/grid-background";
import Image from "next/image";

const registerAsServiceProviderSteps = [
  {
    image: "/home/how-to-register-1.png",
    title: "تسجيل البيانات الأساسية",
    content:
      "أدعمك لتزدادي وعياً وتمكناً وثقة وقدرة لخوض الرحلة بكامل صحتك وعافيتك كإمرأة وأم",
  },
  {
    image: "/home/how-to-register-2.png",
    title: "تأكيد الهوية",
    content:
      "أدعمك لتزدادي وعياً وتمكناً وثقة وقدرة لخوض الرحلة بكامل صحتك وعافيتك كإمرأة وأم",
  },
  {
    image: "/home/how-to-register-3.png",
    title: "تقديم الخدمات",
    content:
      "أدعمك لتزدادي وعياً وتمكناً وثقة وقدرة لخوض الرحلة بكامل صحتك وعافيتك كإمرأة وأم",
  },
];

export default function HomeTutorials() {
  return (
    <section className="tutorials relative my-10">
      <GridBackground color="text-accent" className="p-5">
        <div className="container mx-auto text-center space-y-10">
          <p>
            <span className="font-medium">{"ــــــــــــــ"}</span>&nbsp;
            <span className="font-medium">{"كيفية التسجيل"}</span>
          </p>

          <h2 className="text-3xl md:text-4xl font-bold">
            <span>{"مراحل بسيطة وسهلة لكي تكون"}</span>&nbsp;
            <span className="text-primary">{"معنا"}</span>
          </h2>

          <div className="flex flex-wrap justify-center items-center gap-5">
            {registerAsServiceProviderSteps.map((step, index) => (
              <div
                key={index}
                className="flex flex-col items-center p-5 max-w-[380px] rounded-lg"
              >
                <Image
                  className="h-40 object-contain"
                  src={step.image}
                  alt={step.title}
                  height={180}
                  width={180}
                />
                <div className="relative p-3 w-full text-start">
                  <span className="absolute top-0 start-5 font-bold text-gray-800 text-4xl opacity-20">
                    {"0" + (index + 1)}
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-center text-gray-600">{step.content}</p>
              </div>
            ))}
          </div>
        </div>
      </GridBackground>
    </section>
  );
}
