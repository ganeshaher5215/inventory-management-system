import axiosInstance from './axiosInstance';

export const getEmployees = () => axiosInstance.get('/employees');
export const getDepartments = () => axiosInstance.get('/departments');
export const createEmployee = (data) => axiosInstance.post('/employees', data);
export const updateEmployee = (id, data) => axiosInstance.put(`/employees/${id}`, data);
export const deleteEmployee = (id) => axiosInstance.delete(`/employees/${id}`);