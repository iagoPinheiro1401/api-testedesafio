// service.js
import databaseConnection from "../utils/database";
import Product from "../models/products";

// Mantém a conexão com o banco de dados aberta durante toda a vida útil da aplicação
const db = databaseConnection();

export const listProducts = async () => {
    return await Product.find().lean().timeout(10000); 
};

export const createProduct = async (productData) => {
    return await Product.create(productData);
};

export const deleteProduct = async (productId) => {
    await Product.findByIdAndDelete(productId);
};

export const updateProduct = async (productId, updatedData) => {
    return await Product.findByIdAndUpdate(productId, updatedData, { new: true });
};
