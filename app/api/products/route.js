import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Product from '@/models/Products';

export async function GET(request) {
  await dbConnect();
  
  try {
    const products = await Product.find({});
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error("Error fetching products:", error.message);
    
    return NextResponse.json({ error: "Server Error: Unable to fetch products" }, { status: 500 });
  }
}

