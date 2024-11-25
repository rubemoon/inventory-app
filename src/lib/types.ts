export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Supplier {
  id: string;
  name: string;
  contact: string;
  address: string;
}

export interface Order {
  id: string;
  date: string;
  supplierId: string;
  status: 'Pending' | 'Completed' | 'Canceled';
  total: number;
  customerName: string;
  product: string;
  quantity: number;
  userEmail: string;
  userImage?: string;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
}

export interface Transaction {
  id: string;
  orderId: string;
  amount: number;
  date: string;
}

export interface User {
  id: number;
  fullName: string;
  email: string;
  profileImage: string;
}