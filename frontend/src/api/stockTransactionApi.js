import axiosInstance from './axiosInstance';

export const getAllTransactions = () => axiosInstance.get('/stock-transactions');
export const getTransactionsByProduct = (productId) =>
  axiosInstance.get(`/stock-transactions/product/${productId}`);
export const createTransaction = (data) => axiosInstance.post('/stock-transactions', data);