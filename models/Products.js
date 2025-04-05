import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true
  },
  price: { 
    type: Number, 
    required: true 
  },
  quantity: { 
    type: Number, 
    required: true
  },
  img: { 
    type: String, 
    required: true
  },
  desc: { 
    type: String, 
    required: true
  },
});

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
