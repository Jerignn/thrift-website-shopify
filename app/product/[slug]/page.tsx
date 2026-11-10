import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import AddToCart from "@/components/AddToCart";
import StickyBuy from "@/components/StickyBuy";
import ProductCard from "@/components/ProductCard";
import { getProduct, money, products } from "@/lib/products";

export const dynamicParams = false;
export const generateStaticParams = () => products.map((p) => ({ slug: p.slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const p = getProduct((await params).slug);
  return { title: p?.name ?? "Not found" };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const p = getProduct((await params).slug);
  if (!p) notFound();
  const related = products.filter((r) => r.category === p.category && r.slug !== p.slug).slice(0, 4);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 pb-28 md:pb-10">
      <nav className="text-sm text-stone-500" aria-label="Breadcrumb">
        <Link href="/" className="hover:underline">Home</Link> / <Link href={`/shop?category=${p.category}`} className="hover:underline">{p.category}</Link> / <span className="text-stone-900">{p.name}</span>
      </nav>
      <div className="mt-6 grid gap-10 md:grid-cols-2">
        <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-stone-200">
          <Image src={p.image} alt={p.name} fill priority sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
        </div>
        <div>
          <p className="text-sm uppercase tracking-wider text-stone-500">{p.brand}</p>
          <h1 className="mt-1 font-serif text-4xl font-bold">{p.name}</h1>
          <p className="mt-3 text-2xl font-semibold">{money(p.price)}</p>
          <p className="mt-6 text-stone-700">{p.description}</p>
          <dl className="mt-6 grid grid-cols-2 gap-y-2 border-y border-stone-300 py-4 text-sm">
            <dt className="text-stone-500">Size</dt><dd>{p.size}</dd>
            <dt className="text-stone-500">Condition</dt><dd>{p.condition}</dd>
            <dt className="text-stone-500">Era</dt><dd>{p.era}</dd>
            <dt className="text-stone-500">Category</dt><dd>{p.category}</dd>
          </dl>
          <div className="mt-6"><AddToCart slug={p.slug} available={p.stock} /></div>
          <p className="mt-4 text-sm font-medium text-[#b4532a]">● One of a kind — once it&apos;s gone, it&apos;s gone.</p>
          <div className="mt-6 divide-y divide-stone-300 border-y border-stone-300 text-sm">
            {[
              ["Shipping", "Ships within 2 business days. Free over $75, otherwise $6 flat."],
              ["Returns", "Not the right fit? Return within 14 days for a full refund."],
              ["Condition guide", "Like new: barely worn. Great: light wear. Good: visible wear, fully functional. Well loved: lots of character."],
            ].map(([t, d]) => (
              <details key={t} className="group py-3">
                <summary className="flex cursor-pointer list-none justify-between font-medium">{t}<span className="transition group-open:rotate-45">+</span></summary>
                <p className="mt-2 text-stone-600">{d}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
      <StickyBuy slug={p.slug} name={p.name} price={p.price} available={p.stock} />
      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="mb-6 font-serif text-2xl font-bold">You may also like</h2>
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4">
            {related.map((r) => <ProductCard key={r.slug} p={r} />)}
          </div>
        </section>
      )}
    </div>
  );
}
