import { Suspense } from "react";
import ShopClient from "./ShopClient";

export const metadata = { title: "Shop all" };

export default function Shop() {
  return (
    <Suspense>
      <ShopClient />
    </Suspense>
  );
}
