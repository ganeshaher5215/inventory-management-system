import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import StockTransactionFormModal from '../components/StockTransactionFormModal';
import { useAuth } from '../context/AuthContext';
import { getAllTransactions, createTransaction } from '../api/stockTransactionApi';
import { getProducts } from '../api/productApi';

function StockTransactionList() {
  const { user } = useAuth();
  const canLog = user?.role === 'ADMIN' || user?.role === 'MANAGER';

  const [transactions, setTransactions] = useState([]);
  const [products, setProducts] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState('');
  const [formError, setFormError] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [txRes, prodRes] = await Promise.all([getAllTransactions(), getProducts()]);
      setTransactions(txRes.data.slice().reverse()); // newest first
      setProducts(prodRes.data);
    } catch (err) {
      setError('Failed to load stock transactions');
    }
  };

  const handleSubmit = async (formData) => {
    setFormError('');
    try {
      await createTransaction(formData);
      setModalOpen(false);
      loadData();
    } catch (err) {
      // Insufficient stock errors surface here — show inline instead of a silent alert
      setFormError(err.response?.data?.message || 'Failed to log transaction');
    }
  };

  return (
    <Layout>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6">
        <div>
          <h1 className="text-2xl font-display font-bold text-ink">Stock Transactions</h1>
          <p className="text-muted text-sm">History of all stock movements</p>
        </div>
        {canLog && (
          <button
            onClick={() => {
              setFormError('');
              setModalOpen(true);
            }}
            className="bg-brand text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-brand-dark transition-colors shrink-0"
          >
            + Log Transaction
          </button>
        )}
      </div>

      {error && <p className="text-danger mb-4">{error}</p>}
      {formError && (
        <div className="bg-alert-bg text-alert text-sm p-3 rounded-lg mb-4">
          {formError}
        </div>
      )}

      <div className="bg-surface rounded-xl shadow-sm overflow-x-auto">
        <table className="w-full text-sm min-w-[640px]">
          <thead className="bg-bg text-left text-muted text-xs uppercase tracking-wide">
            <tr>
              <th className="px-4 py-3">Product</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Quantity</th>
              <th className="px-4 py-3">Resulting Qty</th>
              <th className="px-4 py-3">Performed By</th>
              <th className="px-4 py-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-10 text-center text-muted">
                  No stock transactions logged yet.
                </td>
              </tr>
            ) : (
              transactions.map((tx) => (
                <tr key={tx.id} className="border-t border-slate-100">
                  <td className="px-4 py-3">{tx.productName}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                        tx.type === 'IN'
                          ? 'bg-brand/15 text-brand'
                          : 'bg-alert-bg text-alert'
                      }`}
                    >
                      {tx.type}
                    </span>
                  </td>
                  <td className="px-4 py-3">{tx.quantity}</td>
                  <td className="px-4 py-3 font-medium">{tx.resultingProductQuantity}</td>
                  <td className="px-4 py-3">{tx.performedBy || '—'}</td>
                  <td className="px-4 py-3 text-muted">
                    {new Date(tx.date).toLocaleString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <StockTransactionFormModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        products={products}
      />
    </Layout>
  );
}

export default StockTransactionList;