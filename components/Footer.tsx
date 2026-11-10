export default function Footer() {
  return (
    <footer className="mt-24 border-t border-stone-300 bg-stone-900 text-stone-300">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-3">
        <div>
          <p className="font-serif text-xl text-white">thrift.shop</p>
          <p className="mt-2 text-sm">Pre-loved pieces, given a second life.</p>
        </div>
        <div className="text-sm">
          <p className="font-semibold text-white">Good to know</p>
          <p className="mt-2">Free shipping over $75 · 14-day returns · Every piece is one of a kind.</p>
        </div>
        <p className="text-sm sm:text-right">© {new Date().getFullYear()} thrift.shop</p>
      </div>
    </footer>
  );
}
