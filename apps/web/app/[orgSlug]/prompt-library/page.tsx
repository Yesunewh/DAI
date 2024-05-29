import { Metadata } from "next";

import { OrganizationPromptsPage } from "./organization-prompts-page";

export const metadata: Metadata = {
  title: "Organization Prompts Library",
};

export default function Page({ params }: { params: { orgSlug: string } }) {
  return <OrganizationPromptsPage params={params} />;
}
