"use client";
import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "../api/CartContext";
import { FaShoppingCart } from "react-icons/fa";

export default function CartButton() {
  const { items } = useContext(CartContext);

  return (
    <Link href="/cart" className="relative">
      <FaShoppingCart className="text-2xl" />
      {items.length > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
          {items.reduce((acc, item) => acc + item.quantity, 0)}
        </span>
      )}
    </Link>
  );
}