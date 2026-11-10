"use client";
import { useSyncExternalStore } from "react";
import { totals } from "@/lib/products";

export type OrderLine = { slug: string; name: string; price: number; qty: number };
export type Order = {
  id: string;
  createdAt: string;
  customer: { name: string; email: string; address: string; city: string; zip: string; country: string };
  lines: OrderLine[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
};

const KEY = "thrift-shop-orders";
let cache: Order[] | null = null;
const listeners = new Set<() => void>();

function load(): Order[] {
  if (cache) return cache;
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) ?? "[]");
    cache = Array.isArray(raw) ? raw : [];
  } catch {
    cache = [];
  }
  return cache!;
}

export function placeOrder(customer: Order["customer"], lines: OrderLine[]): Order {
  const order: Order = {
    id: "TS-" + Math.random().toString(16).slice(2, 10).toUpperCase(),
    createdAt: new Date().toISOString(),
    customer,
    lines,
    ...totals(lines),
  };
  cache = [...load(), order];
  try {
    localStorage.setItem(KEY, JSON.stringify(cache));
  } catch {}
  listeners.forEach((l) => l());
  return order;
}

const EMPTY: Order[] = [];
export function useOrders() {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    load,
    () => EMPTY,
  );
}
