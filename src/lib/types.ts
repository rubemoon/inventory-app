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
  contactInfo: string;
}

export interface Order {
  id: string;
  productId: string;
  quantity: number;
  totalPrice: number;
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