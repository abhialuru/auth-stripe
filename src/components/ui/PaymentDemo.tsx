"use client";

import { useRouter } from "next/navigation";
import { Button } from "./button";

function PaymentDemo() {
  const router = useRouter();

  async function handlePayment() {
    try {
      const response = await fetch("/api/stripe-checkout", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ amount: 50 * 100 }),
      });

      const data = await response.json();
      const url = data.url;
      router.push(url);
    } catch (error) {
      console.error("stripe url is missing.");
    }
  }

  return (
    <div className="flex flex-col gap-5">
      <h4 className="font-semibold text-lg">Demo for Payment System</h4>
      <Button onClick={handlePayment} className="px-4 text-center">
        Pay 50₹
      </Button>
    </div>
  );
}

export default PaymentDemo;
