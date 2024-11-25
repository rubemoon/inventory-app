import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiService } from '../services/apiService';
import { Product } from '../lib/types';
import Spinner from '../components/Spinner';
import { Alert, AlertTitle, AlertDescription } from '../components/ui/alert';
import defaultImage from '../assets/rachit-tank-2cFZ_FB08UM-unsplash.jpg';
import { useAuth } from '../context/AuthContext';

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await apiService.getAllProducts();
        setProducts(data);
      } catch (err) {
        setError('Falha ao buscar produtos');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Alert variant="destructive">
          <AlertTitle>Erro</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  const handleManageClick = (productId: string) => {
    navigate(`/dashboard/products/${productId}`);
  };

  return (
    <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="group flex flex-col h-full bg-white border border-gray-200 shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70 transition-transform duration-300 hover:scale-105">
            <div className="h-52 flex flex-col justify-center items-center bg-blue-600 rounded-t-xl overflow-hidden">
              <img src={product.image || defaultImage} alt={product.name} className="h-full w-full object-cover rounded-t-xl transition-transform duration-300 group-hover:scale-110" />
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
                Preço: R${product.price}
              </p>
              <p className="mt-3 text-gray-500 dark:text-neutral-500">
                Quantidade: {product.quantity}
              </p>
              {user && (
                <button
                  className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300"
                  onClick={() => handleManageClick(product.id)}
                >
                  Gerenciar
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;