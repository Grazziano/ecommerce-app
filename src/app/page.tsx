import AddToCartBtn from '@/components/AddToCartBtn';
import axios from 'axios';
import { cookies } from 'next/headers';
import Image from 'next/image';

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
      <div className="grid grid-cols-5">
        {products.map((product: any) => (
          <div
            key={product.id}
            className="p-4 flex flex-col gap-2 border border-solid border-gray-300 items-center"
          >
            <Image src={product.images[0]} alt="" height={180} width={180} />
            <h1 className="text-sm">{product.name}</h1>
            <div className="flex gap-5 items-center">
              <h1 className="text-xl font-semibold">$ {product.price}</h1>
              <AddToCartBtn product={product} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
