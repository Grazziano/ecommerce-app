'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { message } from 'antd';
import { useParams, useRouter } from 'next/navigation';

export default function Filters() {
  const [search, setSearch] = useState<string>('');
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const router = useRouter();
  const searchParams = useParams();

  const getCategories = async () => {
    try {
      const response = await axios.get('/api/categories');
      const tempCategories: any = [
        {
          name: 'All',
          _id: '',
        },
      ];
      tempCategories.push(...response.data.data);
      setCategories(tempCategories);
    } catch (error: any) {
      message.error(error.response.data.message || error.message);
    }
  };

  const onSelectCategory = (category: any) => {
    setSelectedCategory(category._id);

    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set('category', category._id);
    router.push(`/?${newSearchParams.toString()}`);
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div>
      <div className="flex gap-10 bg-gray-300 py-2 px-5">
        {categories.map((category: any) => (
          <div
            key={category._id}
            onClick={() => onSelectCategory(category)}
            className={`cursor-pointer text-gray-500 ${
              selectedCategory === category._id
                ? 'text-black font-semibold'
                : ''
            }`}
          >
            <span>{category.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
