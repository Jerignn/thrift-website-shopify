"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Summary from "@/components/Summary";
import { cartActions, useCart } from "@/lib/cart";
import { placeOrder, type Order } from "@/lib/orders";
import { getProduct, money, totals } from "@/lib/products";

const inputCls = "w-full rounded-sm border border-stone-400 bg-white/60 px-3 py-2.5";

export default function Checkout() {
  const cart = useCart();
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const lines = cart.flatMap((i) => {
    const p = getProduct(i.slug);
    return p ? [{ p, qty: i.qty }] : [];
  });
  const t = totals(lines.map((l) => ({ price: l.p.price, qty: l.qty })));

  if (lines.length === 0 && !busy)
    return (
      <div className="mx-auto max-w-6xl px-4 py-24 text-center">
        <h1 className="font-serif text-4xl font-bold">Nothing to check out</h1>
        <Link href="/shop" className="mt-6 inline-block underline">Back to the shop</Link>
      </div>
    );

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    const c = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    const order = placeOrder(
      c as Order["customer"],
      lines.map((l) => ({ slug: l.p.slug, name: l.p.name, price: l.p.price, qty: l.qty })),
    );
    cartActions.clear();
    router.push(`/order?id=${order.id}`);
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="font-serif text-4xl font-bold">Checkout</h1>
      <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_360px]">
        <form onSubmit={submit} className="space-y-4">
          <h2 className="font-serif text-xl font-bold">Shipping details</h2>
          <input name="name" required placeholder="Full name" autoComplete="name" className={inputCls} />
          <input name="email" type="email" required placeholder="Email" autoComplete="email" className={inputCls} />
          <input name="address" required placeholder="Street address" autoComplete="street-address" className={inputCls} />
          <div className="grid grid-cols-2 gap-4">
            <input name="city" required placeholder="City" autoComplete="address-level2" className={inputCls} />
            <input name="zip" required placeholder="ZIP / Postal code" autoComplete="postal-code" className={inputCls} />
          </div>
          <input name="country" required placeholder="Country" defaultValue="United States" autoComplete="country-name" className={inputCls} />
          <p className="rounded-sm bg-stone-200 p-3 text-sm text-stone-700">Payment: pay on delivery (demo store — nothing is charged and nothing is sent anywhere).</p>
          <button disabled={busy} className="w-full rounded-full bg-stone-900 py-3.5 font-medium text-white hover:bg-[#b4532a] disabled:opacity-50">
            {busy ? "Placing order…" : `Place order · ${money(t.total)}`}
          </button>
        </form>
        <aside className="h-fit rounded-sm border border-stone-300 p-6">
          <h2 className="mb-4 font-serif text-xl font-bold">Your order</h2>
          <ul className="mb-4 space-y-1 text-sm">
            {lines.map(({ p, qty }) => (
              <li key={p.slug} className="flex justify-between gap-2"><span>{p.name} × {qty}</span><span>{money(p.price * qty)}</span></li>
            ))}
          </ul>
          <Summary t={t} />
        </aside>
      </div>
    </div>
  );
}
