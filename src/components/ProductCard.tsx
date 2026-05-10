import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Star, ShoppingBag, Sparkles, Check } from "lucide-react";
import type { ScoredProduct, Product } from "@/data/products";
import { skinTypeLabels } from "@/data/products";
import { useCart } from "@/lib/cart";

interface Props {
  scored?: ScoredProduct;
  product?: Product;
  index?: number;
  showMatch?: boolean;
}

export function ProductCard({ scored, product: productProp, index = 0, showMatch = true }: Props) {
  const product = scored?.product ?? productProp;
  if (!product) return null;
  const reason = scored?.reason;
  const matchPercent = scored?.matchPercent;

  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product.id, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <article
      className="group flex flex-col overflow-hidden rounded-2xl border border-border/70 bg-card shadow-card transition-all duration-500 hover:-translate-y-1 hover:shadow-soft animate-fade-up"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <Link
        to="/products/$productId"
        params={{ productId: product.id }}
        className="relative block aspect-[4/5] overflow-hidden bg-secondary"
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute left-4 top-4 rounded-full bg-background/90 px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-foreground backdrop-blur">
          {product.category}
        </div>
        {showMatch && typeof matchPercent === "number" && (
          <div className="absolute right-4 top-4 rounded-full bg-primary px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-primary-foreground shadow-soft">
            {matchPercent}% match
          </div>
        )}
      </Link>

      <div className="flex flex-1 flex-col gap-4 p-5 sm:p-6">
        <div className="flex flex-wrap gap-1.5">
          {product.skinTypes.map((s) => (
            <span
              key={s}
              className="rounded-full bg-accent/50 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-accent-foreground"
            >
              {skinTypeLabels[s]}
            </span>
          ))}
        </div>

        <div>
          <Link
            to="/products/$productId"
            params={{ productId: product.id }}
            className="font-serif text-xl leading-tight text-foreground hover:underline"
          >
            {product.name}
          </Link>
          <p className="mt-1 text-sm text-muted-foreground">{product.keyBenefit}</p>
        </div>

        <div className="flex items-center gap-1.5 text-sm">
          <Star className="h-3.5 w-3.5 fill-foreground text-foreground" />
          <span className="font-medium text-foreground">{product.rating}</span>
          <span className="text-muted-foreground">({product.reviews.toLocaleString()})</span>
        </div>

        {reason && (
          <div className="rounded-xl bg-gradient-bloom p-4">
            <div className="mb-1.5 flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-wider text-primary">
              <Sparkles className="h-3 w-3" />
              Why this suits your skin
            </div>
            <p className="text-xs leading-relaxed text-foreground/80">{reason}</p>
          </div>
        )}

        <div className="space-y-2 text-xs text-muted-foreground">
          <div>
            <span className="font-medium text-foreground">Key ingredients · </span>
            {product.ingredients.join(", ")}
          </div>
        </div>

        <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-2">
          <span className="font-serif text-2xl text-foreground">${product.price}</span>
          <div className="flex gap-2">
            <Link
              to="/products/$productId"
              params={{ productId: product.id }}
              className="rounded-full border border-border px-3 py-2 text-xs font-medium text-foreground transition-colors hover:bg-secondary"
            >
              View
            </Link>
            <button
              onClick={handleAdd}
              className="flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              {added ? (
                <>
                  <Check className="h-3.5 w-3.5" /> Added
                </>
              ) : (
                <>
                  <ShoppingBag className="h-3.5 w-3.5" /> Add
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
