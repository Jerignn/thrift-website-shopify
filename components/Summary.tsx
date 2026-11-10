import { money } from "@/lib/products";

export default function Summary({ t }: { t: { subtotal: number; shipping: number; tax: number; total: number } }) {
  const row = (l: string, v: string) => (
    <div className="flex justify-between"><span className="text-stone-600">{l}</span><span>{v}</span></div>
  );
  return (
    <div className="space-y-2 text-sm">
      {row("Subtotal", money(t.subtotal))}
      {row("Shipping", t.shipping ? money(t.shipping) : "Free")}
      {row("Tax (8%)", money(t.tax))}
      <div className="flex justify-between border-t border-stone-300 pt-3 text-base font-semibold"><span>Total</span><span>{money(t.total)}</span></div>
    </div>
  );
}
