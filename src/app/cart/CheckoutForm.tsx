'use client';
import React, { useState } from 'react';
import { Button, message } from 'antd';
import {
  AddressElement,
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function CheckoutForm({ total }: { total: number }) {
  const [loading, setLoading] = useState<boolean>(false);

  const stripe = useStripe();
  const elements = useElements();

  const { cartItems } = useSelector((state: any) => state.cart);

  const router = useRouter();

  const handleSubmit = async (event: any) => {
    try {
      setLoading(true);
      // We don't want to let default form submission happen here,
      // which would refresh the page.
      event.preventDefault();

      if (!stripe || !elements) {
        // Stripe.js hasn't yet loaded.
        // Make sure to disable form submission until Stripe.js has loaded.
        throw new Error("Stripe.js hasn't loaded yet.");
      }

      const result = await stripe.confirmPayment({
        //`Elements` instance that was used to create the Payment Element
        elements,
        confirmParams: {
          return_url: 'http://localhost:3000/cart',
        },
        redirect: 'if_required',
      });

      if (result.error) {
        // Show error to your customer (for example, payment details incomplete)
        console.log(result.error.message);
        throw result.error;
      }

      message.success('Payment successful');

      // save order to database
      const orderPayload = {
        items: cartItems,
        paymentStatus: 'paid',
        orderStatus: 'order confirmed',
        shippingAddress: result.paymentIntent.shipping,
        transactionId: result.paymentIntent.id,
        total: total,
      };

      await axios.post('/api/orders/place_order', orderPayload);
      message.success('Order placed successfully');

      router.push('/profile');
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="h-[400px] overflow-y-scroll p-5">
        <PaymentElement />
        <AddressElement
          options={{
            allowedCountries: ['US'],
            mode: 'shipping',
          }}
        />
        <Button
          type="primary"
          htmlType="submit"
          className="mt-5"
          block
          loading={loading}
        >
          Pay
        </Button>
      </form>
    </div>
  );
}
