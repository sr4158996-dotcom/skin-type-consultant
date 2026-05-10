import { Link } from "@tanstack/react-router";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
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
          <a href="#shop" className="transition-colors hover:text-foreground">Shop</a>
          <a href="#journal" className="transition-colors hover:text-foreground">Journal</a>
        </nav>
        <Link
          to="/skin-finder"
          className="rounded-full bg-primary px-4 py-2 text-xs font-medium uppercase tracking-wider text-primary-foreground transition-opacity hover:opacity-90"
        >
          Find My Routine
        </Link>
      </div>
    </header>
  );
}
