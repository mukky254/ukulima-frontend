export interface User {
  id: string;
  name: string;
  email: string;
  role: 'farmer' | 'wholesaler' | 'retailer' | 'admin';
  phone?: string;
  location?: {
    address: string;
    city: string;
    country: string;
  };
  profile?: {
    bio?: string;
    avatar?: string;
    businessName?: string;
  };
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  category: string;
  subcategory: string;
  price: number;
  unit: string;
  quantity: number;
  minOrder: number;
  images: string[];
  farmer: User;
  specifications: {
    grade?: string;
    variety?: string;
    organic?: boolean;
    pesticideFree?: boolean;
  };
  location: {
    city: string;
    country: string;
  };
  isAvailable: boolean;
  rating: number;
  reviewCount: number;
  createdAt: string;
}

export interface Order {
  _id: string;
  orderNumber: string;
  buyer: User;
  seller: User;
  items: OrderItem[];
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: {
    address: string;
    city: string;
    country: string;
    phone: string;
  };
  payment: {
    method: 'stripe' | 'mpesa' | 'cod';
    status: 'pending' | 'paid' | 'failed' | 'refunded';
  };
  createdAt: string;
}

export interface OrderItem {
  product: Product;
  quantity: number;
  price: number;
}

export interface Message {
  _id: string;
  chatId: string;
  sender: User;
  receiver: User;
  content: string;
  type: 'text' | 'image' | 'file';
  read: boolean;
  createdAt: string;
}
