import { orderItemModel } from './order_items.model';
import { OrderItem } from '../../@types/order_item';

export const orderItemService = {
  async createOrderItem(orderItem: OrderItem) {
    return orderItemModel.createOrderItem(orderItem);
  },
  async getOrderItem(id: string) {
    return orderItemModel.getOrderItem(id);
  },
  async listOrderItems() {
    return orderItemModel.getAllOrderItems();
  },
  async updateOrderItem(id: string, data: Partial<OrderItem>) {
    return orderItemModel.updateOrderItem(id, data);
  },
  async removeOrderItem(id: string) {
    return orderItemModel.deleteOrderItem(id);
  }
};