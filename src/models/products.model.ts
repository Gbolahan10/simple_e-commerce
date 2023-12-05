import mongoose, { Schema } from 'mongoose';

const ProductSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: false },
  price: { type: Number, required: true },
  currency: {
    type: String,
    enum: ['NGN', 'USD', 'EUR'],
    default: 'NGN',
    },
  store_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
},
{
  timestamps: true,
  toObject: {
    virtuals: true,
  },
  toJSON: {
    virtuals: true,
  },
},
);

const Product = mongoose.model('Product', ProductSchema);

export default Product;
