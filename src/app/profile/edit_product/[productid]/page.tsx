'use client';
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import ProductForm from '../../components/ProductForm';
import axios from 'axios';
import { message } from 'antd';

interface GetProductParams {
  params: {
    productid: string;
  };
}

export default function EditProduct({ params }: GetProductParams) {
  const router = useRouter();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState<boolean>(false);

  const onSave = async (values: any) => {};

  const getProduct = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/products/${params.productid}`);
      setProduct(response.data);
    } catch (error: any) {
      message.error(error.message || error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800">Edit Product</h1>
      <hr />

      {product && (
        <ProductForm
          setSelectedFiles={setSelectedFiles}
          loading={loading}
          onSave={onSave}
          inicialValues={product}
        />
      )}
    </div>
  );
}
