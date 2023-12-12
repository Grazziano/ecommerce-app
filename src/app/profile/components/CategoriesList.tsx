import React, { useEffect, useState } from 'react';
import { Button, Table, message } from 'antd';
import CategoryForm from './CategoryForm';
import axios from 'axios';
import moment from 'moment';

export default function CategoriesList() {
  const [categories, setCategories] = useState([]);
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const getCategories = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/categories');
      setCategories(response.data.data);
    } catch (error: any) {
      message.error(error.response.data.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Description',
      dataIndex: 'description',
    },
    {
      title: 'Created By',
      dataIndex: 'createdBy',
      render: (createdBy: any) => createdBy.name,
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      render: (createdAt: string) => moment(createdAt).format('DD MMM YYYY'),
    },
  ];

  return (
    <div>
      <div className="flex justify-end">
        <Button type="primary" onClick={() => setShowCategoryForm(true)}>
          Add Category
        </Button>
      </div>

      <div className="mt-5">
        <Table
          columns={columns}
          dataSource={categories}
          pagination={false}
          loading={loading}
        />
      </div>

      {showCategoryForm && (
        <CategoryForm
          showCategoryForm={showCategoryForm}
          setShowCategoryForm={setShowCategoryForm}
          reloadData={() => {}}
        />
      )}
    </div>
  );
}
