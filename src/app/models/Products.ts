import mongoose, { Document, Schema } from 'mongoose';

interface IProduct extends Document {
    name: string;
    price: number;
    description: string;
    image: string;
    isActivated: boolean;
    stock_quantity: number;
}

const productSchema = new Schema<IProduct>({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    isActivated: { type: Boolean, required: true, default: true },
    stock_quantity: { type: Number, required: true }
}, { timestamps: true });

const Product = mongoose.model<IProduct>('Product', productSchema);

export default Product;