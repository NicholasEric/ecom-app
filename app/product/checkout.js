"use client";
import { useContext, useState } from "react";
import { CartContext } from "@/app/api/CartContext";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function Checkout() {
  const { items } = useContext(CartContext);
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    try {
      setLoading(true);
      
      const response = await fetch("/api/checkoutSessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cartItems: items }),
      });

      const { id } = await response.json();
      const stripe = await stripePromise;


      await stripe.redirectToCheckout({ sessionId: id });
      
    } catch (error) {
      alert("Checkout failed. Please try again.");
      setLoading(false);
    }
  };

  return (
      <button
        className="btn btn-primary w-full mt-4"
        onClick={handleCheckout}
        disabled={loading || items.length === 0}
      >
        {loading ? "Processing..." : "Complete Purchase"}
      </button>
  );
}