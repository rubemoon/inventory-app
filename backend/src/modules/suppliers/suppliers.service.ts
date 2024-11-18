import { supplierModel } from './suppliers.model';
import { Supplier } from '../../@types/supplier';

export const supplierService = {
  async createSupplier(supplier: Supplier) {
    return supplierModel.createSupplier(supplier);
  },
  async getSupplier(id: string) {
    return supplierModel.getSupplier(id);
  },
  async listSuppliers() {
    return supplierModel.getAllSuppliers();
  },
  async updateSupplier(id: string, data: Partial<Supplier>) {
    return supplierModel.updateSupplier(id, data);
  },
  async removeSupplier(id: string) {
    return supplierModel.deleteSupplier(id);
  }
};