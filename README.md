# thrift.shop — Next.js e-commerce storefront

A fully responsive, front-end e-commerce store for one-of-a-kind secondhand fashion, built with **Next.js (App Router), React 19, TypeScript and Tailwind CSS**. Exports to 100% static files.

## Features
- Home page with category tiles, "Just in" grid, testimonials and newsletter signup
- Shop page: search, category, condition and max-price filters, sorting — all state kept in the URL (shareable, back-button friendly)
- Product pages: statically generated from `generateStaticParams`, breadcrumbs, details, shipping/returns accordion, related items
- Slide-out cart drawer with free-shipping progress bar, full cart page, and a checkout form with order confirmation
- Wishlist (heart on every product), persisted in `localStorage`
- Mobile menu, keyboard-accessible (Esc closes the drawer), semantic HTML and ARIA labels
- Cart / wishlist / orders state via a tiny `useSyncExternalStore` store (no state library)

## Run it
```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static export to ./out
```

## Notes
Static demo — payment is simulated and no data leaves the browser. Product data lives in `lib/products.ts`; photos are from Unsplash.
