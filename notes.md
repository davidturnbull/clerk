# Notes

The ability to set up Clerk without an API was very slick.

---

On the **Claim your application** page:

- I got stuck on the **Waiting for you to paste your keys** step. Even though I set up my keys correctly, I had to click **Skip**.
- There are references to both `.env.local` and `.env`. It wasn't obvious which file Clerk expected me to create.

---

When I used the `<OrganizationSwitcher />` component, I received an error about needing to enable configuration and was very impressed by how clear the error was.

---

I used the customized `<ThemeProvider />` component, as the challenge requested, but I'm not sure it's strictly necessary. I think it's only using `isMounted` to avoid hydration errors, but the official docs for `next-themes` recommends a simpler approach:

```tsx
import { ThemeProvider } from "next-themes";

export default function Layout({ children }) {
  return (
    <html suppressHydrationWarning>
      <head />
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
```

---

I made some stylistic tweaks to the `<ThemeProvider />` and `<ClerkProvider />` components, and hopefully made them a little easier to reason about.

---

I can see what Jeff and Alexis meant about the challenges of documenting the SDKs in a cohesive way. In the Next.js docs, it wasn't immediately obvious where the React hooks were. (But docs were good overall!)

---

My tutorial assumes that the `<ClerkProvider />` is inside the `body` element. This is _not_ how it's done in the quickstart, so ideally the quickstart would be updated.

---

As far as I can tell, when using the `<SignUpButton />` and `<SignInButton />` components, I couldn't set the theme of the authentication pages hosted on Clerk's servers. But I'm also not 100% sure.

---

It could be interesting to create multiple tutorials, each one focusing on a different styling approach (e.g. one for Tailwind, one for CSS modules, etc). Aside from the tutorials being more focused, I can imagine it driving some SEO traffic when people are researching how to create theme switchers.
