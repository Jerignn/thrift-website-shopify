"use client";
import { toggleWish, useWishlist } from "@/lib/wishlist";

export default function WishlistButton({ slug, className = "" }: { slug: string; className?: string }) {
  const on = useWishlist().includes(slug);
  return (
    <button
      type="button"
      aria-pressed={on}
      aria-label={on ? "Remove from wishlist" : "Save to wishlist"}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleWish(slug);
      }}
      className={`grid h-9 w-9 place-items-center rounded-full bg-white/90 shadow-sm transition hover:scale-110 ${className}`}
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill={on ? "#b4532a" : "none"} stroke={on ? "#b4532a" : "currentColor"} strokeWidth="2">
        <path d="M12 21s-7.5-4.6-9.5-9.2C1.2 8.5 3 5 6.4 5c2 0 3.7 1.1 5.6 3.3C13.900 6.100 15.600 5 17.600 5 21 5 22.800 8.500 21.500 11.800 19.500 16.400 12 21 12 21z" />
      </svg>
    </button>
  );
}
