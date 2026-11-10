import { Suspense } from "react";
import OrderClient from "./OrderClient";

export const metadata = { title: "Order confirmed" };

export default function OrderPage() {
  return (
    <Suspense>
      <OrderClient />
    </Suspense>
  );
}
