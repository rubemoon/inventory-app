import { Router, Request, Response } from 'express';
import { productService } from './products.service';

export const productRouter = Router();

productRouter.post('/', async (req: Request, res: Response) => {
  try {
    const product = await productService.createProduct(req.body);
    res.json(product);
  } catch (error) {
    res.status(500).send('Failed to create product');
  }
});

productRouter.get('/:id', async (req: Request, res: Response) => {
  try {
    const product = await productService.getProduct(req.params.id);
    product ? res.json(product) : res.status(404).send('Product not found');
  } catch (error) {
    res.status(500).send('Failed to fetch product');
  }
});

productRouter.get('/', async (_req: Request, res: Response) => {
  try {
    const products = await productService.listProducts();
    res.json(products);
  } catch (error) {
    res.status(500).send('Failed to fetch products');
  }
});

productRouter.put('/:id', async (req: Request, res: Response) => {
  try {
    const updatedProduct = await productService.updateProduct(req.params.id, req.body);
    res.status(200).json({
      message: 'Product updated successfully',
      product: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update product' });
  }
});

productRouter.delete('/:id', async (req: Request, res: Response) => {
  try {
    await productService.removeProduct(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).send('Failed to delete product');
  }
});