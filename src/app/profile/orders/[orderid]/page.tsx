'use client';
import React from 'react';

export default function OrderInfo({ params }: { params: any }) {
  return (
    <div>
      <h1>OrderInfo</h1>
      <p>Order Id: {params.orderid}</p>
    </div>
  );
}
