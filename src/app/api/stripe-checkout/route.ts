import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", {
  apiVersion: "2025-01-27.acacia",
  typescript: true,
});

export async function POST(req: NextRequest) {
  try {
    const { amount } = await req.json();

    const session = await stripe.checkout.sessions.create({
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/thank-you`,
      cancel_url: "https://example.com/cancel",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            product_data: {
              name: "Demo pay",
            },
            currency: "inr",
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
    });
    return NextResponse.json({
      url: session.url,
    });
  } catch (error) {
    console.error("Error creating checkout session", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
