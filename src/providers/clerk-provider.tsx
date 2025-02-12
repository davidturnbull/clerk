"use client";

import { ClerkProvider as DefaultClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";

interface ClerkProviderProps {
  children: React.ReactNode;
}

export function ClerkProvider({ children }: ClerkProviderProps) {
  const { resolvedTheme } = useTheme();

  const isDarkTheme = resolvedTheme === "dark";
  const baseTheme = isDarkTheme ? dark : undefined;

  return (
    <DefaultClerkProvider appearance={{ baseTheme }}>
      {children}
    </DefaultClerkProvider>
  );
}
