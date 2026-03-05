import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

export type CartItem = {
  concertId: number;
  concertName: string;
  date?: string;
  place?: string;

  seatId: string;    
  price: number;     
};

type CartCtx = {
  items: CartItem[];
  addItems: (newItems: CartItem[]) => void;
  removeItem: (concertId: number, seatId: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartCtx | null>(null);

const STORAGE_KEY = "seaty_cart_v1";

function loadCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => loadCart());

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
    }
  }, [items]);

  const addItems = useCallback((newItems: CartItem[]) => {
    setItems((prev) => {
      const key = (x: CartItem) => `${x.concertId}:${x.seatId}`;
      const existing = new Set(prev.map(key));

      const merged = [...prev];
      for (const it of newItems) {
        if (!existing.has(key(it))) {
          merged.push(it);
          existing.add(key(it));
        }
      }
      return merged;
    });
  }, []);

  const removeItem = useCallback((concertId: number, seatId: string) => {
    setItems((prev) => prev.filter((x) => !(x.concertId === concertId && x.seatId === seatId)));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const value = useMemo(() => ({ items, addItems, removeItem, clear }), [items, addItems, removeItem, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}