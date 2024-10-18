import { Request, Response } from 'express';
import Product from '../models/Products';


export const addProducts = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, price, description, image, isActivated, stock_quantity } = req.body;

        const newProduct = new Product({ name, price, description, image, isActivated, stock_quantity });
        await newProduct.save();

        res.json(newProduct);
    } catch (error) {
        console.error('Error adding product:', error);
        res.status(500).json({ message: 'Error adding product', error });
    }
};

export const listProducts = async (req: Request, res: Response): Promise<void> => {
    try {
        const products = await Product.find();
        res.json({ products });
    } catch (error) {
        console.error('Error listing products:', error);
        res.status(500).json({ message: 'Error listing products', error });
    }
};

export const updateProducts = async (req: Request, res: Response): Promise<void> => {
    try {
        const { productId } = req.params;
        const { name, price, description, image, isActivated, stock_quantity } = req.body;

        const updatedProduct = await Product.findByIdAndUpdate(productId, { name, price, description, image, isActivated, stock_quantity }, { new: true });
        res.json({ updatedProduct });
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ message: 'Error updating product', error });
    }
};

export const deleteProducts = async (req: Request, res: Response): Promise<void> => {
    try {
        const { productId } = req.params;

        await Product.findByIdAndDelete(productId);
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ message: 'Error deleting product', error });
    }
};