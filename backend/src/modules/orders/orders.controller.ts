import express, { Router, Request, Response } from 'express';
import { orderService } from './orders.service';

export const orderRouter = Router();

orderRouter.post('/', async (req: Request, res: Response) => {
  try {
    const order = await orderService.createOrder(req.body);
    res.json(order);
  } catch (error) {
    res.status(500).send('Failed to create order');
  }
});

orderRouter.get('/:id', async (req: Request, res: Response) => {
  try {
    const order = await orderService.getOrder(req.params.id);
    order ? res.json(order) : res.status(404).send('Order not found');
  } catch (error) {
    res.status(500).send('Failed to fetch order');
  }
});

orderRouter.get('/', async (_req: Request, res: Response) => {
  try {
    const orders = await orderService.listOrders();
    res.json(orders);
  } catch (error) {
    res.status(500).send('Failed to fetch orders');
  }
});

orderRouter.put('/:id', async (req: Request, res: Response) => {
  try {
    await orderService.updateOrder(req.params.id, req.body);
    res.status(200).send('Order updated successfully');
  } catch (error) {
    res.status(500).send('Failed to update order');
  }
});

orderRouter.delete('/:id', async (req: Request, res: Response) => {
  try {
    await orderService.removeOrder(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).send('Failed to delete order');
  }
});