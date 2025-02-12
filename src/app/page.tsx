import { OrganizationInfo } from "@/components/organization-info";
import { UserInfo } from "@/components/user-info";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Home",
};

export default function HomePage() {
  return (
    <div>
      <SignedIn>
        <p>Welcome back, my friend!</p>
        <UserInfo />
        <OrganizationInfo />
      </SignedIn>
      <SignedOut>
        <p>Hello stranger!</p>
        <p>
          <Link href="/sign-in">Sign in</Link>
        </p>
      </SignedOut>
    </div>
  );
}
