import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Star, ShoppingBag, Check, Minus, Plus, Sparkles } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { products, skinTypeLabels, type Product } from "@/data/products";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/products/$productId")({
  head: ({ params }) => {
    const product = products.find((p) => p.id === params.productId);
    return {
      meta: [
        { title: product ? `${product.name} — Lumière` : "Product — Lumière" },
        {
          name: "description",
          content: product?.keyBenefit ?? "Premium skincare product.",
        },
      ],
    };
  },
  loader: ({ params }) => {
    const product = products.find((p) => p.id === params.productId);
    if (!product) throw notFound();
    return { product };
  },
  component: ProductPage,
  notFoundComponent: () => (
    <div className="min-h-screen bg-gradient-soft">
      <SiteHeader />
      <div className="mx-auto max-w-md py-24 text-center">
        <h1 className="font-serif text-4xl">Product not found</h1>
        <Link to="/" className="mt-6 inline-block text-primary underline">
          Back to home
        </Link>
      </div>
    </div>
  ),
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem(product.id, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className="min-h-screen bg-gradient-soft">
      <SiteHeader />
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
        <Link
          to="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </Link>

        <div className="grid gap-8 md:grid-cols-2 md:gap-12">
          <div className="overflow-hidden rounded-3xl bg-secondary shadow-card">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover aspect-square"
            />
          </div>

          <div className="flex flex-col">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">
              {product.category}
            </p>
            <h1 className="mt-2 font-serif text-3xl text-foreground sm:text-4xl md:text-5xl">
              {product.name}
            </h1>

            <div className="mt-3 flex items-center gap-2 text-sm">
              <Star className="h-4 w-4 fill-foreground text-foreground" />
              <span className="font-medium">{product.rating}</span>
              <span className="text-muted-foreground">
                ({product.reviews.toLocaleString()} reviews)
              </span>
            </div>

            <p className="mt-6 text-base leading-relaxed text-foreground/80">
              {product.keyBenefit}
            </p>

            <div className="mt-6 flex flex-wrap gap-1.5">
              {product.skinTypes.map((s) => (
                <span
                  key={s}
                  className="rounded-full bg-accent/50 px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-accent-foreground"
                >
                  {skinTypeLabels[s]}
                </span>
              ))}
            </div>

            <div className="mt-8 rounded-2xl bg-gradient-bloom p-5">
              <div className="mb-2 flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-wider text-primary">
                <Sparkles className="h-3 w-3" /> Why this product suits your skin
              </div>
              <p className="text-sm leading-relaxed text-foreground/80">
                Formulated for {product.skinTypes.map((s) => skinTypeLabels[s].toLowerCase()).join(", ")} skin.
                Powered by {product.ingredients.slice(0, 2).join(" and ")} to {product.benefits[0]?.toLowerCase()}.
              </p>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div>
                <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Key ingredients
                </h3>
                <ul className="mt-2 space-y-1 text-sm text-foreground">
                  {product.ingredients.map((i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className="h-3.5 w-3.5 text-primary" /> {i}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Benefits
                </h3>
                <ul className="mt-2 space-y-1 text-sm text-foreground">
                  {product.benefits.map((b) => (
                    <li key={b} className="flex items-center gap-2">
                      <Check className="h-3.5 w-3.5 text-primary" /> {b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-4 border-t border-border pt-6">
              <div className="font-serif text-3xl text-foreground">${product.price}</div>
              <div className="inline-flex items-center rounded-full border border-border">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  aria-label="Decrease"
                  className="px-3 py-2 hover:bg-secondary rounded-l-full"
                >
                  <Minus className="h-3.5 w-3.5" />
                </button>
                <span className="min-w-8 text-center text-sm">{qty}</span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  aria-label="Increase"
                  className="px-3 py-2 hover:bg-secondary rounded-r-full"
                >
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>
              <button
                onClick={handleAdd}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                {added ? (
                  <>
                    <Check className="h-4 w-4" /> Added to cart
                  </>
                ) : (
                  <>
                    <ShoppingBag className="h-4 w-4" /> Add to cart
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
