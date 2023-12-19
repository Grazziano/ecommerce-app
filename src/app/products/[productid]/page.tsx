import React from 'react';
import axios from 'axios';
import { cookies } from 'next/headers';
import ProductImages from './ProductImages';
import ProductActionButtons from './ProductActionButtons';
import ProductReviews from './ProductReviews';
import { Rate } from 'antd';

async function getProduct(productId: string) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('token')?.value;
    const endPoint = `${process.env.DOMAIN}/api/products/${productId}`;
    const response = await axios.get(endPoint, {
      headers: {
        Cookie: `token=${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    console.log(error.message);
    return [];
  }
}

interface ProductInfoProps {
  params: { productid: string };
}

export default async function ProductInfo({ params }: ProductInfoProps) {
  const product = await getProduct(params.productid);

  return (
    <div className="mt-10 px-2 md:px-10">
      {product && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <ProductImages product={product} />

          <div className="flex flex-col">
            <h1 className="text-2xl font-semibold">{product.name}</h1>

            <div className="text-gray-600 flex flex-col gap-2">
              {product.features.map((feature: any) => (
                <li key={feature} className="text-sm">
                  {feature}
                </li>
              ))}
            </div>

            <div className="my-5 flex flex-col">
              <span className="text-3xl">$ {product.price}</span>

              <span className="text-gray-500 mt-2 ml-1">
                {product.countInStock > 0
                  ? `${product.countInStock} in stock`
                  : 'Out of stock'}
              </span>
            </div>

            <Rate
              disabled
              defaultValue={product.rating || 0}
              style={{ color: '#26577C' }}
            />

            <ProductActionButtons product={product} />

            <div className="pt-10">
              <hr />
            </div>

            <ProductReviews product={product} />
          </div>
        </div>
      )}
    </div>
  );
}
