import { Router } from 'express';
import { authRouter } from './modules/auth/auth.controller';
import { productRouter } from './modules/products/products.controller';
import { supplierRouter } from './modules/suppliers/suppliers.controller';
import { orderRouter } from './modules/orders/orders.controller';
import { orderItemRouter } from './modules/order_items/order_items.controller';
import { transactionRouter } from './modules/transactions/transactions.controller';

export const router = Router();

router.use('/auth', authRouter);
router.use('/products', productRouter);
router.use('/suppliers', supplierRouter);
router.use('/orders', orderRouter);
router.use('/order-items', orderItemRouter);
router.use('/transactions', transactionRouter);