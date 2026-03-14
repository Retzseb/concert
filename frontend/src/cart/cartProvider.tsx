import React, { createContext, useCallback, useContext, useMemo, useState } from "react";

export type CartItem = {
  concertId: number;
  concertName: string;
  date?: string;
  place?: string;
  seatId: string;
  seatDbId: number;
  price: number;
  discountId: number;
};

type CartCtx = {
  items: CartItem[];
  addItems: (newItems: CartItem[]) => void;
  removeItem: (concertId: number, seatDbId: number) => void;
  updateDiscount: (concertId: number, seatDbId: number, discountId: number) => void;
  clear: () => void;
};

const CartContext = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItems = useCallback((newItems: CartItem[]) => {
    setItems((prev) => {
      const key = (x: CartItem) => `${x.concertId}:${x.seatDbId}`;
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

  const removeItem = useCallback((concertId: number, seatDbId: number) => {
    setItems((prev) => prev.filter((x) => !(x.concertId === concertId && x.seatDbId === seatDbId)));
  }, []);

  const updateDiscount = useCallback((concertId: number, seatDbId: number, discountId: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.concertId === concertId && item.seatDbId === seatDbId
          ? { ...item, discountId }
          : item
      )
    );
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const value = useMemo(
    () => ({ items, addItems, removeItem, updateDiscount, clear }),
    [items, addItems, removeItem, updateDiscount, clear]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("");
  return ctx;
}
