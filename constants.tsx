
import { Product } from './types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'iPhone 15 Pro Max',
    description: 'Forged in titanium. Featuring the groundbreaking A17 Pro chip, a customizable Action button, and a more versatile Pro camera system.',
    price: 159900,
    category: 'Mobiles',
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=1200&auto=format&fit=crop',
    rating: 4.9,
    discount: 5,
    stock: 12,
    specs: ['Titanium Frame', '48MP Main Camera', 'A17 Pro Chip', 'USB-C']
  },
  {
    id: '2',
    name: 'MacBook Air M3',
    description: 'The world’s most popular laptop is better than ever with the blazing-fast M3 chip and a striking 13-inch Liquid Retina display.',
    price: 114900,
    category: 'Laptops',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1200&auto=format&fit=crop',
    rating: 4.8,
    discount: 10,
    stock: 8,
    specs: ['M3 Chip', '13.6-inch Liquid Retina', 'Up to 18 hrs battery', 'MagSafe 3']
  },
  {
    id: '3',
    name: 'Sony WH-1000XM5',
    description: 'Industry-leading noise cancellation and magnificent sound quality. Integrated Processor V1, 30-hour battery life.',
    price: 29990,
    category: 'Audio',
    image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=1200&auto=format&fit=crop',
    rating: 4.7,
    discount: 15,
    stock: 25,
    specs: ['Industry-leading NC', '30hr battery', 'Multipoint connection']
  },
  {
    id: '4',
    name: 'Samsung Galaxy Watch 6',
    description: 'Track your workouts, sleep, and heart health on the biggest screen yet. Sophisticated design for every occasion.',
    price: 32999,
    category: 'Wearables',
    image: 'https://images.unsplash.com/photo-1544117518-30df578096a4?q=80&w=1200&auto=format&fit=crop',
    rating: 4.6,
    discount: 20,
    stock: 15,
    specs: ['Sapphire Crystal', 'Body Composition', 'ECG Monitoring']
  },
  {
    id: '5',
    name: 'Logitech MX Master 3S',
    description: 'Remastered for speed, precision, and silence. Quiet Clicks deliver a satisfying tactile feel with 90% less click noise.',
    price: 10995,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?q=80&w=1200&auto=format&fit=crop',
    rating: 4.9,
    discount: 0,
    stock: 50,
    specs: ['Quiet Clicks', '8k DPI Tracking', 'MagSpeed Scrolling']
  },
  {
    id: '6',
    name: 'iPad Pro M4',
    description: 'Thin, light, and powerful. The new iPad Pro features a breakthrough Ultra Retina XDR display and supercharged M4 performance.',
    price: 99900,
    category: 'Laptops',
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=1200&auto=format&fit=crop',
    rating: 4.9,
    discount: 8,
    stock: 10,
    specs: ['Ultra Retina XDR', 'M4 Chip', 'Apple Pencil Pro Support']
  },
  {
    id: '7',
    name: 'Samsung S24 Ultra',
    description: 'The most powerful Galaxy yet. With Titanium exterior, Galaxy AI, and a 200MP camera system.',
    price: 129999,
    category: 'Mobiles',
    image: 'https://images.unsplash.com/photo-1707246820202-39f50e18149e?q=80&w=1200&auto=format&fit=crop',
    rating: 4.8,
    discount: 12,
    stock: 20,
    specs: ['Snapdragon 8 Gen 3', '200MP Quad Tele', 'Titanium Frame']
  },
  {
    id: '8',
    name: 'DJI Mini 4 Pro',
    description: 'Fly safe, fly free. Our most advanced mini drone yet, under 249g with 4K HDR True Vertical Shooting.',
    price: 89900,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?q=80&w=1200&auto=format&fit=crop',
    rating: 4.9,
    discount: 5,
    stock: 5,
    specs: ['Omnidirectional Sensing', '4K/60fps HDR', '34-min Flight Time']
  },
  {
    id: '9',
    name: 'Bose QuietComfort Ultra',
    description: 'World-class noise cancellation. Now with breakthrough spatial audio for more immersive listening than ever before.',
    price: 34900,
    category: 'Audio',
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=1200&auto=format&fit=crop',
    rating: 4.7,
    discount: 10,
    stock: 18,
    specs: ['CustomTune technology', 'World-class NC', 'Spatial Audio']
  },
  {
    id: '10',
    name: 'Keychron Q1 Max',
    description: 'A custom mechanical keyboard that pushes the limits. Full aluminum body, double-gasket design, and hot-swappable.',
    price: 18500,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?q=80&w=1200&auto=format&fit=crop',
    rating: 4.9,
    discount: 0,
    stock: 10,
    specs: ['QMK/VIA Support', 'CNC Aluminum', 'Hot-swappable']
  }
];

export const CATEGORIES: string[] = ['All', 'Mobiles', 'Laptops', 'Audio', 'Wearables', 'Accessories'];
