import React from 'react';
import ProductForm from '../components/ProductForm';

export default function AddProduct() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800">Add Product</h1>
      <hr />

      <ProductForm />
    </div>
  );
}
