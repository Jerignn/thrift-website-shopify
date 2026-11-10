"use client";
import { useState } from "react";

export default function Newsletter() {
  const [done, setDone] = useState(false);
  return (
    <section className="mx-auto mt-24 max-w-6xl px-4">
      <div className="rounded-sm bg-[#b4532a] px-6 py-14 text-center text-white">
        <h2 className="font-serif text-3xl font-bold">Get first dibs on Friday drops</h2>
        <p className="mx-auto mt-2 max-w-md text-white/85">Every piece is one of a kind. Join the list and shop new arrivals before anyone else.</p>
        {done ? (
          <p className="mt-6 font-medium">Thanks — you&apos;re on the list! ✓</p>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); setDone(true); }} className="mx-auto mt-6 flex max-w-md flex-col gap-3 sm:flex-row">
            <input type="email" required placeholder="you@email.com" aria-label="Email" className="flex-1 rounded-full px-5 py-3 text-stone-900" />
            <button className="rounded-full bg-stone-900 px-6 py-3 font-medium hover:bg-black">Subscribe</button>
          </form>
        )}
      </div>
    </section>
  );
}
