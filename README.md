# Create a theme switcher for your Next.js app and Clerk

This guide explains how to create a theme switcher for a Next.js app that also sets the appearance of any Clerk UI components used within that app. We'll be using the App Router and building on top of the example from the [quickstart](https://clerk.com/docs/quickstarts/nextjs).

## Step 1: Set up `next-themes`

[`next-themes`](https://github.com/pacocoursey/next-themes) is a third-party library for supporting themes in Next.js apps. It's one of the easiest ways to set up theming and we'll be using it throughout this guide.

To set up `next-themes`:

1.  Install the `next-themes` package:

    ```bash
    npm install next-themes
    ```

2.  Create the following `<ThemeProvider />` component:

    ```tsx
    "use client";

    import * as React from "react";
    import { ThemeProvider as NextThemeProvider } from "next-themes";

    export function ThemeProvider(
      props: React.ComponentProps<typeof NextThemeProvider>
    ) {
      const [isMounted, setIsMounted] = React.useState(false);

      React.useEffect(() => {
        setIsMounted(true);
      }, []);

      if (!isMounted) {
        return null;
      }

      return <NextThemeProvider {...props} />;
    }
    ```

    This component allows descendant components to access the current theme. It uses the `isMounted` variable to track whether or not the component has mounted, which prevents hydration errors.

3.  Import the `<ThemeProvider />` component into the `src/app/layout.tsx` file:

    ```tsx
    import { ThemeProvider } from "../providers/theme-provider";
    ```

4.  Wrap the `<ThemeProvider />` component around the `<ClerkProvider />` component:

    ```tsx
    <ThemeProvider>
      <ClerkProvider>
        <header className="flex justify-end items-center p-4 gap-4 h-16">
          <SignedOut>
            <SignInButton />
            <SignUpButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </header>
        {children}
      </ClerkProvider>
    </ThemeProvider>
    ```

    By default, this component adds the following attributes to the page's `html` element:

    - `data-theme="<current_theme_name>"`
    - `style="color-scheme: <current_theme_name>;"`

    If you're using [Tailwind](https://tailwindcss.com/), all of the colors have light and dark equivalents, so no further setup is required.

    If you're not using Tailwind, you'll need to update your app's styles to adapt to the theme. For example, the following code demonstrates how to change variable values when the dark theme is active:

    ```css
    :root {
      --background: white;
      --foreground: black;
    }

    [data-theme="dark"] {
      --background: black;
      --foreground: white;
    }
    ```

## Step 2: Customize the `<ClerkProvider />` component

The `<ClerkProvider />` component has an `appearance` prop, which can be used to customize the styles of all Clerk UI components that are descendants of the provider.

To set the `appearance` prop based on the current theme:

1. Install the `@clerk/themes` package:

   ```bash
   npm install @clerk/themes
   ```

   This package contains various themes for Clerk's UI components, including a `dark` theme.

2. Create the following `<ClerkProvider />` component:

   ```tsx
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
   ```

   This component extends the behavior of the default `<ClerkProvider />` component by using the current theme to set its appearance.

3. Update the import path of the `<ClerkProvider />` component in the `src/app/layout.tsx` file:

   ```tsx
   import { ClerkProvider } from "../providers/clerk-provider";
   ```

## Step 3: Create a `<ThemeSwitcher />` component

To allow users to switch between themes:

1. Create the following `<ThemeSwitcher />` component:

   ```tsx
   "use client";

   import { MoonIcon, SunIcon } from "lucide-react";
   import { useTheme } from "next-themes";

   export function ThemeSwitcher() {
     const { theme, setTheme, systemTheme } = useTheme();

     const currentTheme = theme === "system" ? systemTheme : theme;
     const isLightTheme = currentTheme === "light";
     const Icon = isLightTheme ? SunIcon : MoonIcon;

     function toggleTheme() {
       setTheme(isLightTheme ? "dark" : "light");
     }

     return (
       <button onClick={toggleTheme}>
         <Icon className="h-5 w-5" />
       </button>
     );
   }
   ```

   This component:

   - Renders a button for switching between the available themes.
   - Sets the initial value based on the user's system theme.
   - Uses icons from the [`lucide-react`](https://www.npmjs.com/package/lucide-react) package.

2. Render the component as a descendant of the `<ThemeProvider />` component:

   ```tsx
   <header className="flex justify-end items-center p-4 gap-4 h-16">
     <ThemeSwitcher />
     <SignedOut>
       <SignInButton />
       <SignUpButton />
     </SignedOut>
     <SignedIn>
       <UserButton />
     </SignedIn>
   </header>
   ```

3. Toggle the theme by clicking the theme switcher.

## Step 4: Use themeable components

By default, the following buttons take users to pages hosted on Clerk's servers:

- `<SignInButton />`
- `<SignUpButton />`

As a result, the pages don't have access to the current theme.

To theme the complete authentication flow, here's what we recommend:

### Option 1: Use modals

For each button, set the `mode` prop to `"modal"`:

```tsx
<SignedOut>
  <SignInButton mode="modal" />
  <SignUpButton mode="modal" />
</SignedOut>
```

This will open the forms on the same page, in modals, which allows the components to respect the user's theme.

### Option 2: Render the forms directly

Use the `<SignUp />` or `<SignIn />` components to render forms directly within the app:

```tsx
import { SignedIn, SignedOut, SignIn } from "@clerk/nextjs";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sign in",
};

export default async function SignInPage() {
  return (
    <div>
      <SignedIn>
        <p>You're already signed in!</p>
        <Link href="/">Go home</Link>
      </SignedIn>
      <SignedOut>
        <SignIn />
      </SignedOut>
    </div>
  );
}
```
