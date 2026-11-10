"use client";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import { setDrawer } from "@/lib/ui";
import { useWishlist } from "@/lib/wishlist";

const links = [
  ["/shop", "Shop all"],
  ["/shop?category=Outerwear", "Outerwear"],
  ["/shop?category=Shoes", "Shoes"],
  ["/#about", "About"],
] as const;

export default function Header() {
  const count = useCart().reduce((s, i) => s + i.qty, 0);
  const wishes = useWishlist().length;
  const [menu, setMenu] = useState(false);
  return (
    <>
      <div className="bg-stone-900 py-2 text-center text-xs tracking-wide text-stone-100">
        Free shipping on orders over $75 · New pieces dropped every Friday
      </div>
      <header className="sticky top-0 z-30 border-b border-stone-300 bg-[#f6f1e7]/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <button className="md:hidden" aria-label="Menu" aria-expanded={menu} onClick={() => setMenu(!menu)}>
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2"><path d={menu ? "M6 6l12 12M18 6L6 18" : "M3 6h18M3 12h18M3 18h18"} /></svg>
          </button>
          <Link href="/" className="font-serif text-2xl font-bold tracking-tight">
            thrift<span className="text-[#b4532a]">.</span>shop
          </Link>
          <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
            {links.map(([h, l]) => <Link key={h} href={h} className="hover:text-[#b4532a]">{l}</Link>)}
          </nav>
          <div className="flex items-center gap-3 text-sm font-medium">
            <Link href="/wishlist" aria-label={`Wishlist (${wishes})`} className="relative">
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 21s-7.500-4.600-9.500-9.200C1.200 8.500 3 5 6.400 5c2 0 3.700 1.100 5.600 3.300C13.900 6.100 15.600 5 17.600 5 21 5 22.800 8.500 21.500 11.800 19.500 16.400 12 21 12 21z" /></svg>
              <span suppressHydrationWarning className={`absolute -right-2 -top-2 rounded-full bg-[#b4532a] px-1.5 text-[10px] text-white ${wishes ? "" : "hidden"}`}>{wishes}</span>
            </Link>
            <button onClick={() => setDrawer(true)} className="rounded-full border border-stone-800 px-4 py-1.5 hover:bg-stone-900 hover:text-white">
              Cart
              <span suppressHydrationWarning className="ml-2 inline-flex min-w-5 justify-center rounded-full bg-[#b4532a] px-1.5 text-xs text-white">{count}</span>
            </button>
          </div>
        </div>
        {menu && (
          <nav className="flex flex-col border-t border-stone-300 px-4 py-2 md:hidden">
            {links.map(([h, l]) => <Link key={h} href={h} onClick={() => setMenu(false)} className="border-b border-stone-200 py-3 last:border-0">{l}</Link>)}
          </nav>
        )}
      </header>
    </>
  );
}
