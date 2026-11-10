"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Summary from "@/components/Summary";
import { useOrders } from "@/lib/orders";
import { money } from "@/lib/products";

export default function OrderClient() {
  const id = useSearchParams().get("id");
  const o = useOrders().find((x) => x.id === id);
  if (!o)
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center">
        <h1 className="font-serif text-4xl font-bold">Order not found</h1>
        <Link href="/shop" className="mt-6 inline-block underline">Back to the shop</Link>
      </div>
    );
  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
      <p className="text-sm font-medium uppercase tracking-widest text-[#b4532a]">Thank you!</p>
      <h1 className="mt-2 font-serif text-4xl font-bold">Order {o.id} is confirmed</h1>
      <p className="mt-3 text-stone-600">
        We&apos;ll ship to {o.customer.name}, {o.customer.address}, {o.customer.city} {o.customer.zip}, {o.customer.country}.
      </p>
      <ul className="mt-8 divide-y divide-stone-300 border-y border-stone-300">
        {o.lines.map((l) => (
          <li key={l.slug} className="flex justify-between py-3"><span>{l.name} × {l.qty}</span><span>{money(l.price * l.qty)}</span></li>
        ))}
      </ul>
      <div className="mt-4"><Summary t={o} /></div>
      <Link href="/shop" className="mt-10 inline-block rounded-full bg-stone-900 px-8 py-3 text-white">Keep shopping</Link>
    </div>
  );
}
