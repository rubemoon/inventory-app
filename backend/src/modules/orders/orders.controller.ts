import express, { Router, Request, Response } from 'express';
import { orderService } from './orders.service';

export const orderRouter = Router();

orderRouter.post('/', async (req: Request, res: Response) => {
  try {
    const order = await orderService.createOrder(req.body);
    res.json(order);
  } catch (error) {
    console.error('Failed to create order:', error);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

orderRouter.get('/:id', async (req: Request, res: Response) => {
  try {
    const order = await orderService.getOrder(req.params.id);
    order ? res.json(order) : res.status(404).json({ error: 'Order not found' });
  } catch (error) {
    console.error('Failed to fetch order:', error);
    res.status(500).json({ error: 'Failed to fetch order' });
  }
});

orderRouter.get('/', async (_req: Request, res: Response) => {
  try {
    const orders = await orderService.listOrders();
    res.json(orders);
  } catch (error) {
    console.error('Failed to fetch orders:', error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

orderRouter.put('/:id', async (req: Request, res: Response) => {
  try {
    await orderService.updateOrder(req.params.id, req.body);
    res.status(200).json({ message: 'Order updated successfully' });
  } catch (error) {
    console.error('Failed to update order:', error);
    res.status(500).json({ error: 'Failed to update order' });
  }
});

orderRouter.delete('/:id', async (req: Request, res: Response) => {
  try {
    await orderService.removeOrder(req.params.id);
    res.status(204).send();
  } catch (error) {
    console.error('Failed to delete order:', error);
    res.status(500).json({ error: 'Failed to delete order' });
  }
});

orderRouter.get('/sales-data', async (_req: Request, res: Response) => {
  try {
    const salesData = await orderService.getSalesData();
    res.json(salesData);
  } catch (error) {
    console.error('Failed to fetch sales data:', error);
    res.status(500).json({ error: 'Failed to fetch sales data' });
  }
});