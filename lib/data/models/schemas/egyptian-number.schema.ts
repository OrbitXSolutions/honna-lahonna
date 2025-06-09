import { z } from "zod/v4";

// Regex for 10-digit Egyptian mobile numbers starting with 1
const EG_MOBILE_REGEX = /^1\d{9}$/;

export const zodEgyptianPhone = z
  .string("رقم الهاتف مطلوب")

  .refine((num) => EG_MOBILE_REGEX.test(num), {
    error: "يرجى إدخال رقم هاتف مصر",
  })
  .transform<string>((num) => {
    // Normalize the phone number to start with +20
    if (num.startsWith("0020")) return `+20${num.slice(4)}`;
    if (num.startsWith("20")) return `+20${num.slice(2)}`;
    if (num.startsWith("0")) return `+20${num.slice(1)}`;
    return `+20${num}`;
  });

// export const egyptianPhone = z.preprocess(
//   (input) => {
//     if (typeof input !== "string") return input;
//     let val = input.trim();

//     if (val.startsWith("0020")) val = val.slice(4);
//     else if (val.startsWith("20")) val = val.slice(2);
//     else if (val.startsWith("0")) val = val.slice(1);

//     return val;
//   },
//   z
//     .string("رقم الهاتف مطلوب")
//     .refine((num) => EG_MOBILE_REGEX.test(num), {
//       message: "يرجى إدخال رقم هاتف مصري صالح مكون من 10 أرقام ويبدأ بـ 1",
//       path: [], // You can set path for custom nesting if needed
//     })
//     .transform<string>((num) => `+20${num}`)
// );
