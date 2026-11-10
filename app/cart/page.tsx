"use client";
import Image from "next/image";
import Link from "next/link";
import Summary from "@/components/Summary";
import { cartActions, useCart } from "@/lib/cart";
import { getProduct, money, totals } from "@/lib/products";

export default function CartPage() {
  const cart = useCart();
  const lines = cart.flatMap((i) => {
    const p = getProduct(i.slug);
    return p ? [{ p, qty: i.qty }] : [];
  });
  const t = totals(lines.map((l) => ({ price: l.p.price, qty: l.qty })));

  if (lines.length === 0)
    return (
      <div className="mx-auto max-w-6xl px-4 py-24 text-center">
        <h1 className="font-serif text-4xl font-bold">Your cart is empty</h1>
        <Link href="/shop" className="mt-6 inline-block rounded-full bg-stone-900 px-8 py-3 text-white">Go thrifting</Link>
      </div>
    );

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="font-serif text-4xl font-bold">Your cart</h1>
      <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_360px]">
        <ul className="divide-y divide-stone-300 border-y border-stone-300">
          {lines.map(({ p, qty }) => (
            <li key={p.slug} className="flex gap-4 py-5">
              <Link href={`/product/${p.slug}`} className="relative h-28 w-24 shrink-0 overflow-hidden rounded-sm bg-stone-200">
                <Image src={p.image} alt={p.name} fill sizes="96px" className="object-cover" />
              </Link>
              <div className="flex flex-1 flex-col justify-between">
                <div className="flex justify-between gap-2">
                  <div>
                    <p className="text-xs uppercase text-stone-500">{p.brand}</p>
                    <p className="font-medium">{p.name}</p>
                    <p className="text-sm text-stone-500">Size {p.size}</p>
                  </div>
                  <p className="font-semibold">{money(p.price * qty)}</p>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  {p.stock > 1 && (
                    <div className="flex items-center rounded-full border border-stone-400">
                      <button aria-label="Decrease" onClick={() => cartActions.setQty(p.slug, qty - 1)} className="px-3 py-1">−</button>
                      <span className="w-6 text-center">{qty}</span>
                      <button aria-label="Increase" disabled={qty >= p.stock} onClick={() => cartActions.setQty(p.slug, qty + 1)} className="px-3 py-1 disabled:opacity-30">+</button>
                    </div>
                  )}
                  <button onClick={() => cartActions.remove(p.slug)} className="underline">Remove</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <aside className="h-fit rounded-sm border border-stone-300 p-6">
          <h2 className="mb-4 font-serif text-xl font-bold">Order summary</h2>
          <Summary t={t} />
          {t.shipping > 0 && <p className="mt-3 text-xs text-stone-500">Add {money(75 - t.subtotal)} more for free shipping.</p>}
          <Link href="/checkout" className="mt-6 block rounded-full bg-stone-900 py-3.5 text-center font-medium text-white hover:bg-[#b4532a]">Checkout</Link>
        </aside>
      </div>
    </div>
  );
}
