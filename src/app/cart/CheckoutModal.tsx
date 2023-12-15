'use client';
import React from 'react';
import { Modal } from 'antd';

interface CheckoutModalProps {
  showCheckoutModal: boolean;
  setShowCheckoutModal: (showModal: boolean) => void;
  total: number;
}

export default function CheckoutModal({
  showCheckoutModal,
  setShowCheckoutModal,
  total,
}: CheckoutModalProps) {
  return (
    <Modal
      title="Make Payment"
      open={showCheckoutModal}
      onCancel={() => setShowCheckoutModal(false)}
      centered
      closable={false}
      footer={false}
    ></Modal>
  );
}
