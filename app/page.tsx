import Image from "next/image";
import Link from "next/link";
import Newsletter from "@/components/Newsletter";
import ProductCard from "@/components/ProductCard";
import { CATEGORIES, products } from "@/lib/products";

export default function Home() {
  const featured = products.slice(0, 8);
  return (
    <>
      <section className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-12 md:grid-cols-2 md:py-20">
        <div>
          <p className="text-sm font-medium uppercase tracking-widest text-[#b4532a]">New finds weekly</p>
          <h1 className="mt-3 font-serif text-5xl font-bold leading-[1.05] md:text-7xl">
            Pre-loved, <em className="font-normal">hand-picked</em>, one of a kind.
          </h1>
          <p className="mt-5 max-w-md text-lg text-stone-600">
            Vintage denim, worn-in leather and cozy knits. Every piece has a past — and when it&apos;s gone, it&apos;s gone.
          </p>
          <Link href="/shop" className="mt-8 inline-block rounded-full bg-stone-900 px-8 py-3.5 font-medium text-white hover:bg-[#b4532a]">
            Shop the latest
          </Link>
        </div>
        <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
          <Image
            src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=1200&q=80"
            alt="Racks of secondhand clothing"
            fill
            priority
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
          {CATEGORIES.map((c) => {
            const p = products.find((x) => x.category === c)!;
            return (
              <Link key={c} href={`/shop?category=${c}`} className="group relative aspect-[3/4] overflow-hidden rounded-sm">
                <Image src={p.image} alt="" fill sizes="(min-width: 768px) 20vw, 50vw" className="object-cover transition duration-500 group-hover:scale-105" />
                <span className="absolute inset-0 bg-gradient-to-t from-stone-900/70 to-transparent" />
                <span className="absolute bottom-3 left-3 font-serif text-xl font-bold text-white">{c}</span>
              </Link>
            );
          })}
        </div>
        <div className="mb-6 mt-10 flex items-end justify-between">
          <h2 className="font-serif text-3xl font-bold">Just in</h2>
          <Link href="/shop" className="text-sm underline">See everything →</Link>
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4">
          {featured.map((p) => (
            <ProductCard key={p.slug} p={p} />
          ))}
        </div>
      </section>

      <section id="about" className="mx-auto mt-24 grid max-w-6xl gap-6 px-4 text-center md:grid-cols-3">
        {[
          ["Second-hand, first-rate", "Every item is inspected, cleaned and honestly graded."],
          ["Better for the planet", "Buying pre-loved keeps clothes out of landfill."],
          ["Easy returns", "Not feeling it? Send it back within 14 days."],
        ].map(([t, d]) => (
          <div key={t} className="rounded-sm border border-stone-300 p-8">
            <h3 className="font-serif text-xl font-bold">{t}</h3>
            <p className="mt-2 text-stone-600">{d}</p>
          </div>
        ))}
      </section>

      <section className="mx-auto mt-24 max-w-6xl px-4">
        <h2 className="mb-8 text-center font-serif text-3xl font-bold">Loved by thrifters</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            ["The denim jacket was exactly as described — soft, faded, perfect. Shipping was fast too.", "Maya R."],
            ["Finally a thrift store with honest condition grades. Zero surprises.", "Jordan T."],
            ["I check the Friday drop every week. Found my favorite bag here.", "Priya S."],
          ].map(([q, n]) => (
            <figure key={n} className="rounded-sm border border-stone-300 p-6">
              <p className="text-[#b4532a]" aria-label="5 stars">★★★★★</p>
              <blockquote className="mt-3 text-stone-700">“{q}”</blockquote>
              <figcaption className="mt-4 text-sm font-medium">{n}</figcaption>
            </figure>
          ))}
        </div>
      </section>
      <Newsletter />
    </>
  );
}
