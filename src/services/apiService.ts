import { Order, OrderItem, Product, Supplier, Transaction, User } from "../lib/types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

async function handleResponse(response: Response) {
  const contentType = response.headers.get('Content-Type');
  let data;
  if (contentType && contentType.includes('application/json')) {
    data = await response.json();
  } else {
    data = await response.text();
  }

  if (!response.ok) {
    const errorMessage = data.error || data || 'An unknown error occurred';
    throw new Error(errorMessage);
  }

  return data;
}

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
    return handleResponse(response);
  },

  async loginUser(email: string, password: string) {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    return handleResponse(response);
  },

  async getUser(id: number) {
    const response = await fetch(`${API_BASE_URL}/auth/${id}`);
    return handleResponse(response);
  },

  async getAllUsers() {
    const response = await fetch(`${API_BASE_URL}/auth`);
    return handleResponse(response);
  },

  async deleteUser(id: number) {
    const response = await fetch(`${API_BASE_URL}/auth/${id}`, {
      method: 'DELETE',
    });
    return handleResponse(response);
  },

  async updateUserSettings(data: User) {
    const response = await fetch(`${API_BASE_URL}/auth/update`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
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
    return handleResponse(response);
  },

  async getProduct(id: string) {
    const response = await fetch(`${API_BASE_URL}/products/${id}`);
    return handleResponse(response);
  },

  async getAllProducts() {
    const response = await fetch(`${API_BASE_URL}/products`);
    return handleResponse(response);
  },

  async updateProduct(id: string, product: Product) {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });
    return handleResponse(response);
  },

  async deleteProduct(id: string) {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'DELETE',
    });
    return handleResponse(response);
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
    return handleResponse(response);
  },

  async getSupplier(id: string) {
    const response = await fetch(`${API_BASE_URL}/suppliers/${id}`);
    return handleResponse(response);
  },

  async getAllSuppliers() {
    const response = await fetch(`${API_BASE_URL}/suppliers`);
    return handleResponse(response);
  },

  async updateSupplier(id: string, supplier: Supplier) {
    const response = await fetch(`${API_BASE_URL}/suppliers/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(supplier),
    });
    return handleResponse(response);
  },

  async deleteSupplier(id: string) {
    const response = await fetch(`${API_BASE_URL}/suppliers/${id}`, {
      method: 'DELETE',
    });
    return handleResponse(response);
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
    return handleResponse(response);
  },

  async getOrder(id: string) {
    const response = await fetch(`${API_BASE_URL}/orders/${id}`);
    return handleResponse(response);
  },

  async getAllOrders() {
    const response = await fetch(`${API_BASE_URL}/orders`);
    return handleResponse(response);
  },

  async updateOrder(id: string, order: Order) {
    const response = await fetch(`${API_BASE_URL}/orders/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(order),
    });
    return handleResponse(response);
  },

  async deleteOrder(id: string) {
    const response = await fetch(`${API_BASE_URL}/orders/${id}`, {
      method: 'DELETE',
    });
    return handleResponse(response);
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
    return handleResponse(response);
  },

  async getOrderItem(id: string) {
    const response = await fetch(`${API_BASE_URL}/order-items/${id}`);
    return handleResponse(response);
  },

  async getAllOrderItems() {
    const response = await fetch(`${API_BASE_URL}/order-items`);
    return handleResponse(response);
  },

  async getSalesData() {
    const response = await fetch(`${API_BASE_URL}/orders/sales-data`);
    return handleResponse(response);
  },

  async updateOrderItem(id: string, orderItem: OrderItem) {
    const response = await fetch(`${API_BASE_URL}/order-items/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderItem),
    });
    return handleResponse(response);
  },

  async deleteOrderItem(id: string) {
    const response = await fetch(`${API_BASE_URL}/order-items/${id}`, {
      method: 'DELETE',
    });
    return handleResponse(response);
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
    return handleResponse(response);
  },

  async getTransaction(id: string) {
    const response = await fetch(`${API_BASE_URL}/transactions/${id}`);
    return handleResponse(response);
  },

  async getAllTransactions() {
    const response = await fetch(`${API_BASE_URL}/transactions`);
    return handleResponse(response);
  },

  async updateTransaction(id: string, transaction: Transaction) {
    const response = await fetch(`${API_BASE_URL}/transactions/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(transaction),
    });
    return handleResponse(response);
  },

  async deleteTransaction(id: string) {
    const response = await fetch(`${API_BASE_URL}/transactions/${id}`, {
      method: 'DELETE',
    });
    return handleResponse(response);
  },
};