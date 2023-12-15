'use client';
import React from 'react';
import { CartState } from '@/redux/cartSlice';
import { useSelector } from 'react-redux';
import Image from 'next/image';

export default function Cart() {
  const { cartItems }: CartState = useSelector((state: any) => state.cart);

  return (
    <div>
      <h1 className="text-2xl font-semibold">My Cart</h1>

      <div className="grid grid-cols-3 mt-5 text-gray-700">
        <div className="col-span-2 flex flex-col gap-5">
          <div className="grid grid-cols-7 gap-10">
            <span className="col-span-4">Product</span>
            <span className="col-span-1">Each</span>
            <span className="col-span-1">Quantity</span>
            <span className="col-span-1">Total</span>
          </div>

          <div className="col-span-7 mt-5">
            <hr />
          </div>

          {cartItems.map((item) => (
            <div
              className="grid grid-cols-7 items-center gap-10"
              key={item._id}
            >
              <div className="col-span-4 flex gap-2 items-center">
                <Image
                  src={item.images[0]}
                  alt={item.name}
                  height={80}
                  width={80}
                  className="border p-2 border-gray-300 border-solid"
                />
                <div className="flex flex-col gap-2 ml-2">
                  <span className="text-sm">{item.name}</span>
                  <span className="text-xs underline text-red-700">Remove</span>
                </div>
              </div>

              <span className="col-span-1">$ {item.price}</span>

              <span className="col-span-1 border border-solid p-2 border-gray-400 flex gap-2 justify-between">
                <i className="ri-subtract-line"></i>
                {item.quantity}
                <i className="ri-add-line"></i>
              </span>

              <span className="col-span-1">$ {item.price * item.quantity}</span>
            </div>
          ))}
        </div>

        <div className="col-span-1"></div>
      </div>
    </div>
  );
}
