"use client";
import { cartActions, useCart } from "@/lib/cart";
import { money } from "@/lib/products";
import { setDrawer } from "@/lib/ui";

export default function StickyBuy({ slug, name, price, available }: { slug: string; name: string; price: number; available: number }) {
  const inCart = (useCart().find((i) => i.slug === slug)?.qty ?? 0) >= available;
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex items-center gap-3 border-t border-stone-300 bg-[#f6f1e7]/95 px-4 py-3 backdrop-blur md:hidden">
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium">{name}</p>
        <p className="text-sm font-semibold">{money(price)}</p>
      </div>
      <button
        onClick={() => {
          if (!inCart) cartActions.add(slug, available);
          setDrawer(true);
        }}
        className="rounded-full bg-stone-900 px-6 py-3 text-sm font-medium text-white active:bg-[#b4532a]"
      >
        {inCart ? "View cart" : "Add to cart"}
      </button>
    </div>
  );
}
