import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Cart — Lumière" },
      { name: "description", content: "Review and manage items in your skincare cart." },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { detailedItems, subtotal, updateQuantity, removeItem, clear, count } = useCart();

  return (
    <div className="min-h-screen bg-gradient-soft">
      <SiteHeader />
      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="mb-10 text-center">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">Your bag</p>
          <h1 className="mt-2 font-serif text-4xl text-foreground sm:text-5xl">
            Shopping Cart
          </h1>
        </div>

        {detailedItems.length === 0 ? (
          <div className="rounded-3xl border border-border bg-card p-10 text-center sm:p-16">
            <ShoppingBag className="mx-auto h-10 w-10 text-muted-foreground" />
            <p className="mt-4 font-serif text-2xl text-foreground">Your cart is empty</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Discover skincare curated for your skin type.
            </p>
            <Link
              to="/skin-finder"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground"
            >
              Take the Skin Finder <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
            <div className="space-y-4">
              {detailedItems.map(({ product, quantity, lineTotal }) => (
                <div
                  key={product.id}
                  className="flex gap-4 rounded-2xl border border-border bg-card p-4 shadow-card sm:gap-6 sm:p-6"
                >
                  <Link
                    to="/products/$productId"
                    params={{ productId: product.id }}
                    className="block h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-secondary sm:h-32 sm:w-32"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover"
                    />
                  </Link>
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                          {product.category}
                        </p>
                        <Link
                          to="/products/$productId"
                          params={{ productId: product.id }}
                          className="font-serif text-base text-foreground hover:underline sm:text-lg"
                        >
                          {product.name}
                        </Link>
                      </div>
                      <button
                        onClick={() => removeItem(product.id)}
                        aria-label="Remove"
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="mt-auto flex items-end justify-between pt-3">
                      <div className="inline-flex items-center rounded-full border border-border">
                        <button
                          onClick={() => updateQuantity(product.id, quantity - 1)}
                          aria-label="Decrease"
                          className="px-3 py-2 text-foreground hover:bg-secondary rounded-l-full"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="min-w-8 text-center text-sm">{quantity}</span>
                        <button
                          onClick={() => updateQuantity(product.id, quantity + 1)}
                          aria-label="Increase"
                          className="px-3 py-2 text-foreground hover:bg-secondary rounded-r-full"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <div className="text-right">
                        <div className="font-serif text-lg text-foreground">
                          ${lineTotal.toFixed(2)}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          ${product.price} each
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <button
                onClick={clear}
                className="text-xs text-muted-foreground underline-offset-4 hover:underline"
              >
                Clear cart
              </button>
            </div>

            <aside className="h-fit rounded-2xl border border-border bg-card p-6 shadow-card lg:sticky lg:top-24">
              <h2 className="font-serif text-2xl text-foreground">Order summary</h2>
              <div className="mt-6 space-y-3 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>Items</span>
                  <span>{count}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="border-t border-border pt-3 flex justify-between font-serif text-xl text-foreground">
                  <span>Total</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
              </div>
              <button
                onClick={() => alert("Checkout flow coming soon ✨")}
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:opacity-90"
              >
                Checkout <ArrowRight className="h-4 w-4" />
              </button>
              <Link
                to="/skin-finder"
                className="mt-3 block text-center text-xs text-muted-foreground hover:text-foreground"
              >
                Continue shopping
              </Link>
            </aside>
          </div>
        )}
      </section>
    </div>
  );
}
