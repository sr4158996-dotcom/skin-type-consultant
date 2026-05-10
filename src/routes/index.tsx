import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles, Leaf, ShieldCheck } from "lucide-react";
import heroImg from "@/assets/skincare-hero.jpg";
import { SiteHeader } from "@/components/SiteHeader";
import { SkinFinder } from "@/components/SkinFinder";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/data/products";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Lumière — Personalized Skincare for Your Skin Type" },
      {
        name: "description",
        content:
          "Discover skincare curated to your unique skin type. Take the Skin Type Finder for a personalized routine.",
      },
      { property: "og:title", content: "Lumière — Personalized Skincare" },
      {
        property: "og:description",
        content: "Find skincare products matched to your skin type and concerns.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-soft">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 md:grid-cols-2 md:py-28">
          <div className="animate-fade-up">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-1.5 text-xs uppercase tracking-wider text-muted-foreground backdrop-blur">
              <Sparkles className="h-3 w-3" />
              Personalized skincare
            </div>
            <h1 className="font-serif text-5xl leading-[1.05] text-foreground md:text-7xl">
              Skincare,
              <br />
              <span className="italic text-primary">made for you.</span>
            </h1>
            <p className="mt-6 max-w-md text-lg text-muted-foreground">
              Thoughtful formulations and a personal consultation that helps you find
              what your skin truly needs.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                to="/skin-finder"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                Take the Skin Finder
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/"
                hash="shop"
                className="inline-flex items-center rounded-full border border-border bg-background/50 px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
              >
                Shop the edit
              </Link>
            </div>

            <div className="mt-12 flex gap-8 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <Leaf className="h-4 w-4" /> Clean formulas
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4" /> Dermatologist-tested
              </div>
            </div>
          </div>

          <div className="relative animate-fade-in">
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-bloom blur-2xl opacity-60" />
            <img
              src={heroImg}
              alt="Curated skincare collection"
              width={1536}
              height={1024}
              className="relative aspect-[4/3] w-full rounded-[2rem] object-cover shadow-soft"
            />
          </div>
        </div>
      </section>

      {/* Shop section */}
      <section id="shop" className="scroll-mt-20 bg-background py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-12 text-center">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">The edit</p>
            <h2 className="mt-2 font-serif text-4xl text-foreground md:text-5xl">
              Shop our skincare
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} showMatch={false} />
            ))}
          </div>
        </div>
      </section>

      {/* Skin Finder section */}
      <section id="finder" className="scroll-mt-20 bg-gradient-soft py-20">
        <div className="mx-auto max-w-3xl px-4 text-center animate-fade-up sm:px-6">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs uppercase tracking-wider text-muted-foreground">
            <Sparkles className="h-3 w-3" />
            Skin Type Product Finder
          </div>
          <h2 className="font-serif text-4xl text-foreground md:text-5xl">
            A short consultation, a routine that fits.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Tell us about your skin and concerns. We'll match you with products formulated
            to support — never overwhelm — your complexion.
          </p>
        </div>
        <div className="mt-12">
          <SkinFinder compact />
        </div>
      </section>

      <footer className="border-t border-border bg-secondary/40 py-12">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 text-sm text-muted-foreground md:flex-row">
          <span className="font-serif text-xl text-foreground">Lumière</span>
          <span>© {new Date().getFullYear()} Lumière Skincare. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}
