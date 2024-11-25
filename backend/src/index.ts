import express from 'express';
import cors from 'cors';
import path from 'path';
import { authRouter } from './modules/auth/auth.controller';
import { productRouter } from './modules/products/products.controller';
import { supplierRouter } from './modules/suppliers/suppliers.controller';
import { orderRouter } from './modules/orders/orders.controller';
import { orderItemRouter } from './modules/order_items/order_items.controller';
import { transactionRouter } from './modules/transactions/transactions.controller';
import { authModel } from './modules/auth/auth.model';
import { productModel } from './modules/products/products.model';
import { supplierModel } from './modules/suppliers/suppliers.model';
import { orderModel } from './modules/orders/orders.model';
import { orderItemModel } from './modules/order_items/order_items.model';
import { transactionModel } from './modules/transactions/transactions.model';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/products', productRouter);
app.use('/api/suppliers', supplierRouter);
app.use('/api/orders', orderRouter);
app.use('/api/order-items', orderItemRouter);
app.use('/api/transactions', transactionRouter);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const PORT = process.env.PORT || 3000;

Promise.all([
  authModel.initialize(),
  productModel.initialize(),
  supplierModel.initialize(),
  orderModel.initialize(),
  orderItemModel.initialize(),
  transactionModel.initialize()
]).then(() => {
  console.log('Database initialized');
  app.listen(PORT, () => {
    console.log(`API is running on http://localhost:${PORT}`);
  });
}).catch((error) => {
  console.error('Failed to initialize database:', error);
});