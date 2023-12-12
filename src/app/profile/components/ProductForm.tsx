'use client';
import React, { useEffect, useState } from 'react';
import { Form, message } from 'antd';
import { getAntdFieldRequiredRule } from '@/helpers/validations';
import axios from 'axios';

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

export default function ProductForm() {
  const [categories, setCategories] = useState([]);

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
      </Form>
    </div>
  );
}
