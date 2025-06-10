"use client";

import { serviceProvideSchema } from "@/lib/data/models/schemas/service-provider.schema";
import { actionClient } from "@/lib/safe-action";
import { returnValidationErrors } from "next-safe-action";

export const registerProviderAction = actionClient.use(function middleware(s) {
    return s;
} )
  .inputSchema(serviceProvideSchema)
    .action(async ({ parsedInput: data }) => {
      

    // return returnValidationErrors(serviceProvideSchema, {
    //   _errors: ["Incorrect credentials"],
    // });
  });
