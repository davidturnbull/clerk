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
