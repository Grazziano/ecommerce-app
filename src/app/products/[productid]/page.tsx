import React from 'react';

interface ProductInfoProps {
  params: { productid: string };
}

export default function ProductInfo({ params }: ProductInfoProps) {
  return (
    <div>
      <h1>Product Info</h1>
      <h1>{params.productid}</h1>
    </div>
  );
}
