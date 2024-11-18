import api from '../lib/api';

export const getProducts = () => api.get('/products');
export const getProduct = (id: string) => api.get(`/products/${id}`);
export const createProduct = (product: any) => api.post('/products', product);
export const updateProduct = (id: string, product: any) => api.put(`/products/${id}`, product);
export const deleteProduct = (id: string) => api.delete(`/products/${id}`);