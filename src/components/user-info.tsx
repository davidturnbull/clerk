"use client";

import { useSession, useUser } from "@clerk/nextjs";

export function UserInfo() {
  const { user } = useUser();
  const { session } = useSession();

  if (!user) {
    return null;
  }

  return (
    <div>
      <p>
        <strong>Name:</strong> {user.fullName}
      </p>
      <p>
        <strong>Email:</strong> {user.primaryEmailAddress?.emailAddress}
      </p>
      <p>
        <strong>Session ID:</strong> {session?.id}
      </p>
    </div>
  );
}
