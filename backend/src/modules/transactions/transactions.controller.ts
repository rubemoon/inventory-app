import express, { Router, Request, Response } from 'express';
import { transactionService } from './transactions.service';

export const transactionRouter = Router();

transactionRouter.post('/', async (req: Request, res: Response) => {
  try {
    const transaction = await transactionService.createTransaction(req.body);
    res.json(transaction);
  } catch (error) {
    res.status(500).send('Failed to create transaction');
  }
});

transactionRouter.get('/:id', async (req: Request, res: Response) => {
  try {
    const transaction = await transactionService.getTransaction(req.params.id);
    transaction ? res.json(transaction) : res.status(404).send('Transaction not found');
  } catch (error) {
    res.status(500).send('Failed to fetch transaction');
  }
});

transactionRouter.get('/', async (_req: Request, res: Response) => {
  try {
    const transactions = await transactionService.listTransactions();
    res.json(transactions);
  } catch (error) {
    res.status(500).send('Failed to fetch transactions');
  }
});

transactionRouter.put('/:id', async (req: Request, res: Response) => {
  try {
    await transactionService.updateTransaction(req.params.id, req.body);
    res.status(200).send('Transaction updated successfully');
  } catch (error) {
    res.status(500).send('Failed to update transaction');
  }
});

transactionRouter.delete('/:id', async (req: Request, res: Response) => {
  try {
    await transactionService.removeTransaction(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).send('Failed to delete transaction');
  }
});