import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiService } from '../services/apiService';
import { Product } from '../lib/types';
import Spinner from '../components/Spinner';
import { Alert, AlertTitle, AlertDescription } from '../components/ui/alert';

const ProductManagement: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState<Product>({ id: '', name: '', description: '', price: 0, quantity: 0, image: '' });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await apiService.getProduct(productId!);
        setProduct(data);
        setNewProduct(data);
      } catch (err) {
        setError('Falha ao buscar produto');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleUpdateProduct = async () => {
    setLoading(true);
    try {
      await apiService.updateProduct(productId!, newProduct);
      setProduct(newProduct);
      setIsModalOpen(false);
    } catch (error) {
      setError('Falha ao atualizar produto');
      console.error('Falha ao atualizar produto:', error);
    } finally {
      setLoading(false);
    }
  };

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

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Alert variant="destructive">
          <AlertTitle>Erro</AlertTitle>
          <AlertDescription>Produto não encontrado</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold mr-4">Gerenciar Produto</h1>
        </div>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => setIsModalOpen(true)}
        >
          Editar Produto
        </button>
      </div>

      {error && <div className="text-red-500 mb-4">{error}</div>}
      {loading && <div className="text-blue-500 mb-4">Carregando...</div>}

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-lg w-1/2">
            <h2 className="text-xl font-bold mb-2">Editar Produto</h2>
            <div className="mb-4">
              <label className="block mb-1">Nome</label>
              <input
                type="text"
                placeholder="Nome"
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                className="border p-2 mb-2 w-full"
              />
              <label className="block mb-1">Descrição</label>
              <input
                type="text"
                placeholder="Descrição"
                value={newProduct.description}
                onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                className="border p-2 mb-2 w-full"
              />
              <label className="block mb-1">Preço</label>
              <input
                type="number"
                placeholder="Preço"
                value={newProduct.price}
                onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
                className="border p-2 mb-2 w-full"
              />
              <label className="block mb-1">Quantidade</label>
              <input
                type="number"
                placeholder="Quantidade"
                value={newProduct.quantity}
                onChange={(e) => setNewProduct({ ...newProduct, quantity: Number(e.target.value) })}
                className="border p-2 mb-2 w-full"
              />
              <label className="block mb-1">URL da Imagem</label>
              <input
                type="text"
                placeholder="URL da Imagem"
                value={newProduct.image}
                onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                className="border p-2 mb-2 w-full"
              />
            </div>
            <div className="flex justify-end">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                onClick={() => setIsModalOpen(false)}
              >
                Cancelar
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={handleUpdateProduct}
                disabled={loading}
              >
                Atualizar Produto
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-lg">
        <h2 className="text-xl font-bold mb-2">{product.name}</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-2">Descrição: {product.description}</p>
        <p className="text-gray-700 dark:text-gray-300 mb-2">Preço: R${product.price}</p>
        <p className="text-gray-700 dark:text-gray-300 mb-2">Quantidade: {product.quantity}</p>
        <img src={product.image} alt={product.name} className="w-full h-auto rounded" />
      </div>
    </div>
  );
};

export default ProductManagement;