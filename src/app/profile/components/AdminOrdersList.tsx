import React, { useEffect, useState } from 'react';
import { Table, message } from 'antd';
import axios from 'axios';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import Loader from '@/components/Loader';

export default function AdminOrdersList() {
  const [loading, setLoading] = useState<boolean>(false);
  const [orders, setOrders] = useState<any[]>([]);
  const [statusUpdatingLoading, setStatusUpdatingLoading] =
    useState<boolean>(false);

  const router = useRouter();

  const getOrders = async () => {
    try {
      setLoading(true);
      const endpoind = `/api/orders`;
      const response = await axios.get(endpoind);
      setOrders(response.data);
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const onStatusUpdate = async (orderId: string, status: string) => {
    try {
      setStatusUpdatingLoading(true);
    } catch (error) {
    } finally {
      setStatusUpdatingLoading(false);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  const columns = [
    { title: 'Order ID', dataIndex: '_id' },
    {
      title: 'Placed On',
      dataIndex: 'createdAt',
      render: (date: string) => moment(date).format('DDD MMM YYYY hh:mm a'),
    },
    { title: 'Total', dataIndex: 'total' },
    {
      title: 'Status',
      dataIndex: 'orderStatus',
      render: (status: string) => status.toUpperCase(),
    },
    {
      title: 'Action',
      render: (record: any) => (
        <span
          className="underline cursor-pointer"
          onClick={() => router.push(`/profile/orders/${record._id}`)}
        >
          View
        </span>
      ),
    },
  ];

  return (
    <div>
      {statusUpdatingLoading && <Loader />}

      <Table
        columns={columns}
        dataSource={orders}
        rowKey="_id"
        loading={loading}
        pagination={false}
      />
    </div>
  );
}
