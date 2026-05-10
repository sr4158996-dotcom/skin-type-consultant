import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { products, type Product } from "@/data/products";

export interface CartItem {
  productId: string;
  quantity: number;
}

interface CartContextValue {
  items: CartItem[];
  count: number;
  subtotal: number;
  detailedItems: { product: Product; quantity: number; lineTotal: number }[];
  addItem: (productId: string, qty?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, qty: number) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "lumiere_cart_v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
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

  const value = useMemo<CartContextValue>(() => {
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
      .filter(Boolean) as { product: Product; quantity: number; lineTotal: number }[];

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
