import { useEffect, useState } from 'react';
import { apiService } from '../services/apiService';
import { Order, Product } from '../lib/types';
import Spinner from '../components/Spinner';
import { useToast } from '../hooks/use-toast';
import { Toaster } from '../components/ui/toaster';

const allowedStatuses = ['Pending', 'Completed', 'Canceled'] as const;

function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [newOrder, setNewOrder] = useState<Order>({
    id: '',
    date: new Date().toISOString(),
    supplierId: '',
    status: 'Pending',
    total: 0,
    customerName: '',
    product: '',
    quantity: 0,
  });
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchOrders();
    fetchProducts();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const data = await apiService.getAllOrders();
      setOrders(data);
    } catch (error) {
      console.error('Falha ao buscar pedidos:', error);
      setError('Falha ao buscar pedidos');
      toast({ title: 'Erro', description: 'Falha ao buscar pedidos', status: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await apiService.getAllProducts();
      setProducts(data);
    } catch (error) {
      console.error('Falha ao buscar produtos:', error);
      setError('Falha ao buscar produtos');
      toast({ title: 'Erro', description: 'Falha ao buscar produtos', status: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleAddOrder = async () => {
    setLoading(true);
    try {
      let response;
      if (editingOrder) {
        response = await apiService.updateOrder(editingOrder.id, newOrder);
        setEditingOrder(null);
        toast({ title: 'Sucesso', description: 'Pedido atualizado com sucesso', status: 'success' });
      } else {
        response = await apiService.createOrder({ ...newOrder, id: crypto.randomUUID() });
        toast({ title: 'Sucesso', description: 'Pedido criado com sucesso', status: 'success' });
      }
      console.log('Response:', response);
      fetchOrders();
      setNewOrder({
        id: '',
        date: new Date().toISOString(),
        supplierId: '',
        status: 'Pending',
        total: 0,
        customerName: '',
        product: '',
        quantity: 0,
      });
      setIsModalOpen(false);
    } catch (error) {
      setError('Falha ao adicionar/atualizar pedido');
      console.error('Falha ao adicionar/atualizar pedido:', error);
      toast({ title: 'Erro', description: 'Falha ao adicionar/atualizar pedido', status: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteOrder = async (id: string) => {
    setLoading(true);
    try {
      await apiService.deleteOrder(id);
      fetchOrders();
      toast({ title: 'Sucesso', description: 'Pedido excluído com sucesso', status: 'success' });
    } catch (error) {
      console.error('Falha ao excluir pedido:', error);
      setError('Falha ao excluir pedido');
      toast({ title: 'Erro', description: 'Falha ao excluir pedido', status: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleEditOrder = (order: Order) => {
    setNewOrder(order);
    setEditingOrder(order);
    setIsModalOpen(true);
  };

  const handleProductChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedProduct = products.find(product => product.id === e.target.value);
    if (selectedProduct) {
      setNewOrder({ ...newOrder, product: selectedProduct.name, total: selectedProduct.price * newOrder.quantity });
    }
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const quantity = parseInt(e.target.value);
    const selectedProduct = products.find(product => product.name === newOrder.product);
    if (selectedProduct) {
      setNewOrder({ ...newOrder, quantity, total: selectedProduct.price * quantity });
    } else {
      setNewOrder({ ...newOrder, quantity });
    }
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const status = e.target.value as 'Pending' | 'Completed' | 'Canceled';
    setNewOrder({ ...newOrder, status });
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold mr-4">Pedidos</h1>
        </div>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => setIsModalOpen(true)}
        >
          Adicionar Novo Pedido
        </button>
      </div>

      {error && <div className="text-red-500 mb-4">{error}</div>}
      {loading && <div className="text-blue-500 mb-4"><Spinner /></div>}

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-lg w-1/2">
            <h2 className="text-xl font-bold mb-2">{editingOrder ? 'Editar Pedido' : 'Adicionar Novo Pedido'}</h2>
            <div className="mb-4">
              <label className="block mb-1">Nome do Cliente</label>
              <input
                type="text"
                placeholder="Nome do Cliente"
                value={newOrder.customerName}
                onChange={(e) => setNewOrder({ ...newOrder, customerName: e.target.value })}
                className="border p-2 mb-2 w-full"
              />
              <label className="block mb-1">Produto</label>
              <select
                value={newOrder.product}
                onChange={handleProductChange}
                className="border p-2 mb-2 w-full"
              >
                <option value="">Selecione o Produto</option>
                {products.map(product => (
                  <option key={product.id} value={product.id}>{product.name}</option>
                ))}
              </select>
              <label className="block mb-1">Quantidade</label>
              <input
                type="number"
                placeholder="Quantidade"
                value={newOrder.quantity}
                onChange={handleQuantityChange}
                className="border p-2 mb-2 w-full"
              />
              <label className="block mb-1">Status</label>
              <select
                value={newOrder.status}
                onChange={handleStatusChange}
                className="border p-2 mb-2 w-full"
              >
                {allowedStatuses.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
              <label className="block mb-1">Preço Total</label>
              <input
                type="number"
                placeholder="Preço Total"
                value={newOrder.total}
                readOnly
                className="border p-2 mb-2 w-full"
              />
            </div>
            <div className="flex justify-end">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                onClick={() => {
                  setIsModalOpen(false);
                  setEditingOrder(null);
                  setNewOrder({
                    id: '',
                    date: new Date().toISOString(),
                    supplierId: '',
                    status: 'Pending',
                    total: 0,
                    customerName: '',
                    product: '',
                    quantity: 0,
                  });
                }}
              >
                Cancelar
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={handleAddOrder}
                disabled={loading}
              >
                {editingOrder ? 'Atualizar Pedido' : 'Adicionar Pedido'}
              </button>
            </div>
          </div>
        </div>
      )}

      <table className="min-w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b dark:border-gray-700">ID</th>
            <th className="py-2 px-4 border-b dark:border-gray-700">Nome do Cliente</th>
            <th className="py-2 px-4 border-b dark:border-gray-700">Produto</th>
            <th className="py-2 px-4 border-b dark:border-gray-700">Quantidade</th>
            <th className="py-2 px-4 border-b dark:border-gray-700">Status</th>
            <th className="py-2 px-4 border-b dark:border-gray-700">Preço Total</th>
            <th className="py-2 px-4 border-b dark:border-gray-700">Ações</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={order.id || index}>
              <td className="py-2 px-4 border-b dark:border-gray-700">{order.id || 'N/A'}</td>
              <td className="py-2 px-4 border-b dark:border-gray-700">{order.customerName}</td>
              <td className="py-2 px-4 border-b dark:border-gray-700">{order.product}</td>
              <td className="py-2 px-4 border-b dark:border-gray-700">{order.quantity}</td>
              <td className="py-2 px-4 border-b dark:border-gray-700">{order.status}</td>
              <td className="py-2 px-4 border-b dark:border-gray-700">{order.total}</td>
              <td className="py-2 px-4 border-b dark:border-gray-700">
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded mr-2"
                  onClick={() => order.id && handleDeleteOrder(order.id)}
                  disabled={loading}
                >
                  Excluir
                </button>
                <button
                  className="bg-blue-500 text-white px-2 py-1 rounded"
                  onClick={() => handleEditOrder(order)}
                  disabled={loading}
                >
                  Editar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Toaster />
    </div>
  );
}

export default Orders;