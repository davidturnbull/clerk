"use client";

import { ClerkProvider as DefaultClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";

interface ClerkProviderProps {
  children: React.ReactNode;
}

export function ClerkProvider({ children }: ClerkProviderProps) {
  const { resolvedTheme } = useTheme();

  const appearance = resolvedTheme === "dark" ? { baseTheme: dark } : undefined;

  return (
    <DefaultClerkProvider appearance={appearance}>
      {children}
    </DefaultClerkProvider>
  );
}
