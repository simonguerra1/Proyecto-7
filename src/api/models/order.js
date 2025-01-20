const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    discos: [
      {
        discoId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'discos',
          required: true
        },
        quantity: { type: Number, required: true }
      }
    ],
    total: { type: Number, required: true },
    status: {
      type: String,
      enum: ['pending', 'shipped', 'completed', 'cancelled'],
      default: 'pending'
    }
  },
  {
    timestamps: true,
    collection: 'orders'
  }
)

const Order = mongoose.model('orders', orderSchema, 'orders')

module.exports = Order
