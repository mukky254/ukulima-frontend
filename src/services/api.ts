import axios from 'axios';

// For production - use relative paths, for development use proxy
const API_BASE_URL = import.meta.env.PROD 
  ? 'https://ukulima-backend-ionm.onrender.com'
  : '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: (email: string, password: string) => 
    api.post('/auth/login', { email, password }),
  register: (userData: any) => 
    api.post('/auth/register', userData),
  getMe: () => 
    api.get('/auth/me'),
};

export const productsAPI = {
  getAll: (params?: any) => 
    api.get('/products', { params }),
  getById: (id: string) => 
    api.get(`/products/${id}`),
  create: (productData: any) => 
    api.post('/products', productData),
  update: (id: string, productData: any) => 
    api.put(`/products/${id}`, productData),
  getMyProducts: () =>
    api.get('/products/farmer/my-products'),
};

export const ordersAPI = {
  create: (orderData: any) => 
    api.post('/orders', orderData),
  getMyOrders: () => 
    api.get('/orders/my-orders'),
  getMySales: () => 
    api.get('/orders/my-sales'),
};

export const messagesAPI = {
  getByChatId: (chatId: string) => 
    api.get(`/messages/${chatId}`),
  send: (messageData: any) => 
    api.post('/messages', messageData),
};

export const testConnection = () => 
  api.get('/health');

export default api;
