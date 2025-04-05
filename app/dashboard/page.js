import Product from '@/app/ui/Product';
import Banner from '@/app/ui/Banner';
import fetchProducts from '../api/fetchProducts';


export default async function Page() {
    const orders = await fetchProducts();
    return (
    <div className='bg-amber-50'>
        <Banner />
        <ul className='md:flex flex-wrap justify-center gap-2 mx-20 my-10'>
            {orders.map((order) => {
                return (<Product key={order._id} order={order}/>);
            })}
        </ul>
    </div>
    );
  }