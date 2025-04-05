import Image from 'next/image';
import Link from 'next/link';


export default function Product({order}) {
    return (
        <li className="card bg-base-100 text-amber-100 w-96 m-2 shadow-sm flex justify-center border">
            <figure className='py-2'>
                <Image
                    src={`/images/${order._id}.jpeg`}
                    alt={order.name}
                    width={'192'}
                    height={'192'}/>
            </figure>
            <div className="card-body border-t-1">
                <h2 className="card-title">{order.name}</h2>
                <p>{order.desc}</p>
                <div className="card-actions justify-end">
                    <button className="btn btn-primary"><Link href={`/product/${order._id}`}>INFO</Link></button>
                </div>
            </div>
        </li>);
}