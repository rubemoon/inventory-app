import { productModel } from './products.model';
import { Product } from '../../@types/product';

export const productService = {
  async createProduct(product: Product) {
    return productModel.createProduct(product);
  },
  async getProduct(id: string) {
    return productModel.getProduct(id);
  },
  async listProducts() {
    return productModel.getAllProducts();
  },
  async updateProduct(id: string, data: Partial<Product>) {
    return productModel.updateProduct(id, data);
  },
  async removeProduct(id: string) {
    return productModel.deleteProduct(id);
  }
};