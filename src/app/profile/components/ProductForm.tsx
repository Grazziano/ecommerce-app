'use client';
import React, { useEffect, useState } from 'react';
import { Button, Form, message, Upload } from 'antd';
import { getAntdFieldRequiredRule } from '@/helpers/validations';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface CategoriesInterface {
  createdAt: string;
  createdBy: {
    _id: string;
    name: string;
  };
  description: string;
  name: string;
  updatedAt: string;
  __v: number;
  _id: string;
}

interface ProductFormProps {
  setSelectedFiles: any;
  loading: boolean;
  onSave: any;
  inicialValues?: any;
}

export default function ProductForm({
  setSelectedFiles,
  loading,
  onSave,
  inicialValues,
}: ProductFormProps) {
  const [categories, setCategories] = useState([]);
  const [existingImages, setExistingImages] = useState<any[]>(
    inicialValues?.images || []
  );
  const router = useRouter();

  const getCategories = async () => {
    try {
      const response = await axios.get('/api/categories');
      setCategories(response.data.data);
    } catch (error: any) {
      message.error(error.response.data.message || error.message);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div>
      <Form
        layout="vertical"
        className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5"
        onFinish={onSave}
        initialValues={inicialValues}
      >
        <div className="col-span-3">
          <Form.Item
            label="Name"
            name="name"
            rules={getAntdFieldRequiredRule('Name is required')}
          >
            <input type="text" />
          </Form.Item>
        </div>

        <div className="col-span-3">
          <Form.Item
            label="Description"
            name="description"
            rules={getAntdFieldRequiredRule('Description is required')}
          >
            <textarea />
          </Form.Item>
        </div>

        <Form.Item
          label="Price"
          name="price"
          rules={getAntdFieldRequiredRule('Price is required')}
        >
          <input type="number" />
        </Form.Item>

        <Form.Item
          label="Category"
          name="category"
          rules={getAntdFieldRequiredRule('Category is required')}
        >
          <select>
            <option value="">Select Category</option>
            {categories.map((category: CategoriesInterface) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </Form.Item>

        <Form.Item
          label="Count In Stock"
          name="countInStock"
          rules={getAntdFieldRequiredRule('Stock is required')}
        >
          <input type="number" />
        </Form.Item>

        <div className="col-span-3 flex gap-5">
          {existingImages.map((image: any) => (
            <div
              key={image}
              className="border border-solid p-3 border-gray-300"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={image} alt="product" className="w-20 h-20" />
              <h1
                className="cursor-pointer underline text-sm"
                onClick={() => {
                  setExistingImages((prev: any) =>
                    prev.filter((i: any) => i !== image)
                  );
                }}
              >
                Remove
              </h1>
            </div>
          ))}
        </div>

        <div className="col-span-3">
          <Upload
            listType="picture-card"
            multiple
            // onChange={({ fileList }) => setSelectedFiles(fileList)}
            beforeUpload={(file) => {
              setSelectedFiles((prev: any) => [...prev, file]);
              return false;
            }}
          >
            Upload
          </Upload>
        </div>

        <div className="col-span-3 justify-end flex gap-5">
          <Button type="default" onClick={() => router.back()}>
            Back
          </Button>
          <Button type="primary" htmlType="submit" loading={loading}>
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
}
