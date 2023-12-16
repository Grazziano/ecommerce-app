import React, { useEffect, useState } from 'react';
import { Table, message } from 'antd';
import axios from 'axios';
import moment from 'moment';
import { useRouter } from 'next/navigation';

export default function UserOrdersList() {
  const [loading, setLoading] = useState<boolean>(false);
  const [orders, setOrders] = useState<any[]>([]);

  const router = useRouter();

  const getOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/orders');
      // console.log(response.data);
      setOrders(response.data);
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
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
      <Table columns={columns} dataSource={orders} rowKey="_id" />
    </div>
  );
}
