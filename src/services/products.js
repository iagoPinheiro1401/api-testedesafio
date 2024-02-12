import databaseConnection from "../utils/database"
import Product from "../models/products"

export const listerProducts = async () => {
    await databaseConnection()
    const products = await Product.find()
    return products
}

export const createProduct = async (product) => {
    await databaseConnection()
    const createdProduct = await Product.create(product)
    return createdProduct
}

export const deleteProduct = async (id) => {
    await databaseConnection()
    await Product.findByIdAndDelete(id)
}

export const updateProduct = async (id, newBody) => {
    await databaseConnection()
    try {
      const updatedProduct = await Product.findByIdAndUpdate(id, newBody, { new: true })
      return updatedProduct
    } catch (error) {
      console.error('Erro ao atualizar a nota:', error)
      throw error
    }
  }
  