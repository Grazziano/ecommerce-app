'use client';
import React from 'react';
import { Button } from 'antd';

export default function AddToCartBtn({ product }: { product: any }) {
  return (
    <Button
      type="primary"
      size="small"
      className="btn-small"
      onClick={() => {}}
    >
      Add to card
    </Button>
  );
}
