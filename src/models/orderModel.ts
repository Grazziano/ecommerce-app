import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'users',
    },
    items: [],
    paymentStatus: {
      type: String,
      required: true,
    },
    orderStatus: {
      type: String,
      required: true,
    },
    shippingAddress: {
      type: Object,
      required: true,
    },
    transactionId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models['orders'] ||
  mongoose.model('orders', orderSchema);
