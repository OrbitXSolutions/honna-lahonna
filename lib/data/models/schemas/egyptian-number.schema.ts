import { z } from "zod/v4";

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
    .regex(/^1\d{9}$/, "Invalid Egyptian mobile")
    .transform((num) => `+20${num}`)
);
