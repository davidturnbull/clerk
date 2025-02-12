"use client";

import { ClerkProvider as DefaultClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";
import * as React from "react";

export function ClerkProvider(
  props: React.ComponentProps<typeof DefaultClerkProvider>
) {
  const { resolvedTheme } = useTheme();

  const isDarkTheme = resolvedTheme === "dark";
  const baseTheme = isDarkTheme ? dark : undefined;
  const appearance = { ...props.appearance, baseTheme };

  return <DefaultClerkProvider {...props} appearance={appearance} />;
}
