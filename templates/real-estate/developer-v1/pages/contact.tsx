import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "../components/site/SiteShell";
import { PageHeader } from "../components/site/PageHeader";
import { ContactSection } from "../components/site/ContactSection";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — {{businessName}}" },
      { name: "description", content: "Speak to the {{businessName}} relationship team. Office, phone, email and directions." },
      { property: "og:title", content: "Contact {{businessName}}" },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: () => (
    <SiteShell>
      <PageHeader eyebrow="Contact" title="Let's talk." subtitle="We'd love to hear from you. A senior advisor will respond within 2 working hours." />
      <ContactSection />
    </SiteShell>
  ),
});
