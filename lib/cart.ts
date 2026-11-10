"use client";
import { useSyncExternalStore } from "react";

export type CartItem = { slug: string; qty: number };

const KEY = "thrift-shop-cart";
const EMPTY: CartItem[] = [];
let items: CartItem[] | null = null;
const listeners = new Set<() => void>();

function load(): CartItem[] {
  if (items) return items;
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) ?? "[]");
    items = Array.isArray(raw) ? raw : [];
  } catch {
    items = [];
  }
  return items!;
}

function set(next: CartItem[]) {
  items = next;
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {}
  listeners.forEach((l) => l());
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY) {
      items = null;
      cb();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", onStorage);
  };
}

export function useCart() {
  return useSyncExternalStore(subscribe, load, () => EMPTY);
}

export const cartActions = {
  add(slug: string, max: number) {
    const cur = load();
    const found = cur.find((i) => i.slug === slug);
    if (found) {
      if (found.qty >= max) return;
      set(cur.map((i) => (i.slug === slug ? { ...i, qty: i.qty + 1 } : i)));
    } else if (max > 0) set([...cur, { slug, qty: 1 }]);
  },
  setQty(slug: string, qty: number) {
    set(load().flatMap((i) => (i.slug !== slug ? [i] : qty > 0 ? [{ ...i, qty }] : [])));
  },
  remove(slug: string) {
    set(load().filter((i) => i.slug !== slug));
  },
  clear() {
    set([]);
  },
};
