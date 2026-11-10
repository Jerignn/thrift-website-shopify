import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-28 text-center">
      <p className="text-sm font-medium uppercase tracking-widest text-[#b4532a]">404</p>
      <h1 className="mt-2 font-serif text-5xl font-bold">This piece got thrifted.</h1>
      <p className="mt-4 text-stone-600">The page you&apos;re looking for has moved on to a new home.</p>
      <Link href="/shop" className="mt-8 inline-block rounded-full bg-stone-900 px-8 py-3 text-white hover:bg-[#b4532a]">Back to the shop</Link>
    </div>
  );
}
