'use client';
import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';
import axios from 'axios';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY!);

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
  const [clientSecret, setClientSecret] = useState<string>('');

  const onPay = async (e: any) => {};

  useEffect(() => {
    axios.post('/api/stripe_client_secret', { amount: total }).then((res) => {
      setClientSecret(res.data.clientSecret);
    });
  }, []);

  return (
    <Modal
      title={
        <div className="flex justify-between items-center font-bold text-xl">
          <span>Checkout</span>
          <span>Total: $ {total}</span>
        </div>
      }
      open={showCheckoutModal}
      onCancel={() => setShowCheckoutModal(false)}
      centered
      closable={false}
      footer={false}
    >
      <hr className="my-5" />
      {stripePromise && clientSecret && (
        <Elements
          stripe={stripePromise}
          options={{ clientSecret: clientSecret }}
        >
          <CheckoutForm total={total} />
        </Elements>
      )}
    </Modal>
  );
}
