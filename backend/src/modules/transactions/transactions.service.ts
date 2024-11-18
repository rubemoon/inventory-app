import { transactionModel } from './transactions.model';
import { Transaction } from '../../@types/transaction';

export const transactionService = {
  async createTransaction(transaction: Transaction) {
    return transactionModel.createTransaction(transaction);
  },
  async getTransaction(id: string) {
    return transactionModel.getTransaction(id);
  },
  async listTransactions() {
    return transactionModel.getAllTransactions();
  },
  async updateTransaction(id: string, data: Partial<Transaction>) {
    return transactionModel.updateTransaction(id, data);
  },
  async removeTransaction(id: string) {
    return transactionModel.deleteTransaction(id);
  }
};