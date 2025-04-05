import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  product: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Product', 
    required: true 
  },
  amount: { 
    type: Number, 
    required: true
  },
  paymentStatus: { 
    type: String, 
    default: 'Pending'
  },
}, { timestamps: true });

export default mongoose.models.Order || mongoose.model('Order', OrderSchema);
