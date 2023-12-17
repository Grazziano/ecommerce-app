import React, { useEffect, useState } from 'react';
import { Modal, Table, message } from 'antd';
import axios from 'axios';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';

export default function UserOrdersList() {
  const [loading, setLoading] = useState<boolean>(false);
  const [orders, setOrders] = useState<any[]>([]);

  const [showCancelModal, setShowCancelModal] = useState<boolean>(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [statusUpdatingLoading, setStatusUpdatingLoading] =
    useState<boolean>(false);

  const { currentUser } = useSelector((state: any) => state.user);

  const router = useRouter();

  const getOrders = async () => {
    try {
      setLoading(true);
      const endpoind = `/api/orders?user=${currentUser._id}`;
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
      const endpoint = `/api/orders/${orderId}`;
      await axios.put(endpoint, { orderStatus: status });
      message.success('Your order has been cancelled successfully, Thank you');
      setShowCancelModal(false);
      getOrders();
    } catch (error: any) {
      message.error(error.response.data.message || error.message);
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
        <div className="flex gap-5">
          {record.orderStatus === 'order placed' && (
            <span
              className="underline cursor-pointer"
              onClick={() => {
                setSelectedOrder(record);
                setShowCancelModal(true);
              }}
            >
              Cancel
            </span>
          )}
          <span
            className="underline cursor-pointer"
            onClick={() => router.push(`/profile/orders/${record._id}`)}
          >
            View
          </span>
        </div>
      ),
    },
  ];

  return (
    <div>
      <Table
        columns={columns}
        dataSource={orders}
        rowKey="_id"
        loading={loading}
        pagination={false}
      />

      {selectedOrder && (
        <Modal
          open={showCancelModal}
          onCancel={() => setShowCancelModal(false)}
          title="Cancel Order"
          centered
          closable={false}
          onOk={() => {
            onStatusUpdate(selectedOrder._id, 'cancelled');
          }}
          okText="Yes, Cancel Order"
          cancelText="No, Keep Order"
          okButtonProps={{
            loading: statusUpdatingLoading,
          }}
        >
          <p className="my-10 text-gray-600">
            Are you sure you want to cancel order #{selectedOrder._id} ? This
            action cannot be undone
          </p>
        </Modal>
      )}
    </div>
  );
}
