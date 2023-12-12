'use client';
import React, { useEffect, useState } from 'react';
import ProductForm from '../components/ProductForm';

export default function AddProduct() {
  const [selectedFiles, setSelectedFiles] = useState([]);

  useEffect(() => {
    console.log(selectedFiles);
  }, [selectedFiles]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800">Add Product</h1>
      <hr />

      <ProductForm
        selectedFiles={selectedFiles}
        setSelectedFiles={setSelectedFiles}
      />
    </div>
  );
}
