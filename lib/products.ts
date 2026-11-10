export type Category = "Tops" | "Outerwear" | "Bottoms" | "Shoes" | "Accessories";

export type Product = {
  slug: string;
  name: string;
  brand: string;
  category: Category;
  price: number; // USD
  size: string;
  condition: "Like new" | "Great" | "Good" | "Well loved";
  era: string;
  description: string;
  image: string;
  stock: number; // one-of-a-kind pieces mostly have stock 1
};

const img = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=900&q=80`;

export const CATEGORIES: Category[] = ["Tops", "Outerwear", "Bottoms", "Shoes", "Accessories"];

export const products: Product[] = [
  { slug: "leather-moto-jacket", name: "Black Leather Moto Jacket", brand: "AllSaints", category: "Outerwear", price: 98, size: "M", condition: "Great", era: "00s", description: "Buttery faux-leather moto with asymmetric zip, snap collar and a perfectly worn-in feel. Instant attitude over any outfit.", image: img("1551028719-00167b16eac5"), stock: 1 },
  { slug: "crochet-fringe-poncho", name: "Crochet Fringe Poncho", brand: "Free People", category: "Tops", price: 28, size: "One size", condition: "Like new", era: "10s", description: "Airy cream crochet with a playful fringe hem. Throw it over a tee for instant festival-season charm.", image: img("1434389677669-e08b4cac3105"), stock: 1 },
  { slug: "classic-white-tee", name: "Classic White Tee", brand: "Hanes", category: "Tops", price: 34, size: "M", condition: "Good", era: "00s", description: "Soft, heavyweight cotton tee with a relaxed fit. The kind of basic that goes with everything.", image: img("1521572163474-6864f9cf17ab"), stock: 1 },
  { slug: "rust-bomber-jacket", name: "Rust Bomber Jacket", brand: "Alpha Industries", category: "Outerwear", price: 78, size: "L", condition: "Great", era: "90s", description: "Lightweight satin bomber in a warm rust shade with ribbed cuffs and a full zip. Easy layering all season.", image: img("1591047139829-d91aecb6caea"), stock: 1 },
  { slug: "retro-running-sneakers", name: "Retro Running Sneakers", brand: "Nike", category: "Shoes", price: 62, size: "US 9", condition: "Good", era: "00s", description: "Cushioned runners with plenty of life left. Fresh insoles and cleaned up by hand.", image: img("1542291026-7eec264c27ff"), stock: 1 },
  { slug: "high-top-canvas-shoes", name: "Canvas High-Tops", brand: "Converse", category: "Shoes", price: 36, size: "US 8", condition: "Well loved", era: "00s", description: "Scuffed in all the right places. Sturdy canvas, solid soles, tons of character.", image: img("1525966222134-fcfa99b8ae77"), stock: 1 },
  { slug: "leather-crossbody-bag", name: "Leather Crossbody Bag", brand: "Coach", category: "Accessories", price: 72, size: "One size", condition: "Great", era: "90s", description: "Supple full-grain leather that's developed a gorgeous patina. Adjustable strap, brass hardware.", image: img("1584917865442-de89df76afd3"), stock: 1 },
  { slug: "black-wayfarer-sunglasses", name: "Black Wayfarer Sunglasses", brand: "Ray-Ban", category: "Accessories", price: 54, size: "One size", condition: "Like new", era: "00s", description: "Classic black wayfarer frames with barely a scratch on the lenses.", image: img("1572635196237-14b3f281503f"), stock: 1 },
  { slug: "pleated-midi-skirt", name: "Pleated Midi Skirt", brand: "Zara", category: "Bottoms", price: 26, size: "S", condition: "Like new", era: "10s", description: "Flowy pleats that move beautifully. Elastic waist, lined, easy to dress up or down.", image: img("1583496661160-fb5886a0aaaa"), stock: 1 },
  { slug: "high-rise-straight-jeans", name: "High-Rise Straight Jeans", brand: "Levi's", category: "Bottoms", price: 44, size: "W30 L30", condition: "Great", era: "90s", description: "Authentic 501s with the right amount of fade and a sturdy button fly.", image: img("1542272604-787c3835535d"), stock: 1 },
  { slug: "color-block-tee", name: "Retro Color-Block Tee", brand: "Champion", category: "Tops", price: 24, size: "L", condition: "Good", era: "90s", description: "Soft cotton tee in a rich mustard, ready for layering. Washed and pressed, with plenty of life left.", image: img("1489987707025-afc232f7ea0f"), stock: 1 },
  { slug: "wicker-top-handle-bag", name: "Orange Wicker Top-Handle Bag", brand: "Cult Gaia", category: "Accessories", price: 58, size: "One size", condition: "Like new", era: "10s", description: "Woven wicker body with tan leather trim and a structured top handle. A summer statement piece.", image: img("1590874103328-eac38a683ce7"), stock: 1 },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);

export const money = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);

export const FREE_SHIPPING_OVER = 75;
export const SHIPPING_FLAT = 6;
export const TAX_RATE = 0.08;

export function totals(lines: { price: number; qty: number }[]) {
  const subtotal = lines.reduce((s, l) => s + Math.round(l.price * 100) * l.qty, 0) / 100;
  const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_OVER ? 0 : SHIPPING_FLAT;
  const tax = Math.round(subtotal * TAX_RATE * 100) / 100;
  const total = Math.round((subtotal + shipping + tax) * 100) / 100;
  return { subtotal, shipping, tax, total };
}
