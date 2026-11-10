"use client";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { getProduct } from "@/lib/products";
import { useWishlist } from "@/lib/wishlist";

export default function Wishlist() {
  const items = useWishlist().flatMap((s) => getProduct(s) ?? []);
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="font-serif text-4xl font-bold">Your wishlist</h1>
      {items.length === 0 ? (
        <p className="mt-10 text-stone-600">Tap the heart on any piece to save it here. <Link href="/shop" className="underline">Browse the shop</Link></p>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 lg:grid-cols-4">
          {items.map((p) => <ProductCard key={p.slug} p={p} />)}
        </div>
      )}
    </div>
  );
}
