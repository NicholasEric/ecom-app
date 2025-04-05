/*
"use client"
import { useRouter } from 'next/navigation';
import { useEffect, useContext, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { CartContext } from '../api/CartContext';

export default function SuccessPage() {
  const { dispatch } = useContext(CartContext);
  const [order, setOrder] = useState(null);
  const router = useRouter();
  const session_id = useSearchParams().get('session_id');



  useEffect(() => { 
    dispatch({ type: 'CLEAR_CART' });
    localStorage.removeItem("cart");
    const fetchOrder = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/orders/${session_id}`);
        const data = await response.json();
        setOrder(data);
      } catch (error) {
        console.error('Error fetching order:', error.message);
      }
    }
    fetchOrder();
  }, []);


  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="max-w-md p-8 bg-white rounded-lg shadow-lg text-center">
        <svg 
          className="w-20 h-20 mx-auto text-green-500 mb-6"
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M5 13l4 4L19 7" 
          />
        </svg>
        
        <h1 className="text-3xl font-bold mb-4">Payment Successful!</h1>
        {order && (
          <>
            <p className="text-gray-600 mb-4">
              Order ID: <span className="font-bold">{order.id}</span>
            </p>
            <p className="text-gray-600 mb-6">
              Total: ¥{order.amount_total / 100}
            </p>
          </>
        )}
        <button 
          className="btn btn-primary w-full"
          onClick={() => router.push('/')}
        >
          Return to Home
        </button>
      </div>
    </div>
  );
}
  */

"use client"
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect , useContext , useState } from 'react';
import { CartContext } from '../api/CartContext';
import OrderSummary from '@/app/ui/OrderSummary';


export default function SuccessPage() {
  const { dispatch } = useContext(CartContext);
  const [order, setOrder] = useState(null);
  const router = useRouter();
  const session_id = useSearchParams().get('session_id');



  useEffect(() => { 
    dispatch({ type: 'CLEAR_CART' });
    localStorage.removeItem("cart");
    const fetchOrder = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/orders/${session_id}`);
        const data = await response.json();
        console.log(data)
        setOrder(data);
      } catch (error) {
        console.error('Error fetching order:', error.message);
      }
    }
    fetchOrder();
  }, []);


  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="max-w-md p-8 bg-white rounded-lg shadow-lg text-center">
        <svg 
          className="w-20 h-20 mx-auto text-green-500 mb-6"
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M5 13l4 4L19 7" 
          />
        </svg>
        
        <h1 className="text-3xl font-bold mb-4">Payment Successful!</h1>
        {order && (
          <>
            <OrderSummary sessionData={order} />
          </>
        )}
        <button 
          className="btn btn-primary w-full"
          onClick={() => router.push('/dashboard')}
        >
          Return to Home
        </button>
      </div>
    </div>
  );
}