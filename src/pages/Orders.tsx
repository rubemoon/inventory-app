import { useEffect, useState } from 'react';
import { apiService } from '../services/apiService';
import { Order } from '../lib/types'
import ThemeToggle from '../components/ThemeToggle';

function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [newOrder, setNewOrder] = useState<Order>({ id: '', productId: '', quantity: 0, totalPrice: 0 });

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const data = await apiService.getAllOrders();
    setOrders(data);
  };

  const handleAddOrder = async () => {
    await apiService.createOrder(newOrder);
    fetchOrders();
    setNewOrder({ id: '', productId: '', quantity: 0, totalPrice: 0 });
  };

  const handleDeleteOrder = async (id: string) => {
    await apiService.deleteOrder(id);
    fetchOrders();
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Orders</h1>
        <ThemeToggle />
      </div>

      <h2 className="text-xl font-bold mb-2">Add New Order</h2>
      <div className="mb-4 p-4 bg-gray-100 dark:bg-gray-800 rounded">
        <div className="flex flex-wrap -mx-2">
          <input
            type="text"
            placeholder="Product ID"
            value={newOrder.productId}
            onChange={(e) => setNewOrder({ ...newOrder, productId: e.target.value })}
            className="border p-2 m-2 flex-1"
          />
          <input
            type="number"
            placeholder="Quantity"
            value={newOrder.quantity}
            onChange={(e) => setNewOrder({ ...newOrder, quantity: Number(e.target.value) })}
            className="border p-2 m-2 flex-1"
          />
          <input
            type="number"
            placeholder="Total Price"
            value={newOrder.totalPrice}
            onChange={(e) => setNewOrder({ ...newOrder, totalPrice: Number(e.target.value) })}
            className="border p-2 m-2 flex-1"
          />
        </div>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
          onClick={handleAddOrder}
        >
          Add Order
        </button>
      </div>

      <table className="min-w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b dark:border-gray-700">ID</th>
            <th className="py-2 px-4 border-b dark:border-gray-700">Product ID</th>
            <th className="py-2 px-4 border-b dark:border-gray-700">Quantity</th>
            <th className="py-2 px-4 border-b dark:border-gray-700">Total Price</th>
            <th className="py-2 px-4 border-b dark:border-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td className="py-2 px-4 border-b dark:border-gray-700">{order.id}</td>
              <td className="py-2 px-4 border-b dark:border-gray-700">{order.productId}</td>
              <td className="py-2 px-4 border-b dark:border-gray-700">{order.quantity}</td>
              <td className="py-2 px-4 border-b dark:border-gray-700">{order.totalPrice}</td>
              <td className="py-2 px-4 border-b dark:border-gray-700">
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => handleDeleteOrder(order.id)}
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

export default Orders;