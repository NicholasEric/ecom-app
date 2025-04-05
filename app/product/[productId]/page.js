'use client'

import fetchProducts from '@/app/api/fetchProducts';
import Image from 'next/image';
import Checkout from '../checkout';
import { useParams } from 'next/navigation'
import { useContext , useEffect, useState } from 'react';
import { CartContext } from '@/app/api/CartContext';

export default function Page() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { productId } = useParams();
  const { dispatch } = useContext(CartContext); 

  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchProducts();
        const found = data.find(item => item._id == productId);
        setProduct(found);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [productId]);

  const handleAddToCart = () => {
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id: product._id,
        name: product.name,
        price: product.price,
      }
    });
    alert("Item added to cart!");
  }

  if (loading) return <div>Loading...</div>;
  if (!product) return <div>No product found.</div>;

  return (
    <div>
      Product: {product.name}
      <figure className='py-2'>
        <Image
          src={`/images/${product._id}.jpeg`}
          alt={product.name}
          width={'192'}
          height={'192'}/>
      </figure>
      <div className="card-body bproduct-t-1">
        <h2 className="card-title">{product.name}</h2>
        <p>{product.desc}</p>
        <div className="card-actions justify-end">
          <button 
              className="btn btn-secondary"
              onClick={handleAddToCart}
            >
            Add to Cart
          </button>
          {/*<button className="btn btn-primary" onClick={()=>document.getElementById('purchase-card').showModal()}>Buy Now</button>*/}
          <dialog id="purchase-card" className="modal">
            <div className="modal-box">
              <h3 className='text-amber-50 text-2xl'>Checkout</h3>
              <Checkout />
              <div className="modal-action">
                <form method="dialog">
                  <button className="btn">Close</button>
                </form>
              </div>
            </div>
          </dialog>
        </div>
      </div>
    </div>);
  }