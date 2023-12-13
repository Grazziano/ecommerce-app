'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ProductForm from '../../components/ProductForm';
import axios from 'axios';
import { message } from 'antd';
import Loader from '@/components/Loader';
import { uploadImagesAndReturnUrls } from '@/helpers/imageHandling';

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
  const [loadingProduct, setLoadingProduct] = useState<boolean>(false);
  const [existingImages, setExistingImages] = useState<any[]>([]);

  const onSave = async (values: any) => {
    try {
      setLoading(true);

      const newImages = await uploadImagesAndReturnUrls(selectedFiles);
      const newAndExistingImages = [...existingImages, ...newImages];

      values.images = newAndExistingImages;

      axios.put(`/api/products/${params.productid}`, values);

      message.success('Product updated successfully');

      router.refresh();
      router.back();
    } catch (error: any) {
      message.error(error.message || error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const getProduct = async () => {
    try {
      setLoadingProduct(true);
      const response = await axios.get(`/api/products/${params.productid}`);
      setExistingImages(response.data.images || []);
      setProduct(response.data);
    } catch (error: any) {
      message.error(error.message || error.response.data.message);
    } finally {
      setLoadingProduct(false);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div>
      {loadingProduct && <Loader />}

      <h1 className="text-2xl font-bold text-gray-800">Edit Product</h1>
      <hr />

      {product && (
        <ProductForm
          setSelectedFiles={setSelectedFiles}
          loading={loading}
          onSave={onSave}
          inicialValues={product}
          existingImages={existingImages}
          setExistingImages={setExistingImages}
        />
      )}
    </div>
  );
}
