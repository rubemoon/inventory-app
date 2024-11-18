import React, { useEffect, useState } from 'react';
import { apiService } from '../services/apiService';
import { Product } from '../lib/types';
import Spinner from '../components/Spinner';
import { Alert } from '../components/ui/alert';

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await apiService.getAllProducts();
        setProducts(data);
      } catch (err) {
        setError('Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Alert variant="destructive">{error}</Alert>
      </div>
    );
  }

  return (
    <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="group flex flex-col h-full bg-white border border-gray-200 shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70">
            <div className="h-52 flex flex-col justify-center items-center bg-blue-600 rounded-t-xl">
              <img src={product.image} alt={product.name} className="h-full w-full object-cover rounded-t-xl" />
            </div>
            <div className="p-4 md:p-6">
              <span className="block mb-1 text-xs font-semibold uppercase text-blue-600 dark:text-blue-500">
                {product.name}
              </span>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-neutral-300 dark:hover:text-white">
                {product.name}
              </h3>
              <p className="mt-3 text-gray-500 dark:text-neutral-500">
                {product.description}
              </p>
              <p className="mt-3 text-gray-500 dark:text-neutral-500">
                Price: ${product.price}
              </p>
              <p className="mt-3 text-gray-500 dark:text-neutral-500">
                Quantity: {product.quantity}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;