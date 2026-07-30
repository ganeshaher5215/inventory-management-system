import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from 'recharts';
import axiosInstance from '../api/axiosInstance';
import Layout from '../components/Layout';
const CATEGORY_COLORS = ['#0F766E', '#B45309', '#0369A1', '#7C3AED', '#BE185D', '#65A30D'];

function Dashboard() {
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSummary();
  }, []);

  const fetchSummary = async () => {
    try {
      const response = await axiosInstance.get('/dashboard/summary');
      setSummary(response.data);
    } catch (err) {
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <p className="text-slate-500">Loading dashboard...</p>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <p className="text-red-600">{error}</p>
      </Layout>
    );
  }

  const chartData = Object.entries(summary.employeesPerDepartment || {}).map(
    ([name, count]) => ({ name, count })
  );
  const categoryCountData = Object.entries(summary.productsPerCategory || {}).map(
  ([name, count]) => ({ name, count })
);

const categoryValueData = Object.entries(summary.stockValuePerCategory || {}).map(
  ([name, value]) => ({ name, value })
);

  const cards = [
    { label: 'Total Employees', value: summary.totalEmployees },
    { label: 'Total Departments', value: summary.totalDepartments },
    { label: 'Total Products', value: summary.totalProducts },
    { label: 'Stock Value', value: `₹${summary.totalStockValue.toLocaleString()}` },
    { label: 'Low Stock Items', value: summary.lowStockCount, alert: summary.lowStockCount > 0 },
  ];

  return (
    <Layout>
      <h1 className="text-2xl font-display font-bold text-ink mb-1">Dashboard</h1>
<p className="text-muted text-sm mb-6">Overview of your inventory and team</p>
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4 mb-8">
        {cards.map((card) => (
          <div
            key={card.label}
            className={`bg-white rounded-lg shadow p-5 ${
              card.alert ? 'border-2 border-red-400' : ''
            }`}
          >
            <p className="text-sm text-slate-500">{card.label}</p>
            <p className={`text-2xl font-bold mt-1 ${card.alert ? 'text-red-600' : 'text-slate-800'}`}>
              {card.value}
            </p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-lg font-semibold text-slate-800 mb-4">
          Employees per Department
        </h2>
        {chartData.length === 0 ? (
          <p className="text-slate-400 text-sm">No department data yet.</p>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count" fill="#2563eb" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
       <div className="bg-surface rounded-xl shadow-sm p-4 md:p-6 mb-8">
        <h2 className="text-lg font-display font-semibold text-ink mb-4">
          Products per Category
        </h2>
        {categoryCountData.length === 0 ? (
          <p className="text-muted text-sm">
            No product categories yet. Add products with a category to see this chart populate.
          </p>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categoryCountData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                {categoryCountData.map((entry, index) => (
                  <Cell key={entry.name} fill={CATEGORY_COLORS[index % CATEGORY_COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      <div className="bg-surface rounded-xl shadow-sm p-4 md:p-6 mb-8">
        <h2 className="text-lg font-display font-semibold text-ink mb-4">
          Stock Value per Category
        </h2>
        {categoryValueData.length === 0 ? (
          <p className="text-muted text-sm">
            No stock value data yet.
          </p>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categoryValueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
              <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                {categoryValueData.map((entry, index) => (
                  <Cell key={entry.name} fill={CATEGORY_COLORS[index % CATEGORY_COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
      {summary.lowStockProducts.length > 0 && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">
            Low Stock Alerts
          </h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-slate-500 border-b">
                <th className="pb-2">Product</th>
                <th className="pb-2">SKU</th>
                <th className="pb-2">Quantity</th>
              </tr>
            </thead>
            <tbody>
              {summary.lowStockProducts.map((p) => (
                <tr key={p.id} className="border-b last:border-0">
                  <td className="py-2">{p.name}</td>
                  <td className="py-2">{p.sku}</td>
                  <td className="py-2 text-red-600 font-medium">{p.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Layout>
  );
}

export default Dashboard;