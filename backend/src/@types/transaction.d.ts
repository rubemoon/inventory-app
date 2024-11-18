export interface Transaction {
  id: string;
  date: string;
  type: 'In' | 'Out';
  value: number;
  productId: string;
  orderId: string;
}