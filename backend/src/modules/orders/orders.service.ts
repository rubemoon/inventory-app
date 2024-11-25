import { orderModel } from './orders.model';
import { Order } from '../../@types/order';

export const orderService = {
  async createOrder(order: Order) {
    return orderModel.createOrder(order);
  },
  async getOrder(id: string) {
    return orderModel.getOrder(id);
  },
  async listOrders() {
    return orderModel.getAllOrders();
  },
  async updateOrder(id: string, data: Partial<Order>) {
    return orderModel.updateOrder(id, data);
  },
  async removeOrder(id: string) {
    return orderModel.deleteOrder(id);
  },
  async getSalesData() {
    return orderModel.getSalesData();
  }
};