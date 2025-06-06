import React from "react";
import GridBackground from "../molecules/grid-background";
import { SupabasePaths } from "@/lib/constants/supabase";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

/**
 * Only Female names, the websites about female community and services.
 * Arabic only.
 * All 5 stars
 */
const testimonials = [
  {
    id: 1,
    name: "مريم عبدالله",
    comment:
      "أدعمك لتزدادي وعياً وتمكناً وثقة وقدرة لخوض الرحلة بكامل صحتك وعافيتك كإمرأة وأم أدعمك لتزدادي وعياً وتمكناً وثقة وقدرة",
    avatar: `${SupabasePaths.USERS}/${"user_avatar.png"}`,
    rate: 5,
  },
  {
    id: 2,
    name: "سارة أحمد",
    comment:
      "أدعمك لتزدادي وعياً وتمكناً وثقة وقدرة لخوض الرحلة بكامل صحتك ووعياً وتمكناً وثقة وقدرة لخوض الرحلة بكامل صحتك ووعياً وتمكناً وثقة وقدرة لخوض الرحلة بكامل صحتك وعافيتك كإمرأة وأم أدعمك لتزدادي وعياً وتمكناً وثقة وقدرة",
    avatar: `${SupabasePaths.USERS}/${"user_avatar.png"}`,
    rate: 5,
  },

  {
    id: 3,
    name: "فاطمة الزهراء",
    comment:
      "أدعمك لتزدادي وعياً وتمكناً وثقة وقدرة لخوض الرحلة بكامل صحتك ووعياً وتمكناً وثقة وقدرة لخوض الرحلة بكامل صحتك ووعياً وتمكناً وثقة وقدرة لخوض الرحلة بكامل صحتك وعافيتك كإمرأة وأم أدعمك لتزدادي وعياً وتمكناً وثقة وقدرة",
    avatar: `${SupabasePaths.USERS}/${"user_avatar.png"}`,
    rate: 5,
  },
  {
    id: 4,
    name: "عائشة محمد",
    comment:
      "أدعمك لتزدادي وعياً وتمكناً وثقة وقدرة لخوض الرحلة بكامل صحتك وعافيتك كإمرأة وأم أدعمك لتزدادي وعياً وتمكناً وثقة وقدرة",
    avatar: `${SupabasePaths.USERS}/${"user_avatar.png"}`,
    rate: 5,
  },
  {
    id: 5,
    name: "هالة يوسف",
    comment:
      "أدعمك لتزدادي وعياً وتمكناً وثقة وقدرة لخوض الرحلة بكامل صحتك ووعياً وتمكناً وثقة وقدرة لخوض الرحلة بكامل صحتك وعافيتك كإمرأة وأم أدعمك لتزدادي وعياً وتمكناً وثقة وقدرة",
    avatar: `${SupabasePaths.USERS}/${"user_avatar.png"}`,
    rate: 5,
  },
  {
    id: 6,
    name: "ليلى علي",
    comment:
      "أدعمك لتزدادي وعياً وتمكناً وثقة وقدرة لخوض الرحلة بكامل صحتك وعافيتك كإمرأة وأم أدعمك لتزدادي وعياً وتمكناً وثقة وقدرة",
    avatar: `${SupabasePaths.USERS}/${"user_avatar.png"}`,
    rate: 5,
  },
  {
    id: 7,
    name: "نجلاء سعيد",
    comment:
      "أدعمك لتزدادي وعياً وتمكناً وثقة وقدرة لخوض الرحلة بكامل صحتك ووعياً وتمكناً وثقة وقدرة لخوض الرحلة بكامل صحتك ووعياً وتمكناً وثقة وقدرة لخوض الرحلة بكامل صحتك وعافيتك كإمرأة وأم أدعمك لتزدادي وعياً وتمكناً وثقة وقدرة",
    avatar: `${SupabasePaths.USERS}/${"user_avatar.png"}`,
    rate: 5,
  },
  {
    id: 8,
    name: "منى حسن",
    comment:
      "أدعمك لتزدادي وعياً وتمكناً وثقة وقدرة لخوض الرحلة بكامل صحتك وعافيتك كإمرأة وأم أدعمك لتزدادي وعياً وتمكناً وثقة وقدرة",
    avatar: `${SupabasePaths.USERS}/${"user_avatar.png"}`,
    rate: 5,
  },
];

export default function HomeTestimonials() {
  return (
    <section className="testimonials relative">
      <GridBackground color="text-background" className="p-5">
        <div className="container mx-auto text-center space-y-10">
          <p>
            <span className="font-medium">{"ــــــــــــــ"}</span>&nbsp;
            <span className="font-medium">{"أراء عملاؤنا"}</span>
          </p>

          <h2 className="text-3xl md:text-4xl font-bold">
            <span>{"مجتمع"}</span>&nbsp;
            <span className="text-primary">{"مُلهم"}</span>&nbsp;
            <span>{"في إنتظارك"}</span>
          </h2>

          <div className="columns-2xs md:columns-3 lg:columns-4">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="break-inside-avoid p-3 bg-white rounded-3xl mb-4 border transition-transform hover:scale-105"
              >
                <p className="text-gray-600 mb-3 text-start">
                  {testimonial.comment}
                </p>
                <div className="flex items-center gap-3 mb-2">
                  <Avatar className="w-6 h-6">
                    <AvatarImage
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="object-cover"
                    />
                    <AvatarFallback>
                      {testimonial.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-start">
                    <h3 className="font-semibold">{testimonial.name}</h3>
                    <p>
                      <span className="text-gray-500 text-sm">
                        {testimonial.rate.toFixed(1)}
                      </span>
                      &nbsp;
                      <span className="text-yellow-500">{"★"}</span>&nbsp;
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </GridBackground>
    </section>
  );
}
