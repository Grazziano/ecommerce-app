import React, { useEffect, useState } from 'react';
import { Button, Table, message } from 'antd';
import CategoryForm from './CategoryForm';
import axios from 'axios';
import moment from 'moment';

interface SelectedCategory {
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

export default function CategoriesList() {
  const [categories, setCategories] = useState([]);
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingForDelete, setLoadingForDelete] = useState(false);
  const [selectedCategory, setSelectedCategory] =
    useState<SelectedCategory | null>(null);

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

  const onDelete = async (id: string) => {
    try {
      setLoadingForDelete(true);
      await axios.delete(`/api/categories/${id}`);
      message.success('Category deleted successfully');
      setSelectedCategory(null);
      getCategories();
    } catch (error: any) {
      message.error(error.response.data.message || error.message);
    } finally {
      setLoadingForDelete(false);
    }
  };

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
    {
      title: 'Action',
      dataIndex: 'action',
      render: (action: any, params: any) => {
        // console.log({ action, params });
        return (
          <div className="flex gap-3 items-center">
            <Button
              type="default"
              className="btn-small"
              onClick={() => {
                setSelectedCategory(params);
                onDelete(params._id);
              }}
              loading={loadingForDelete && selectedCategory?._id === params._id}
            >
              Delete
            </Button>
            <Button
              type="primary"
              className="btn-small"
              onClick={() => {
                setSelectedCategory(params);
                setShowCategoryForm(true);
              }}
            >
              Edit
            </Button>
          </div>
        );
      },
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
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          reloadData={() => getCategories()}
        />
      )}
    </div>
  );
}
