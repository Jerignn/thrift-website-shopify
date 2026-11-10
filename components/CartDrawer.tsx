"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import Summary from "@/components/Summary";
import { cartActions, useCart } from "@/lib/cart";
import { FREE_SHIPPING_OVER, getProduct, money, totals } from "@/lib/products";
import { setDrawer, useDrawerOpen } from "@/lib/ui";

export default function CartDrawer() {
  const open = useDrawerOpen();
  const cart = useCart();
  const lines = cart.flatMap((i) => {
    const p = getProduct(i.slug);
    return p ? [{ p, qty: i.qty }] : [];
  });
  const t = totals(lines.map((l) => ({ price: l.p.price, qty: l.qty })));
  const progress = Math.min(100, (t.subtotal / FREE_SHIPPING_OVER) * 100);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setDrawer(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className={`fixed inset-0 z-50 ${open ? "" : "pointer-events-none"}`} aria-hidden={!open}>
      <div onClick={() => setDrawer(false)} className={`absolute inset-0 bg-stone-900/50 transition-opacity ${open ? "opacity-100" : "opacity-0"}`} />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-[#f6f1e7] shadow-2xl transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between border-b border-stone-300 px-5 py-4">
          <h2 className="font-serif text-xl font-bold">Your cart ({cart.reduce((s, i) => s + i.qty, 0)})</h2>
          <button onClick={() => setDrawer(false)} aria-label="Close cart" className="text-2xl leading-none">×</button>
        </div>
        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
            <p className="text-stone-600">Your cart is empty.</p>
            <Link href="/shop" onClick={() => setDrawer(false)} className="rounded-full bg-stone-900 px-6 py-2.5 text-white">Start thrifting</Link>
          </div>
        ) : (
          <>
            <div className="border-b border-stone-300 px-5 py-3 text-sm">
              {t.shipping === 0 ? "🎉 You've unlocked free shipping!" : `Add ${money(FREE_SHIPPING_OVER - t.subtotal)} for free shipping`}
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-stone-300">
                <div className="h-full rounded-full bg-[#b4532a] transition-all" style={{ width: `${progress}%` }} />
              </div>
            </div>
            <ul className="flex-1 divide-y divide-stone-300 overflow-y-auto px-5">
              {lines.map(({ p, qty }) => (
                <li key={p.slug} className="flex gap-3 py-4">
                  <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-sm bg-stone-200">
                    <Image src={p.image} alt={p.name} fill sizes="80px" className="object-cover" />
                  </div>
                  <div className="flex flex-1 flex-col justify-between text-sm">
                    <div className="flex justify-between gap-2">
                      <div>
                        <p className="text-xs uppercase text-stone-500">{p.brand}</p>
                        <p className="font-medium">{p.name}</p>
                        <p className="text-stone-500">Size {p.size}</p>
                      </div>
                      <p className="font-semibold">{money(p.price * qty)}</p>
                    </div>
                    <button onClick={() => cartActions.remove(p.slug)} className="w-fit underline">Remove</button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="space-y-4 border-t border-stone-300 p-5">
              <Summary t={t} />
              <Link href="/checkout" onClick={() => setDrawer(false)} className="block rounded-full bg-stone-900 py-3.5 text-center font-medium text-white hover:bg-[#b4532a]">Checkout</Link>
              <Link href="/cart" onClick={() => setDrawer(false)} className="block text-center text-sm underline">View full cart</Link>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
