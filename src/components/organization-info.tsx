"use client";

import { useOrganization } from "@clerk/nextjs";

export function OrganizationInfo() {
  const { organization } = useOrganization();

  if (!organization) {
    return null;
  }

  return (
    <div>
      <p>
        <strong>Organization ID:</strong> {organization.id}
      </p>
      <p>
        <strong>Organization name:</strong> {organization.name}
      </p>
    </div>
  );
}
