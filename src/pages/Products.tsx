import { useEffect, useState } from 'react';
import { apiService } from '../services/apiService';
import { Product } from '../lib/types';
import Spinner from '../components/Spinner';
import { Alert, AlertTitle, AlertDescription } from '../components/ui/alert';
import defaultImage from '../assets/rachit-tank-2cFZ_FB08UM-unsplash.jpg';

function Produtos() {
  const [produtos, setProdutos] = useState<Product[]>([]);
  const [novoProduto, setNovoProduto] = useState<Product>({ id: '', name: '', description: '', price: 0, quantity: 0, image: '' });
  const [produtoEditando, setProdutoEditando] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    buscarProdutos();
  }, []);

  const buscarProdutos = async () => {
    setCarregando(true);
    try {
      const data = await apiService.getAllProducts();
      setProdutos(data);
    } catch (error) {
      console.error('Falha ao buscar produtos:', error);
      setErro('Falha ao buscar produtos');
    } finally {
      setCarregando(false);
    }
  };

  const handleAdicionarProduto = async () => {
    setCarregando(true);
    try {
      if (produtoEditando) {
        await apiService.updateProduct(produtoEditando.id, novoProduto);
        setProdutoEditando(null);
      } else {
        await apiService.createProduct({ ...novoProduto, id: crypto.randomUUID() });
      }
      buscarProdutos();
      setNovoProduto({ id: '', name: '', description: '', price: 0, quantity: 0, image: '' });
      setIsModalOpen(false);
    } catch (error) {
      setErro('Falha ao adicionar/atualizar produto');
      console.error('Falha ao adicionar/atualizar produto:', error);
    } finally {
      setCarregando(false);
    }
  };

  const handleDeletarProduto = async (id: string) => {
    setCarregando(true);
    try {
      await apiService.deleteProduct(id);
      buscarProdutos();
    } catch (error) {
      console.error('Falha ao deletar produto:', error);
      setErro('Falha ao deletar produto');
    } finally {
      setCarregando(false);
    }
  };

  const handleEditarProduto = (produto: Product) => {
    setNovoProduto(produto);
    setProdutoEditando(produto);
    setIsModalOpen(true);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold mr-4">Produtos</h1>
        </div>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => setIsModalOpen(true)}
        >
          Adicionar Novo Produto
        </button>
      </div>

      {erro && (
        <div className="mb-4">
          <Alert variant="destructive">
            <AlertTitle>Erro</AlertTitle>
            <AlertDescription>{erro}</AlertDescription>
          </Alert>
        </div>
      )}
      {carregando && (
        <div className="mb-4">
          <Spinner />
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-lg w-1/2">
            <h2 className="text-xl font-bold mb-2">{produtoEditando ? 'Editar Produto' : 'Adicionar Novo Produto'}</h2>
            <div className="mb-4">
              <label className="block mb-1 text-gray-700 dark:text-gray-300">Nome</label>
              <input
                type="text"
                placeholder="Nome"
                value={novoProduto.name}
                onChange={(e) => setNovoProduto({ ...novoProduto, name: e.target.value })}
                className="border p-2 mb-2 w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
              <label className="block mb-1 text-gray-700 dark:text-gray-300">Descrição</label>
              <input
                type="text"
                placeholder="Descrição"
                value={novoProduto.description}
                onChange={(e) => setNovoProduto({ ...novoProduto, description: e.target.value })}
                className="border p-2 mb-2 w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
              <label className="block mb-1 text-gray-700 dark:text-gray-300">Preço</label>
              <input
                type="number"
                placeholder="Preço"
                value={novoProduto.price}
                onChange={(e) => setNovoProduto({ ...novoProduto, price: Number(e.target.value) })}
                className="border p-2 mb-2 w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
              <label className="block mb-1 text-gray-700 dark:text-gray-300">Quantidade</label>
              <input
                type="number"
                placeholder="Quantidade"
                value={novoProduto.quantity}
                onChange={(e) => setNovoProduto({ ...novoProduto, quantity: Number(e.target.value) })}
                className="border p-2 mb-2 w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
              <label className="block mb-1 text-gray-700 dark:text-gray-300">URL da Imagem</label>
              <input
                type="text"
                placeholder="URL da Imagem"
                value={novoProduto.image}
                onChange={(e) => setNovoProduto({ ...novoProduto, image: e.target.value })}
                className="border p-2 mb-2 w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
            </div>
            <div className="flex justify-end">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                onClick={() => {
                  setIsModalOpen(false);
                  setProdutoEditando(null);
                  setNovoProduto({ id: '', name: '', description: '', price: 0, quantity: 0, image: '' });
                }}
              >
                Cancelar
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={handleAdicionarProduto}
                disabled={carregando}
              >
                {produtoEditando ? 'Atualizar Produto' : 'Adicionar Produto'}
              </button>
            </div>
          </div>
        </div>
      )}

      <table className="min-w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b dark:border-gray-700">ID</th>
            <th className="py-2 px-4 border-b dark:border-gray-700">Nome</th>
            <th className="py-2 px-4 border-b dark:border-gray-700">Descrição</th>
            <th className="py-2 px-4 border-b dark:border-gray-700">Preço</th>
            <th className="py-2 px-4 border-b dark:border-gray-700">Quantidade</th>
            <th className="py-2 px-4 border-b dark:border-gray-700">Imagem</th>
            <th className="py-2 px-4 border-b dark:border-gray-700">Ações</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map((produto, index) => (
            <tr key={produto.id || index}>
              <td className="py-2 px-4 border-b dark:border-gray-700">{produto.id || 'N/A'}</td>
              <td className="py-2 px-4 border-b dark:border-gray-700">{produto.name}</td>
              <td className="py-2 px-4 border-b dark:border-gray-700">{produto.description}</td>
              <td className="py-2 px-4 border-b dark:border-gray-700">{produto.price}</td>
              <td className="py-2 px-4 border-b dark:border-gray-700">{produto.quantity}</td>
              <td className="py-2 px-4 border-b dark:border-gray-700">
                <img src={produto.image || defaultImage} alt={produto.name} className="h-16 w-16 object-cover rounded" />
              </td>
              <td className="py-2 px-4 border-b dark:border-gray-700">
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded mr-2"
                  onClick={() => produto.id && handleDeletarProduto(produto.id)}
                  disabled={carregando}
                >
                  Deletar
                </button>
                <button
                  className="bg-blue-500 text-white px-2 py-1 rounded"
                  onClick={() => handleEditarProduto(produto)}
                  disabled={carregando}
                >
                  Editar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Produtos;