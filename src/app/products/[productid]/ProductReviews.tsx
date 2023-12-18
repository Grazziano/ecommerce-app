'use client';
import React, { useEffect, useState } from 'react';
import { ProductInterface } from '@/interfaces/intex';
import { Button, Modal, Rate, message } from 'antd';
import axios from 'axios';

interface ProductReviewsProps {
  product: ProductInterface;
}

export default function ProductReviews({ product }: ProductReviewsProps) {
  const [reviews, setReviews] = useState([]);
  const [showReviewForm, setShowReviewForm] = useState<boolean>(false);
  const [comment, setComment] = useState<string>('');
  const [rating, setRating] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const getReviews = async () => {
    try {
      const endpoint = `/api/reviews?product=${product._id}`;
      const response = await axios.get(endpoint);
      setReviews(response.data);
    } catch (error: any) {
      message.error(error.response.data.message);
    }
  };

  const submitReview = async () => {
    try {
      setLoading(true);
      const endpoint = `/api/reviews`;
      const response = await axios.post(endpoint, {
        comment,
        rating,
        product: product._id,
      });
      message.success(response.data.message);
      getReviews();
    } catch (error: any) {
      message.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getReviews();
  }, []);

  return (
    <div className="mt-5">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Reviews</h1>
        <Button type="primary" onClick={() => setShowReviewForm(true)}>
          Write a Review
        </Button>
      </div>

      {reviews.length === 0 && (
        <div className="text-gray-500">
          <span>No reviews yet. Be the first to review this product.</span>
        </div>
      )}

      <Modal
        open={showReviewForm}
        onCancel={() => setShowReviewForm(false)}
        title={
          <div className="flex justify-between items-center uppercase">
            <h1 className="text-2xl font-semibold">Write a review</h1>
          </div>
        }
        closable={false}
        okText="Submit review"
        cancelText="Cancel"
        onOk={submitReview}
        confirmLoading={loading}
      >
        <div className="flex flex-col gap-5">
          <div>
            <span>Comment</span>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <span>Rating</span>
            <Rate value={rating} onChange={(value) => setRating(value)} />
          </div>
        </div>
      </Modal>
    </div>
  );
}
