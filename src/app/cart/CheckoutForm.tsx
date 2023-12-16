'use client';
import React, { useState } from 'react';
import { Button, message } from 'antd';
import {
  AddressElement,
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { ClearCart } from '@/redux/cartSlice';
import Loader from '@/components/Loader';

export default function CheckoutForm({
  total,
  setShowCheckoutModal,
}: {
  total: number;
  setShowCheckoutModal: (showModal: boolean) => void;
}) {
  const [loading, setLoading] = useState<boolean>(false);

  const stripe = useStripe();
  const elements = useElements();

  const { cartItems } = useSelector((state: any) => state.cart);
  const dispatch = useDispatch();

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

      dispatch(ClearCart());

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
      {loading && <Loader />}

      <form onSubmit={handleSubmit}>
        <div className="h-[350px] overflow-y-scroll pr-5">
          <PaymentElement />
          <AddressElement
            options={{
              allowedCountries: ['US'],
              mode: 'shipping',
            }}
          />
        </div>

        <div className="flex gap-5">
          <Button
            htmlType="button"
            className="mt-5"
            block
            onClick={() => setShowCheckoutModal(false)}
          >
            Cancel
          </Button>
          <Button type="primary" htmlType="submit" className="mt-5" block>
            Pay
          </Button>
        </div>
      </form>
    </div>
  );
}
