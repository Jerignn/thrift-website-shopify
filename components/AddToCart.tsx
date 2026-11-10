"use client";
import { cartActions, useCart } from "@/lib/cart";
import { setDrawer } from "@/lib/ui";
import WishlistButton from "@/components/WishlistButton";

export default function AddToCart({ slug, available }: { slug: string; available: number }) {
  const inCart = useCart().find((i) => i.slug === slug)?.qty ?? 0;
  const full = inCart >= available;
  return (
    <div className="flex items-center gap-3">
      <button
        onClick={() => {
          if (full) return setDrawer(true);
          cartActions.add(slug, available);
          setDrawer(true);
        }}
        className="flex-1 rounded-full bg-stone-900 py-3.5 font-medium text-white transition hover:bg-[#b4532a]"
      >
        {full ? "In your cart — view cart" : "Add to cart"}
      </button>
      <WishlistButton slug={slug} className="!h-12 !w-12 border border-stone-400 !bg-transparent" />
    </div>
  );
}
