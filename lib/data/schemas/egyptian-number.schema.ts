import { z } from "zod/v4";

// Regex for 10-digit Egyptian mobile numbers starting with 1
const EG_MOBILE_REGEX = /^1\d{9}$/;

export const egyptianPhone = z.preprocess(
  (input) => {
    if (typeof input !== "string") return input;
    let val = input.trim();

    if (val.startsWith("0020")) val = val.slice(4);
    else if (val.startsWith("20")) val = val.slice(2);
    else if (val.startsWith("0")) val = val.slice(1);

    return val;
  },
  z
    .string()
    .refine((num) => EG_MOBILE_REGEX.test(num), {
      message:
        "Invalid Egyptian mobile number (must be 10 digits starting with 1)",
      path: [], // You can set path for custom nesting if needed
    })
    .transform((num) => `+20${num}`)
);
