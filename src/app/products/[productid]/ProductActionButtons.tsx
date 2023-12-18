'use client';
import React from 'react';
import { Button } from 'antd';

export default function ProductActionButtons({ product }: { product: any }) {
  return (
    <div className="flex gap-5 mt-5">
      <Button type="default" disabled={product.countInStock === 0}>
        Add to cart
      </Button>
      <Button type="primary" disabled={product.countInStock === 0}>
        Buy Now
      </Button>
    </div>
  );
}
