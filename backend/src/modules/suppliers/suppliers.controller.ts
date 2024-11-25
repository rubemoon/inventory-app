import express, { Router, Request, Response } from 'express';
import { supplierService } from './suppliers.service';

export const supplierRouter = Router();

supplierRouter.post('/', async (req: Request, res: Response) => {
  try {
    const supplier = await supplierService.createSupplier(req.body);
    res.json(supplier);
  } catch (error) {
    console.error('Error creating supplier:', error);
    const errorMessage = (error instanceof Error) ? error.message : 'Unknown error';
    res.status(500).send(`Failed to create supplier: ${errorMessage}`);
  }
});

supplierRouter.get('/:id', async (req: Request, res: Response) => {
  try {
    const supplier = await supplierService.getSupplier(req.params.id);
    supplier ? res.json(supplier) : res.status(404).send('Supplier not found');
  } catch (error) {
    console.error('Error fetching supplier:', error);
    res.status(500).send('Failed to fetch supplier');
  }
});

supplierRouter.get('/', async (_req: Request, res: Response) => {
  try {
    const suppliers = await supplierService.listSuppliers();
    res.json(suppliers);
  } catch (error) {
    console.error('Error fetching suppliers:', error);
    res.status(500).send('Failed to fetch suppliers');
  }
});

supplierRouter.put('/:id', async (req: Request, res: Response) => {
  try {
    await supplierService.updateSupplier(req.params.id, req.body);
    res.status(200).send('Supplier updated successfully');
  } catch (error) {
    console.error('Error updating supplier:', error);
    res.status(500).send('Failed to update supplier');
  }
});

supplierRouter.delete('/:id', async (req: Request, res: Response) => {
  try {
    await supplierService.removeSupplier(req.params.id);
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting supplier:', error);
    res.status(500).send('Failed to delete supplier');
  }
});