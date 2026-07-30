import { useState, useEffect } from 'react';

function StockTransactionFormModal({ isOpen, onClose, onSubmit, products }) {
  const [form, setForm] = useState({
    productId: '',
    type: 'IN',
    quantity: '',
    performedBy: '',
  });

  useEffect(() => {
    if (isOpen) {
      setForm({ productId: '', type: 'IN', quantity: '', performedBy: '' });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const selectedProduct = products.find((p) => p.id === Number(form.productId));

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...form,
      productId: Number(form.productId),
      quantity: Number(form.quantity),
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-surface rounded-xl shadow-lg p-5 md:p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <h2 className="text-lg font-display font-semibold text-ink mb-4">
          Log Stock Transaction
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-slate-600 mb-1">Product</label>
            <select
              name="productId"
              value={form.productId}
              onChange={handleChange}
              required
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand/40 focus:border-brand"
            >
              <option value="">Select product</option>
              {products.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} (current: {p.quantity})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm text-slate-600 mb-2">Transaction Type</label>
            <div className="flex gap-3">
              <label className="flex-1">
                <input
                  type="radio"
                  name="type"
                  value="IN"
                  checked={form.type === 'IN'}
                  onChange={handleChange}
                  className="sr-only peer"
                />
                <div className="peer-checked:bg-brand peer-checked:text-white peer-checked:border-brand border border-slate-300 rounded-lg px-3 py-2 text-sm text-center font-medium cursor-pointer transition-colors">
                  Stock IN
                </div>
              </label>
              <label className="flex-1">
                <input
                  type="radio"
                  name="type"
                  value="OUT"
                  checked={form.type === 'OUT'}
                  onChange={handleChange}
                  className="sr-only peer"
                />
                <div className="peer-checked:bg-alert peer-checked:text-white peer-checked:border-alert border border-slate-300 rounded-lg px-3 py-2 text-sm text-center font-medium cursor-pointer transition-colors">
                  Stock OUT
                </div>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm text-slate-600 mb-1">Quantity</label>
            <input
              name="quantity"
              type="number"
              min="1"
              value={form.quantity}
              onChange={handleChange}
              required
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand/40 focus:border-brand"
            />
            {selectedProduct && form.type === 'OUT' && (
              <p className="text-xs text-muted mt-1">
                Available: {selectedProduct.quantity}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm text-slate-600 mb-1">Performed By</label>
            <input
              name="performedBy"
              value={form.performedBy}
              onChange={handleChange}
              placeholder="Your name"
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand/40 focus:border-brand"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm rounded-lg bg-brand text-white font-medium hover:bg-brand-dark transition-colors"
            >
              Log Transaction
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default StockTransactionFormModal;