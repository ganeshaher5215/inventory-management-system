import { useState, useEffect } from 'react';

function ProductFormModal({ isOpen, onClose, onSubmit, initialData }) {
  const [form, setForm] = useState({
    name: '',
    sku: '',
    category: '',
    quantity: '',
    price: '',
    supplierName: '',
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name || '',
        sku: initialData.sku || '',
        category: initialData.category || '',
        quantity: initialData.quantity ?? '',
        price: initialData.price ?? '',
        supplierName: initialData.supplierName || '',
      });
    } else {
      setForm({ name: '', sku: '', category: '', quantity: '', price: '', supplierName: '' });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...form,
      quantity: Number(form.quantity),
      price: Number(form.price),
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
  <div className="bg-surface rounded-xl shadow-lg p-5 md:p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <h2 className="text-lg font-semibold text-slate-800 mb-4">
          {initialData ? 'Edit Product' : 'Add Product'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-sm text-slate-600 mb-1">Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full border border-slate-300 rounded px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-600 mb-1">SKU</label>
            <input
              name="sku"
              value={form.sku}
              onChange={handleChange}
              required
              disabled={!!initialData}
              className="w-full border border-slate-300 rounded px-3 py-2 text-sm disabled:bg-slate-100"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-600 mb-1">Category</label>
            <input
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full border border-slate-300 rounded px-3 py-2 text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm text-slate-600 mb-1">Quantity</label>
              <input
                name="quantity"
                type="number"
                value={form.quantity}
                onChange={handleChange}
                required
                className="w-full border border-slate-300 rounded px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-600 mb-1">Price</label>
              <input
                name="price"
                type="number"
                value={form.price}
                onChange={handleChange}
                required
                className="w-full border border-slate-300 rounded px-3 py-2 text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-slate-600 mb-1">Supplier</label>
            <input
              name="supplierName"
              value={form.supplierName}
              onChange={handleChange}
              className="w-full border border-slate-300 rounded px-3 py-2 text-sm"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm rounded border border-slate-300 text-slate-600 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm rounded bg-blue-600 text-white hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProductFormModal;