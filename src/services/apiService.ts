import { Product, Supplier, Order, OrderItem, Transaction, User } from '../lib/types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const apiService = {
  // Auth endpoints
  async registerUser(email: string, password: string) {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    return response.json();
  },

  async loginUser(email: string, password: string) {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      throw new Error('Login failed');
    }
    return response.json();
  },

  async getUser(id: number) {
    const response = await fetch(`${API_BASE_URL}/auth/${id}`);
    return response.json();
  },

  async getAllUsers() {
    const response = await fetch(`${API_BASE_URL}/auth`);
    return response.json();
  },

  async deleteUser(id: number) {
    await fetch(`${API_BASE_URL}/auth/${id}`, {
      method: 'DELETE',
    });
  },

  async updateUserSettings(data: User) {
    const response = await fetch(`${API_BASE_URL}/auth/update`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  // Product endpoints
  async createProduct(product: Product) {
    const response = await fetch(`${API_BASE_URL}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });
    return response.json();
  },

  async getProduct(id: string) {
    const response = await fetch(`${API_BASE_URL}/products/${id}`);
    return response.json();
  },

  async getAllProducts() {
    const response = await fetch(`${API_BASE_URL}/products`);
    return response.json();
  },

  async updateProduct(id: string, product: Product) {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });
    return response.json();
  },

  async deleteProduct(id: string) {
    await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'DELETE',
    });
  },

  // Supplier endpoints
  async createSupplier(supplier: Supplier) {
    const response = await fetch(`${API_BASE_URL}/suppliers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(supplier),
    });
    return response.json();
  },

  async getSupplier(id: string) {
    const response = await fetch(`${API_BASE_URL}/suppliers/${id}`);
    return response.json();
  },

  async getAllSuppliers() {
    const response = await fetch(`${API_BASE_URL}/suppliers`);
    return response.json();
  },

  async updateSupplier(id: string, supplier: Supplier) {
    const response = await fetch(`${API_BASE_URL}/suppliers/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(supplier),
    });
    return response.json();
  },

  async deleteSupplier(id: string) {
    await fetch(`${API_BASE_URL}/suppliers/${id}`, {
      method: 'DELETE',
    });
  },

  // Order endpoints
  async createOrder(order: Order) {
    const response = await fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(order),
    });
    return response.json();
  },

  async getOrder(id: string) {
    const response = await fetch(`${API_BASE_URL}/orders/${id}`);
    return response.json();
  },

  async getAllOrders() {
    const response = await fetch(`${API_BASE_URL}/orders`);
    return response.json();
  },

  async updateOrder(id: string, order: Order) {
    const response = await fetch(`${API_BASE_URL}/orders/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(order),
    });
    return response.json();
  },

  async deleteOrder(id: string) {
    await fetch(`${API_BASE_URL}/orders/${id}`, {
      method: 'DELETE',
    });
  },

  // Order Item endpoints
  async createOrderItem(orderItem: OrderItem) {
    const response = await fetch(`${API_BASE_URL}/order-items`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderItem),
    });
    return response.json();
  },

  async getOrderItem(id: string) {
    const response = await fetch(`${API_BASE_URL}/order-items/${id}`);
    return response.json();
  },

  async getAllOrderItems() {
    const response = await fetch(`${API_BASE_URL}/order-items`);
    return response.json();
  },

  async updateOrderItem(id: string, orderItem: OrderItem) {
    const response = await fetch(`${API_BASE_URL}/order-items/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderItem),
    });
    return response.json();
  },

  async deleteOrderItem(id: string) {
    await fetch(`${API_BASE_URL}/order-items/${id}`, {
      method: 'DELETE',
    });
  },

  // Transaction endpoints
  async createTransaction(transaction: Transaction) {
    const response = await fetch(`${API_BASE_URL}/transactions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(transaction),
    });
    return response.json();
  },

  async getTransaction(id: string) {
    const response = await fetch(`${API_BASE_URL}/transactions/${id}`);
    return response.json();
  },

  async getAllTransactions() {
    const response = await fetch(`${API_BASE_URL}/transactions`);
    return response.json();
  },

  async updateTransaction(id: string, transaction: Transaction) {
    const response = await fetch(`${API_BASE_URL}/transactions/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(transaction),
    });
    return response.json();
  },

  async deleteTransaction(id: string) {
    await fetch(`${API_BASE_URL}/transactions/${id}`, {
      method: 'DELETE',
    });
  },
};