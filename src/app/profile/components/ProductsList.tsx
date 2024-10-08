import React, { useEffect, useState } from 'react';
import { Button, Table, message } from 'antd';
import axios from 'axios';
import moment from 'moment';
import { useRouter } from 'next/navigation';

export default function ProductsList() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
  const [products, setProducts] = useState([]);
  const [selectProduct, setSelectProduct] = useState<any>(null);

  const getProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/products');
      setProducts(response.data.data);
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const deleteProduct = async (productId: string) => {
    try {
      setDeleteLoading(true);
      await axios.delete(`/api/products/${productId}`);
      message.success('Product deleted successfully');
      getProducts();
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setDeleteLoading(false);
    }
  };

  const columns = [
    {
      title: 'Product',
      dataIndex: 'name',
      render: (text: any, record: any) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={record.images[0]}
          alt={text}
          className="w-20 h-20 object-cover rounded-full"
        />
      ),
    },
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Created By',
      dataIndex: 'createdBy',
      render: (createdBy: any) => createdBy.name,
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      render: (createdAt: any) =>
        moment(createdAt).format('DD MM YYYY hh:mm A'),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (action: any, params: any) => {
        return (
          <div className="flex gap-3 items-center">
            <Button
              type="default"
              className="btn-small"
              onClick={() => {
                setSelectProduct(params);
                deleteProduct(params._id);
              }}
              loading={deleteLoading && selectProduct._id === params._id}
            >
              Delete
            </Button>
            <Button
              type="primary"
              className="btn-small"
              onClick={() => {
                router.push(`/profile/edit_product/${params._id}`);
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
        <Button
          type="primary"
          onClick={() => router.push('/profile/add_product')}
        >
          Add Product
        </Button>
      </div>

      <div className="mt-5">
        <Table
          columns={columns}
          dataSource={products}
          loading={loading}
          pagination={false}
        />
      </div>
    </div>
  );
}
