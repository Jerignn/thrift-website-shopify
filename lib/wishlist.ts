"use client";
import { createStore } from "@/lib/store";

const store = createStore<string[]>([], "thrift-shop-wishlist");
export const useWishlist = store.use;
export const toggleWish = (slug: string) => {
  const cur = store.get();
  store.set(cur.includes(slug) ? cur.filter((s) => s !== slug) : [...cur, slug]);
};
