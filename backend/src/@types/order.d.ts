export interface Order {
  id: string;
  date: string;
  supplierId: string;
  status: 'Pending' | 'Completed';
  total: number;
}