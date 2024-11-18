import { useEffect, useState } from 'react';
import { apiService } from '../services/apiService';
import { Product } from '../lib/types';
import ThemeToggle from '../components/ThemeToggle';

function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState<Product>({ id: '', name: '', description: '', price: 0, quantity: 0, image: '' });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const data = await apiService.getAllProducts();
    console.log(data); 
    setProducts(data);
  };

  const handleAddProduct = async () => {
    await apiService.createProduct({ ...newProduct, id: crypto.randomUUID() });
    fetchProducts();
    setNewProduct({ id: '', name: '', description: '', price: 0, quantity: 0, image: '' });
  };

  const handleDeleteProduct = async (id: string) => {
    await apiService.deleteProduct(id);
    fetchProducts();
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Products</h1>
        <ThemeToggle />
      </div>

      <h2 className="text-xl font-bold mb-2">Add New Product</h2>
      <div className="mb-4 p-4 bg-gray-100 dark:bg-gray-800 rounded">
        <div className="flex flex-wrap -mx-2">
          <input
            type="text"
            placeholder="Name"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            className="border p-2 m-2 flex-1"
          />
          <input
            type="text"
            placeholder="Description"
            value={newProduct.description}
            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
            className="border p-2 m-2 flex-1"
          />
          <input
            type="number"
            placeholder="Price"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
            className="border p-2 m-2 flex-1"
          />
          <input
            type="number"
            placeholder="Quantity"
            value={newProduct.quantity}
            onChange={(e) => setNewProduct({ ...newProduct, quantity: Number(e.target.value) })}
            className="border p-2 m-2 flex-1"
          />
          <input
            type="text"
            placeholder="Image URL"
            value={newProduct.image}
            onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
            className="border p-2 m-2 flex-1"
          />
        </div>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
          onClick={handleAddProduct}
        >
          Add Product
        </button>
      </div>

      <table className="min-w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b dark:border-gray-700">ID</th>
            <th className="py-2 px-4 border-b dark:border-gray-700">Name</th>
            <th className="py-2 px-4 border-b dark:border-gray-700">Description</th>
            <th className="py-2 px-4 border-b dark:border-gray-700">Price</th>
            <th className="py-2 px-4 border-b dark:border-gray-700">Quantity</th>
            <th className="py-2 px-4 border-b dark:border-gray-700">Image</th>
            <th className="py-2 px-4 border-b dark:border-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product.id || index}>
              <td className="py-2 px-4 border-b dark:border-gray-700">{product.id || 'N/A'}</td>
              <td className="py-2 px-4 border-b dark:border-gray-700">{product.name}</td>
              <td className="py-2 px-4 border-b dark:border-gray-700">{product.description}</td>
              <td className="py-2 px-4 border-b dark:border-gray-700">{product.price}</td>
              <td className="py-2 px-4 border-b dark:border-gray-700">{product.quantity}</td>
              <td className="py-2 px-4 border-b dark:border-gray-700">{product.image}</td>
              <td className="py-2 px-4 border-b dark:border-gray-700">
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => product.id && handleDeleteProduct(product.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Products;