import { useEffect, useMemo, useState } from "react";
import { Sparkles, Check, ArrowRight } from "lucide-react";
import { skinTypeLabels, concernLabels, recommendProducts } from "@/data/products";
import { ProductCard } from "./ProductCard";

const skinTypes = ["oily", "dry", "acne-prone", "sensitive", "combination", "normal"];

const skinDescriptions = {
  oily: "Shine throughout the day, visible pores",
  dry: "Tightness, flakiness, lack of moisture",
  "acne-prone": "Frequent breakouts, congestion",
  sensitive: "Easily irritated, redness, reactivity",
  combination: "Oily T-zone, dry cheeks",
  normal: "Balanced, comfortable, low concerns",
};

const concerns = [
  "acne",
  "dark-spots",
  "dullness",
  "dryness",
  "oil-control",
  "sun-protection",
  "sensitive-skin",
];

const STORAGE_KEY = "lumiere_skinfinder_v1";

export function SkinFinder({ compact = false }) {
  const [skinType, setSkinType] = useState(null);
  const [selectedConcerns, setSelectedConcerns] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const data = JSON.parse(raw);
        if (data.skinType) setSkinType(data.skinType);
        if (Array.isArray(data.concerns)) setSelectedConcerns(data.concerns);
        if (data.showResults) setShowResults(true);
      }
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ skinType, concerns: selectedConcerns, showResults }),
      );
    } catch {}
  }, [skinType, selectedConcerns, showResults, hydrated]);

  const toggleConcern = (c) => {
    setSelectedConcerns((prev) =>
      prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c],
    );
  };

  const recommendations = useMemo(
    () => (skinType ? recommendProducts(skinType, selectedConcerns) : []),
    [skinType, selectedConcerns],
  );

  const reset = () => {
    setSkinType(null);
    setSelectedConcerns([]);
    setShowResults(false);
    try { localStorage.removeItem(STORAGE_KEY); } catch {}
  };

  return (
    <section className={compact ? "" : "py-20"}>
      <div className="mx-auto max-w-6xl px-6">
        {!compact && (
          <div className="mb-14 text-center animate-fade-up">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs uppercase tracking-wider text-muted-foreground">
              <Sparkles className="h-3 w-3" />
              Personal Consultation
            </div>
            <h1 className="font-serif text-5xl text-foreground md:text-6xl">
              Skin Type Product Finder
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Answer two short questions and receive a curated routine tailored to your
              skin — no guesswork, just thoughtful recommendations.
            </p>
          </div>
        )}

        <div className="rounded-3xl border border-border/70 bg-card p-8 shadow-card md:p-12">
          <div className="mb-8 flex items-center gap-3">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
              1
            </span>
            <h2 className="font-serif text-2xl text-foreground">Choose your skin type</h2>
          </div>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
            {skinTypes.map((s) => {
              const active = skinType === s;
              return (
                <button
                  key={s}
                  onClick={() => setSkinType(s)}
                  className={`group relative rounded-2xl border p-5 text-left transition-all duration-300 ${
                    active
                      ? "border-primary bg-primary text-primary-foreground shadow-soft"
                      : "border-border bg-background hover:border-primary/40 hover:bg-secondary"
                  }`}
                >
                  {active && (
                    <Check className="absolute right-3 top-3 h-4 w-4" />
                  )}
                  <div className="font-serif text-lg">{skinTypeLabels[s]}</div>
                  <div className={`mt-1 text-xs ${active ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                    {skinDescriptions[s]}
                  </div>
                </button>
              );
            })}
          </div>

          <div className={`mt-12 transition-opacity duration-500 ${skinType ? "opacity-100" : "pointer-events-none opacity-40"}`}>
            <div className="mb-6 flex items-center gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                2
              </span>
              <h2 className="font-serif text-2xl text-foreground">
                Any concerns? <span className="text-sm text-muted-foreground">(optional)</span>
              </h2>
            </div>

            <div className="flex flex-wrap gap-2">
              {concerns.map((c) => {
                const active = selectedConcerns.includes(c);
                return (
                  <button
                    key={c}
                    onClick={() => toggleConcern(c)}
                    className={`rounded-full border px-4 py-2 text-sm transition-all ${
                      active
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-background text-foreground hover:border-primary/40 hover:bg-secondary"
                    }`}
                  >
                    {concernLabels[c]}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-8">
            <p className="text-sm text-muted-foreground">
              {skinType
                ? `${recommendations.length} products curated for your ${skinTypeLabels[skinType].toLowerCase()} skin`
                : "Select a skin type to begin"}
            </p>
            <div className="flex gap-3">
              {(skinType || selectedConcerns.length > 0) && (
                <button
                  onClick={reset}
                  className="rounded-full border border-border px-5 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-secondary"
                >
                  Reset
                </button>
              )}
              <button
                disabled={!skinType}
                onClick={() => setShowResults(true)}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-30"
              >
                Get my recommendations
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {showResults && skinType && (
          <div className="mt-16 animate-fade-in">
            <div className="mb-10 text-center">
              <p className="text-xs uppercase tracking-wider text-muted-foreground">
                Your curated routine
              </p>
              <h2 className="mt-2 font-serif text-4xl text-foreground">
                Recommended for {skinTypeLabels[skinType].toLowerCase()} skin
              </h2>
            </div>

            {recommendations.length === 0 ? (
              <div className="rounded-2xl border border-border bg-card p-12 text-center text-muted-foreground">
                No matches yet — try selecting different concerns.
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {recommendations.map((s, i) => (
                  <ProductCard key={s.product.id} scored={s} index={i} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
