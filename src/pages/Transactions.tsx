import { useEffect, useState } from 'react';
import { apiService } from '../services/apiService';
import { Order } from '../lib/types';
import Spinner from '../components/Spinner';
import defaultImage from '../assets/rachit-tank-2cFZ_FB08UM-unsplash.jpg';

function HistoricoDePedidos() {
  const [pedidos, setPedidos] = useState<Order[]>([]);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    buscarPedidos();
  }, []);

  const buscarPedidos = async () => {
    setCarregando(true);
    try {
      const data = await apiService.getAllOrders();
      setPedidos(data);
    } catch (error) {
      console.error('Falha ao buscar pedidos:', error);
      setErro('Falha ao buscar pedidos');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Histórico de Pedidos</h1>
      {erro && <div className="text-red-500 mb-4">{erro}</div>}
      {carregando && <div className="text-blue-500 mb-4"><Spinner /></div>}
      <div className="space-y-8">
        {pedidos.map((pedido, index) => (
          <div key={pedido.id || index} className="group relative flex gap-x-5">
            <div className="relative group-last:after:hidden after:absolute after:top-8 after:bottom-2 after:start-3 after:w-px after:-translate-x-[0.5px] after:bg-gray-200 dark:after:bg-neutral-700">
              <div className="relative z-10 size-6 flex justify-center items-center">
                <img
                  src={pedido.userImage || defaultImage}
                  alt={pedido.userEmail}
                  className="h-8 w-8 rounded-full object-cover"
                />
              </div>
            </div>
            <div className="grow pb-8 group-last:pb-0">
              <h3 className="mb-1 text-xs text-gray-600 dark:text-neutral-400">
                {new Date(pedido.date).toLocaleDateString()}
              </h3>
              <p className="font-semibold text-sm text-gray-800 dark:text-neutral-200">
                {pedido.customerName}
              </p>
              <p className="mt-1 text-sm text-gray-600 dark:text-neutral-400">
                Produto: {pedido.product}
              </p>
              <p className="mt-1 text-sm text-gray-600 dark:text-neutral-400">
                Quantidade: {pedido.quantity}
              </p>
              <p className="mt-1 text-sm text-gray-600 dark:text-neutral-400">
                Status: <span className={`${pedido.status === 'Pending' ? 'text-yellow-500' : pedido.status === 'Completed' ? 'text-green-500' : 'text-red-500'}`}>{pedido.status}</span>
              </p>
              <p className="mt-1 text-sm text-gray-600 dark:text-neutral-400">
                Preço Total: R${pedido.total}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HistoricoDePedidos;