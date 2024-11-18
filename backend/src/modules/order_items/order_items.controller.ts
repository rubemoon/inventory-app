import express, { Router, Request, Response } from 'express';
import { orderItemService } from './order_items.service';

export const orderItemRouter = Router();

orderItemRouter.post('/', async (req: Request, res: Response) => {
  try {
    const orderItem = await orderItemService.createOrderItem(req.body);
    res.json(orderItem);
  } catch (error) {
    res.status(500).send('Failed to create order item');
  }
});

orderItemRouter.get('/:id', async (req: Request, res: Response) => {
  try {
    const orderItem = await orderItemService.getOrderItem(req.params.id);
    orderItem ? res.json(orderItem) : res.status(404).send('Order item not found');
  } catch (error) {
    res.status(500).send('Failed to fetch order item');
  }
});

orderItemRouter.get('/', async (_req: Request, res: Response) => {
  try {
    const orderItems = await orderItemService.listOrderItems();
    res.json(orderItems);
  } catch (error) {
    res.status(500).send('Failed to fetch order items');
  }
});

orderItemRouter.put('/:id', async (req: Request, res: Response) => {
  try {
    await orderItemService.updateOrderItem(req.params.id, req.body);
    res.status(200).send('Order item updated successfully');
  } catch (error) {
    res.status(500).send('Failed to update order item');
  }
});

orderItemRouter.delete('/:id', async (req: Request, res: Response) => {
  try {
    await orderItemService.removeOrderItem(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).send('Failed to delete order item');
  }
});