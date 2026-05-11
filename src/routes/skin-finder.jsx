import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SkinFinder } from "@/components/SkinFinder";

export const Route = createFileRoute("/skin-finder")({
  head: () => ({
    meta: [
      { title: "Skin Type Finder — Lumière" },
      {
        name: "description",
        content:
          "Find the right skincare for your skin type and concerns with our personalized Skin Type Product Finder.",
      },
      { property: "og:title", content: "Skin Type Finder — Lumière" },
      {
        property: "og:description",
        content: "Personalized product recommendations based on your skin type.",
      },
    ],
  }),
  component: SkinFinderPage,
});

function SkinFinderPage() {
  return (
    <div className="min-h-screen bg-gradient-soft">
      <SiteHeader />
      <SkinFinder />
    </div>
  );
}
