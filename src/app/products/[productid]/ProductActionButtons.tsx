'use client';
import React from 'react';
import { Button } from 'antd';

export default function ProductActionButtons({ product }: { product: any }) {
  return (
    <div className="flex gap-5">
      <Button type="default">Add to cart</Button>
      <Button type="primary">Buy Now</Button>
    </div>
  );
}
