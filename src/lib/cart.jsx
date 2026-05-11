import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { products } from "@/data/products";

const CartContext = createContext(null);
const STORAGE_KEY = "lumiere_cart_v1";

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {}
  }, [items, hydrated]);

  const value = useMemo(() => {
    const detailedItems = items
      .map((it) => {
        const product = products.find((p) => p.id === it.productId);
        if (!product) return null;
        return {
          product,
          quantity: it.quantity,
          lineTotal: product.price * it.quantity,
        };
      })
      .filter(Boolean);

    return {
      items,
      detailedItems,
      count: items.reduce((s, i) => s + i.quantity, 0),
      subtotal: detailedItems.reduce((s, i) => s + i.lineTotal, 0),
      addItem: (productId, qty = 1) =>
        setItems((prev) => {
          const existing = prev.find((p) => p.productId === productId);
          if (existing) {
            return prev.map((p) =>
              p.productId === productId ? { ...p, quantity: p.quantity + qty } : p,
            );
          }
          return [...prev, { productId, quantity: qty }];
        }),
      removeItem: (productId) =>
        setItems((prev) => prev.filter((p) => p.productId !== productId)),
      updateQuantity: (productId, qty) =>
        setItems((prev) =>
          qty <= 0
            ? prev.filter((p) => p.productId !== productId)
            : prev.map((p) => (p.productId === productId ? { ...p, quantity: qty } : p)),
        ),
      clear: () => setItems([]),
    };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
