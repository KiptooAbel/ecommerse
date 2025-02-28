import React, { useState } from 'react';
import { 
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Package, Users, Clock, Shield } from 'lucide-react';
import AuthenticatedLayout from '@/Layouts/AdminAuthenticatedLayout';


const Dashboard = ({ admins = [] }) => {
  // Sample data
  const salesData = [
    { name: 'Jan', sales: 4000 },
    { name: 'Feb', sales: 3000 },
    { name: 'Mar', sales: 5000 },
    { name: 'Apr', sales: 2780 },
    { name: 'May', sales: 1890 },
    { name: 'Jun', sales: 2390 },
    { name: 'Jul', sales: 3490 },
  ];

  const categoryData = [
    { name: 'Fiction', value: 45 },
    { name: 'Non-Fiction', value: 25 },
    { name: 'Children', value: 15 },
    { name: 'Academic', value: 10 },
    { name: 'Other', value: 5 },
  ];

  const recentOrders = [
    { id: '#0123', customer: 'John Doe', total: '$129.99', status: 'Delivered', date: '28 Feb 2025' },
    { id: '#0124', customer: 'Jane Smith', total: '$89.99', status: 'Processing', date: '27 Feb 2025' },
    { id: '#0125', customer: 'Robert Johnson', total: '$199.99', status: 'Shipped', date: '26 Feb 2025' },
    { id: '#0126', customer: 'Emily Davis', total: '$59.99', status: 'Pending', date: '26 Feb 2025' },
  ];

  const lowStockItems = [
    { id: 'BK1001', title: 'The Silent Echo', stock: 3, category: 'Fiction' },
    { id: 'BK1023', title: 'Modern Philosophy', stock: 5, category: 'Non-Fiction' },
    { id: 'BK1045', title: 'Coding for Beginners', stock: 2, category: 'Academic' },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  const stats = [
    { title: 'Total Revenue', value: '$24,389', change: '+12%', icon: <DollarSign />, positive: true },
    { title: 'Orders', value: '243', change: '+18%', icon: <ShoppingCart />, positive: true },
    { title: 'Inventory', value: '1,294', change: '-3%', icon: <Package />, positive: false },
    { title: 'Customers', value: '573', change: '+9%', icon: <Users />, positive: true },
  ];

  // Admin form state
  const [adminData, setAdminData] = useState({
    name: "",
    email: ""
  });
  const [processing, setProcessing] = useState(false);
  const [errors, setErrors] = useState({});
  
  const handleAdminDataChange = (field, value) => {
    setAdminData({
      ...adminData,
      [field]: value
    });
  };

  const handleAdminSubmit = (e) => {
    e.preventDefault();
    setProcessing(true);
    // Simulate form submission
    setTimeout(() => {
      setProcessing(false);
      setAdminData({ name: "", email: "" });
      // In a real app, you would post to your backend here
    }, 1500);
  };

  // States for tab selection
  const [activeTab, setActiveTab] = useState('overview');

  return (    <AuthenticatedLayout>

    <div className="bg-gray-50 min-h-screen p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600">Welcome to your Novel E-commerce Platform</p>
      </div>

      {/* Navigation tabs */}
      <div className="flex mb-6 bg-white rounded-lg shadow overflow-x-auto">
        <button 
          onClick={() => setActiveTab('overview')} 
          className={`px-4 py-3 font-medium ${activeTab === 'overview' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
        >
          Overview
        </button>
        <button 
          onClick={() => setActiveTab('orders')} 
          className={`px-4 py-3 font-medium ${activeTab === 'orders' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
        >
          Orders
        </button>
        <button 
          onClick={() => setActiveTab('inventory')} 
          className={`px-4 py-3 font-medium ${activeTab === 'inventory' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
        >
          Inventory
        </button>
        <button 
          onClick={() => setActiveTab('customers')} 
          className={`px-4 py-3 font-medium ${activeTab === 'customers' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
        >
          Customers
        </button>
        <button 
          onClick={() => setActiveTab('admins')} 
          className={`px-4 py-3 font-medium ${activeTab === 'admins' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
        >
          Admins
        </button>
      </div>

      {activeTab === 'overview' && (
        <>
          {/* Stats overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-gray-500 text-sm">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-full ${stat.positive ? 'bg-green-100' : 'bg-red-100'}`}>
                    {stat.icon}
                  </div>
                </div>
                <div className="mt-4 flex items-center">
                  {stat.positive ? 
                    <TrendingUp className="w-4 h-4 text-green-500" /> : 
                    <TrendingDown className="w-4 h-4 text-red-500" />
                  }
                  <span className={`ml-1 text-sm ${stat.positive ? 'text-green-500' : 'text-red-500'}`}>
                    {stat.change} from last month
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Charts row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Sales Trend */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-lg font-medium mb-4">Sales Trend</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="sales" stroke="#3B82F6" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Category Distribution */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-lg font-medium mb-4">Sales by Category</h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent orders and low stock */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Orders */}
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium">Recent Orders</h2>
                <button className="text-blue-600 text-sm">View All</button>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {recentOrders.map((order) => (
                      <tr key={order.id}>
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{order.customer}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{order.total}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 
                            order.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
                            order.status === 'Shipped' ? 'bg-purple-100 text-purple-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Low Stock Alert */}
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium">Low Stock Alert</h2>
                <button className="text-blue-600 text-sm">View Inventory</button>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product ID</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {lowStockItems.map((item) => (
                      <tr key={item.id}>
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{item.id}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{item.title}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{item.category}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                            {item.stock} left
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      )}

      {activeTab === 'orders' && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium mb-4">Orders Management</h2>
          <p className="text-gray-600">Orders tab content would go here.</p>
        </div>
      )}

      {activeTab === 'inventory' && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium mb-4">Inventory Management</h2>
          <p className="text-gray-600">Inventory tab content would go here.</p>
        </div>
      )}

      {activeTab === 'customers' && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium mb-4">Customer Management</h2>
          <p className="text-gray-600">Customers tab content would go here.</p>
        </div>
      )}

      {activeTab === 'admins' && (
        <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4">Manage Admins</h2>

          {/* Admin List */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Existing Admins</h3>
            <ul className="bg-gray-100 p-4 rounded-lg">
              {admins.length > 0 ? (
                admins.map((admin) => (
                  <li key={admin.id} className="p-2 border-b">
                    {admin.name} - {admin.email}
                  </li>
                ))
              ) : (
                <p>No admins found.</p>
              )}
            </ul>
          </div>

          {/* Add New Admin Form */}
          <h3 className="text-xl font-semibold mb-2">Add New Admin</h3>
          <form onSubmit={handleAdminSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                value={adminData.name}
                onChange={(e) => handleAdminDataChange("name", e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                value={adminData.email}
                onChange={(e) => handleAdminDataChange("email", e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>

            <button
              type="submit"
              disabled={processing}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
            >
              {processing ? "Adding..." : "Add Admin"}
            </button>
          </form>
        </div>
      )}
    </div>    </AuthenticatedLayout>

  );
};

export default Dashboard;