// app/cart/page.js
"use client";
import { useContext } from "react";
import { CartContext } from "../api/CartContext";
import { FaTrashAlt } from "react-icons/fa";
import Checkout from "../product/checkout";
import Link from "next/link";

export default function CartPage() {
  const { items, dispatch } = useContext(CartContext);
  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );


  return (
    <div className="container mx-auto p-4">
      {items.length === 0 && (
        <div className="text-center py-20">
          <h2 className="text-3xl font-bold mb-4">Your cart is empty</h2>
          <Link href="/">
            <button className="btn btn-primary">Continue Shopping</button>
          </Link>
        </div>
      )}

      {/* Cart items */}
      {items.map((item) => (
        <div
          key={item.id}
          className="flex justify-between items-center mb-4 p-4 border-b"
        >
          {/* Product Image */}
          <div className="w-24 h-24 relative">
            <img
              src={`/images/${item.id}.jpeg`}
              alt={item.name}
              className="object-cover w-full h-full rounded"
            />
          </div>

          {/* Product Details */}
          <div className="flex-1 ml-4">
            <h3 className="font-bold">{item.name}</h3>
            <p className="text-gray-500">${item.price}</p>
          </div>

          {/* Quantity Controls */}
          <div className="flex items-center space-x-2">
            <button
              className="btn btn-sm btn-circle"
              onClick={() =>
                dispatch({ type: "DECREMENT", payload: item.id })
              }
            >
              -
            </button>
            <span>{item.quantity}</span>
            <button
              className="btn btn-sm btn-circle"
              onClick={() =>
                dispatch({ type: "INCREMENT", payload: item.id })
              }
            >
              +
            </button>
          </div>

          {/* Total & Remove */}
          <div className="text-right ml-4">
            <p className="font-bold">
              ${(item.price * item.quantity).toFixed(2)}
            </p>
            <button
              className="text-red-500 mt-2"
              onClick={() => dispatch({ type: "REMOVE_ITEM", payload: item.id })}
            >
              <FaTrashAlt />
            </button>
          </div>
        </div>
      ))}

      {/* Cart Summary */}
      {items.length > 0 && (
        <div className="mt-8 p-4 bg-gray-100 rounded">
          <div className="flex justify-between mb-4">
            <span>Subtotal</span>
            <span className="font-bold">${total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span className="text-gray-500">Calculated at checkout</span>
          </div>

          <Checkout />
        </div>
      )}
    </div>
  );
}