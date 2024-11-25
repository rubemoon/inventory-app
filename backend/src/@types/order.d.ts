export interface Order {
  id: string;
  date: string;
  supplierId: string;
  status: 'Pending' | 'Completed' | 'Canceled';
  total: number;
  customerName: string;
  product: string;
  quantity: number;
}