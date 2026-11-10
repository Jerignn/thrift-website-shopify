import Image from "next/image";
import Link from "next/link";
import WishlistButton from "@/components/WishlistButton";
import { money, type Product } from "@/lib/products";

export default function ProductCard({ p }: { p: Product }) {
  return (
    <Link href={`/product/${p.slug}`} className="group block">
      <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-stone-200">
        <Image
          src={p.image}
          alt={p.name}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <span className="absolute left-2 top-2 rounded-full bg-white/90 px-2.5 py-0.5 text-xs font-medium">Size {p.size}</span>
        <WishlistButton slug={p.slug} className="absolute right-2 top-2" />
        <span className="absolute bottom-2 left-2 rounded-full bg-stone-900/80 px-2.5 py-0.5 text-xs text-white opacity-0 transition group-hover:opacity-100">{p.condition}</span>
      </div>
      <div className="mt-3 flex items-start justify-between gap-2">
        <div>
          <p className="text-xs uppercase tracking-wider text-stone-500">{p.brand}</p>
          <p className="font-medium leading-snug group-hover:underline">{p.name}</p>
        </div>
        <p className="font-semibold">{money(p.price)}</p>
      </div>
    </Link>
  );
}
