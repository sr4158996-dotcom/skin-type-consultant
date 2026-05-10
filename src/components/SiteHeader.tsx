import { Link } from "@tanstack/react-router";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/lib/cart";

export function SiteHeader() {
  const { count } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="font-serif text-2xl tracking-tight text-foreground">
          Lumière
        </Link>
        <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          <Link to="/" activeOptions={{ exact: true }} activeProps={{ className: "text-foreground" }} className="transition-colors hover:text-foreground">
            Home
          </Link>
          <Link to="/skin-finder" activeProps={{ className: "text-foreground" }} className="transition-colors hover:text-foreground">
            Skin Finder
          </Link>
          <Link to="/" hash="shop" className="transition-colors hover:text-foreground">
            Shop
          </Link>
        </nav>
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            to="/skin-finder"
            className="hidden rounded-full bg-primary px-4 py-2 text-xs font-medium uppercase tracking-wider text-primary-foreground transition-opacity hover:opacity-90 sm:inline-flex"
          >
            Find My Routine
          </Link>
          <Link
            to="/cart"
            aria-label="Cart"
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background hover:bg-secondary transition-colors"
          >
            <ShoppingBag className="h-4 w-4" />
            {count > 0 && (
              <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-medium text-primary-foreground">
                {count}
              </span>
            )}
          </Link>
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background md:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="border-t border-border/60 bg-background md:hidden">
          <div className="flex flex-col px-6 py-4 text-sm">
            <Link to="/" onClick={() => setOpen(false)} className="py-2 text-foreground">Home</Link>
            <Link to="/skin-finder" onClick={() => setOpen(false)} className="py-2 text-foreground">Skin Finder</Link>
            <Link to="/" hash="shop" onClick={() => setOpen(false)} className="py-2 text-foreground">Shop</Link>
            <Link to="/cart" onClick={() => setOpen(false)} className="py-2 text-foreground">Cart ({count})</Link>
          </div>
        </div>
      )}
    </header>
  );
}
