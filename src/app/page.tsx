import AddToCartBtn from '@/components/AddToCartBtn';
import { ProductInterface } from '@/interfaces/intex';
import { Rate } from 'antd';
import axios from 'axios';
import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';

async function getProducts() {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('token')?.value;
    const endPoint = `${process.env.DOMAIN}/api/products`;
    const response = await axios.get(endPoint, {
      headers: {
        Cookie: `token=${token}`,
      },
    });
    return response.data.data;
  } catch (error: any) {
    console.log(error.message);
    return [];
  }
}

export default async function Home() {
  const products = await getProducts();

  return (
    <div>
      <div className="grid grid-cols-4 gap-5">
        {products.map((product: ProductInterface) => (
          <div
            key={product._id}
            className="p-4 flex flex-col gap-2 border border-solid border-gray-300"
          >
            <Link href={`/products/${product._id}`}>
              <div className="text-center">
                <Image
                  src={product.images[0]}
                  alt=""
                  height={180}
                  width={180}
                />
              </div>

              <div className="flex flex-col">
                <span className="text-sm">{product.name}</span>

                <span className="text-gray-500 text-xs">
                  {product.countInStock > 0
                    ? `${product.countInStock} in stock`
                    : 'Out of stock'}
                </span>
              </div>
            </Link>

            <div className="flex justify-between items-center">
              <Rate disabled defaultValue={product.rating || 0} />

              <div className="flex gap-5 items-center">
                <h1 className="text-xl font-semibold">$ {product.price}</h1>
                <AddToCartBtn product={product} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
