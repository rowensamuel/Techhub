
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  rating: number;
  discount: number;
  stock: number;
  specs: string[];
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'completed' | 'shipped';
  date: string;
  address: {
    name: string;
    street: string;
    city: string;
    phone: string;
  };
}

export type Category = 'Mobiles' | 'Laptops' | 'Audio' | 'Wearables' | 'Accessories';
