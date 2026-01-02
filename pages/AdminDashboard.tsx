
import React, { useState } from 'react';
import { Plus, Edit, Trash2, X, Package, ShoppingCart, Users, IndianRupee, Search, Calendar, Eye, CheckCircle, TrendingUp, Filter } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { Product, Order } from '../types';

type AdminTab = 'inventory' | 'orders' | 'customers';

const AdminDashboard: React.FC = () => {
  const { products, orders, addProduct, updateProduct, deleteProduct, user } = useAppContext();

  console.log('AdminDashboard user:', user);
  console.log('User role:', user?.role);

  // Check if user is admin
  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center space-y-4">
          <div className="text-6xl">🚫</div>
          <h1 className="text-2xl font-black text-white">Access Denied</h1>
          <p className="text-zinc-500">You don't have permission to access this page.</p>
          <p className="text-zinc-400 text-sm">Current user: {user ? `${user.name} (${user.role})` : 'Not logged in'}</p>
        </div>
      </div>
    );
  }
  const [activeTab, setActiveTab] = useState<AdminTab>('inventory');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState<Partial<Product>>({ specs: [] });
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const totalSales = orders.reduce((acc, o) => acc + o.total, 0);
  
  // Extract unique customers from orders
  const uniqueCustomers = Array.from(new Set(orders.map(o => o.userId))).length;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProduct) {
      updateProduct({ ...editingProduct, ...formData } as Product);
    } else {
      addProduct({ 
        ...formData, 
        id: Date.now().toString(), 
        rating: 4.5 + Math.random() * 0.5, 
        specs: formData.specs || ['Premium Quality', '1 Year Warranty'] 
      } as Product);
    }
    setIsAdding(false);
    setEditingProduct(null);
    setFormData({ specs: [] });
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredOrders = orders.filter(o => 
    o.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
    o.address.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-black uppercase tracking-tighter">Vault <span className="text-[#A10E14]">Control</span></h1>
          <p className="text-zinc-500 font-bold mt-2 uppercase text-xs tracking-widest">Manage TechHub inventory and holiday shipments.</p>
        </div>
        
        <div className="flex bg-zinc-950 p-1.5 rounded-lg border border-zinc-900">
          {(['inventory', 'orders', 'customers'] as AdminTab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => { setActiveTab(tab); setSearchQuery(''); }}
              className={`px-6 py-2.5 rounded-sm font-black text-xs uppercase tracking-widest transition-all ${
                activeTab === tab 
                  ? 'bg-[#A10E14] text-white shadow-lg shadow-red-900/20' 
                  : 'text-zinc-500 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {[
          { label: 'Total Revenue', value: `₹${totalSales.toLocaleString('en-IN')}`, icon: <TrendingUp />, color: 'text-green-500', bg: 'bg-green-500/10' },
          { label: 'Active Orders', value: orders.length, icon: <ShoppingCart />, color: 'text-blue-500', bg: 'bg-blue-500/10' },
          { label: 'Live Products', value: products.length, icon: <Package />, color: 'text-orange-500', bg: 'bg-orange-500/10' },
          { label: 'Customers', value: uniqueCustomers || '1,204', icon: <Users />, color: 'text-purple-500', bg: 'bg-purple-500/10' },
        ].map((stat, i) => (
          <div key={i} className="bg-zinc-950 p-6 rounded-lg border border-zinc-900 flex items-center gap-4 transition-all hover:bg-zinc-900 group">
            <div className={`p-4 rounded-lg ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-[10px] text-zinc-500 uppercase font-black tracking-widest mb-1">{stat.label}</p>
              <p className="text-2xl font-black">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="space-y-6">
        {/* Search and Action Bar */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input 
              type="text" 
              placeholder={`Search ${activeTab}...`} 
              className="w-full pl-12 pr-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg outline-none focus:border-red-800 transition-colors text-sm text-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          {activeTab === 'inventory' && (
            <button 
              onClick={() => { setIsAdding(true); setFormData({ specs: [] }); }}
              className="w-full md:w-auto bg-green-800 hover:bg-green-700 text-white px-8 py-3 rounded-sm font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 transition-all transform active:scale-95 shadow-xl shadow-green-900/20"
            >
              <Plus className="w-5 h-5" /> Add New Gadget
            </button>
          )}
        </div>

        {/* Tab Content */}
        <div className="bg-zinc-950 rounded-lg border border-zinc-900 overflow-hidden shadow-2xl">
          {activeTab === 'inventory' && (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-zinc-900 bg-zinc-900/50">
                    <th className="px-8 py-6 text-[10px] font-black text-zinc-500 uppercase tracking-widest">Product</th>
                    <th className="px-8 py-6 text-[10px] font-black text-zinc-500 uppercase tracking-widest">Category</th>
                    <th className="px-8 py-6 text-[10px] font-black text-zinc-500 uppercase tracking-widest">Price</th>
                    <th className="px-8 py-6 text-[10px] font-black text-zinc-500 uppercase tracking-widest">Stock</th>
                    <th className="px-8 py-6 text-[10px] font-black text-zinc-500 uppercase tracking-widest text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-900">
                  {filteredProducts.map(product => (
                    <tr key={product.id} className="hover:bg-white/[0.02] transition-colors group">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-lg bg-zinc-900 overflow-hidden border border-zinc-800">
                            <img src={product.image} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                          </div>
                          <div>
                            <span className="font-bold block">{product.name}</span>
                            <span className="text-[10px] text-zinc-600 font-black">ID: {product.id}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <span className="px-3 py-1 bg-black border border-zinc-800 rounded-sm text-[10px] font-black uppercase tracking-widest text-zinc-400">
                          {product.category}
                        </span>
                      </td>
                      <td className="px-8 py-6 font-black text-[#A10E14]">₹{product.price.toLocaleString('en-IN')}</td>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${product.stock < 5 ? 'bg-red-700 animate-pulse' : 'bg-green-700'}`}></div>
                          <span className={`text-xs font-black uppercase ${product.stock < 5 ? 'text-red-700' : 'text-zinc-500'}`}>
                            {product.stock} Units
                          </span>
                        </div>
                      </td>
                      <td className="px-8 py-6 text-right space-x-2">
                        <button onClick={() => { setEditingProduct(product); setFormData(product); setIsAdding(true); }} className="p-2.5 bg-blue-900/10 text-blue-500 rounded-lg hover:bg-blue-500 hover:text-white transition-all"><Edit className="w-4 h-4" /></button>
                        <button onClick={() => deleteProduct(product.id)} className="p-2.5 bg-red-900/10 text-red-700 rounded-lg hover:bg-red-700 hover:text-white transition-all"><Trash2 className="w-4 h-4" /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-zinc-900 bg-zinc-900/50">
                    <th className="px-8 py-6 text-[10px] font-black text-zinc-500 uppercase tracking-widest">Order ID</th>
                    <th className="px-8 py-6 text-[10px] font-black text-zinc-500 uppercase tracking-widest">Customer</th>
                    <th className="px-8 py-6 text-[10px] font-black text-zinc-500 uppercase tracking-widest">Date</th>
                    <th className="px-8 py-6 text-[10px] font-black text-zinc-500 uppercase tracking-widest">Amount</th>
                    <th className="px-8 py-6 text-[10px] font-black text-zinc-500 uppercase tracking-widest text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-900">
                  {filteredOrders.length > 0 ? filteredOrders.map(order => (
                    <tr key={order.id} className="hover:bg-white/[0.02] transition-colors group cursor-pointer" onClick={() => setSelectedOrder(order)}>
                      <td className="px-8 py-6">
                        <span className="font-mono text-xs font-black text-[#A10E14]">{order.id}</span>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex flex-col">
                          <span className="font-bold">{order.address.name}</span>
                          <span className="text-[10px] text-zinc-600 font-black">{order.address.phone}</span>
                        </div>
                      </td>
                      <td className="px-8 py-6 text-zinc-500 text-xs font-bold">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-3 h-3" />
                          {new Date(order.date).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-8 py-6 font-black">₹{order.total.toLocaleString('en-IN')}</td>
                      <td className="px-8 py-6 text-right">
                        <span className="px-3 py-1 bg-green-900/10 text-green-500 rounded-sm text-[10px] font-black uppercase tracking-widest border border-green-900/20">
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan={5} className="px-8 py-20 text-center">
                        <div className="flex flex-col items-center gap-4 opacity-30">
                          <ShoppingCart className="w-12 h-12" />
                          <p className="font-black uppercase tracking-widest text-xs">No orders recorded yet.</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'customers' && (
             <div className="p-20 text-center space-y-4">
                <Users className="w-16 h-16 text-zinc-800 mx-auto" />
                <h3 className="text-2xl font-black uppercase tracking-tighter">Client Hub</h3>
                <p className="text-zinc-500 max-w-sm mx-auto font-bold text-sm">Track your high-profile customers and their purchase history. (Expansion in progress)</p>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
