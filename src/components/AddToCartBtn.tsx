'use client';
import React from 'react';
import { Button, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { AddProductToCart, CartState } from '@/redux/cartSlice';
import { ProductInterface } from '@/interfaces/intex';

interface AddToCardProps {
  product: ProductInterface;
}

export default function AddToCartBtn({ product }: AddToCardProps) {
  const dispatch = useDispatch();
  const { cartItems }: CartState = useSelector((state: any) => state.cart);

  return (
    <Button
      type="primary"
      size="small"
      className="btn-small"
      onClick={(e) => {
        dispatch(AddProductToCart({ ...product, quantity: 1 }));
        message.success('Added to cart');
        e.stopPropagation();
      }}
      disabled={cartItems.some(
        (item: ProductInterface) =>
          item._id === product._id || product.countInStock === 0
      )}
    >
      Add to card
    </Button>
  );
}
