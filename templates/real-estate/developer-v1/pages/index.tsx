import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "../components/site/SiteShell";
import { Hero } from "../components/site/Hero";
import { FeaturedProjects } from "../components/site/FeaturedProjects";
import { WhyChooseUs } from "../components/site/WhyChooseUs";
import { Amenities } from "../components/site/Amenities";
import { ConstructionProgress } from "../components/site/ConstructionProgress";
import { LocationAdvantages } from "../components/site/LocationAdvantages";
import { Testimonials } from "../components/site/Testimonials";
import { SiteVisitCTA } from "../components/site/SiteVisitCTA";
import { ContactSection } from "../components/site/ContactSection";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "{{businessName}} — Premium Residences & Commercial Landmarks" },
      {
        name: "description",
        content:
          "Premium residences, luxury villas and Grade-A commercial campuses. Explore {{businessName}}' on-going and ready-to-move projects.",
      },
      { property: "og:title", content: "{{businessName}} — Crafting Landmarks." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

function Home() {
  return (
    <SiteShell>
      <Hero />
      <FeaturedProjects />
      <WhyChooseUs />
      <Amenities />
      <ConstructionProgress />
      <LocationAdvantages />
      <Testimonials />
      <SiteVisitCTA />
      <ContactSection />
    </SiteShell>
  );
}
