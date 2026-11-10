"use client";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import { CATEGORIES, money, products } from "@/lib/products";

const SORTS = { new: "Newest", low: "Price: low to high", high: "Price: high to low" } as const;
const CONDITIONS = ["Like new", "Great", "Good", "Well loved"] as const;
const MAX = Math.max(...products.map((p) => p.price));

export default function ShopClient() {
  const [showFilters, setShowFilters] = useState(false);
  const sp = useSearchParams();
  const router = useRouter();
  const category = sp.get("category") ?? "";
  const sort = sp.get("sort") ?? "new";
  const q = sp.get("q") ?? "";
  const conds = sp.getAll("cond");
  const max = Number(sp.get("max")) || MAX;

  let list = products.filter(
    (p) =>
      (!category || p.category === category) &&
      (!q || `${p.name} ${p.brand}`.toLowerCase().includes(q.toLowerCase())) &&
      (conds.length === 0 || conds.includes(p.condition)) &&
      p.price <= max,
  );
  if (sort === "low") list = [...list].sort((a, b) => a.price - b.price);
  if (sort === "high") list = [...list].sort((a, b) => b.price - a.price);

  const build = (o: Record<string, string | string[]>) => {
    const state: Record<string, string | string[]> = { category, sort, q, cond: conds, max: max === MAX ? "" : String(max), ...o };
    const next = new URLSearchParams();
    for (const [k, v] of Object.entries(state)) {
      if (k === "sort" && v === "new") continue;
      for (const x of Array.isArray(v) ? v : [v]) if (x) next.append(k, x);
    }
    const s = next.toString();
    return s ? `/shop?${s}` : "/shop";
  };
  const go = (o: Record<string, string | string[]>) => router.replace(build(o), { scroll: false });
  const chip = (on: boolean) => `rounded-full border px-4 py-1.5 text-sm transition ${on ? "border-stone-900 bg-stone-900 text-white" : "border-stone-400 hover:border-stone-900"}`;
  const filtered = !!(category || q || conds.length || max !== MAX);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="font-serif text-4xl font-bold">{category || "Shop all"}</h1>
      <button
        onClick={() => setShowFilters(!showFilters)}
        aria-expanded={showFilters}
        className="mt-6 flex w-full items-center justify-between rounded-full border border-stone-400 px-5 py-2.5 text-sm font-medium lg:hidden"
      >
        <span>Filters{filtered ? " (active)" : ""}</span><span>{showFilters ? "−" : "+"}</span>
      </button>
      <div className="mt-6 grid gap-8 lg:mt-8 lg:grid-cols-[220px_1fr]">
        <aside className={`space-y-6 text-sm ${showFilters ? "" : "hidden"} lg:block`}>
          <input
            key={q}
            defaultValue={q}
            type="search"
            aria-label="Search"
            placeholder="Search brand or item"
            onChange={(e) => go({ q: e.target.value })}
            className="w-full rounded-full border border-stone-400 bg-transparent px-4 py-2"
          />
          <div>
            <p className="mb-2 font-semibold">Category</p>
            <div className="flex flex-wrap gap-2">
              <Link href={build({ category: "" })} className={chip(!category)}>All</Link>
              {CATEGORIES.map((c) => <Link key={c} href={build({ category: c })} className={chip(category === c)}>{c}</Link>)}
            </div>
          </div>
          <div>
            <p className="mb-2 font-semibold">Condition</p>
            {CONDITIONS.map((c) => (
              <label key={c} className="flex items-center gap-2 py-1">
                <input type="checkbox" checked={conds.includes(c)} onChange={(e) => go({ cond: e.target.checked ? [...conds, c] : conds.filter((x) => x !== c) })} className="accent-[#b4532a]" />
                {c}
              </label>
            ))}
          </div>
          <div>
            <p className="mb-2 flex justify-between font-semibold"><span>Max price</span><span>{money(max)}</span></p>
            <input type="range" min={10} max={MAX} step={1} value={max} onChange={(e) => go({ max: e.target.value })} className="w-full accent-[#b4532a]" />
          </div>
          {filtered && <Link href="/shop" className="underline">Clear all filters</Link>}
        </aside>
        <div>
          <div className="mb-6 flex items-center justify-between text-sm">
            <p className="text-stone-600">{list.length} {list.length === 1 ? "piece" : "pieces"}</p>
            <select aria-label="Sort" value={sort} onChange={(e) => go({ sort: e.target.value })} className="rounded-full border border-stone-400 bg-transparent px-3 py-1.5">
              {Object.entries(SORTS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
            </select>
          </div>
          {list.length === 0 ? (
            <p className="mt-16 text-center text-stone-600">Nothing matches that. <Link href="/shop" className="underline">Clear filters</Link></p>
          ) : (
            <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3">
              {list.map((p) => <ProductCard key={p.slug} p={p} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
