import { useState, useEffect } from 'react';

function DepartmentFormModal({ isOpen, onClose, onSubmit, initialData }) {
  const [name, setName] = useState('');

  useEffect(() => {
    setName(initialData?.name || '');
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-surface rounded-xl shadow-lg p-5 md:p-6 w-full max-w-sm">
        <h2 className="text-lg font-display font-semibold text-ink mb-4">
          {initialData ? 'Edit Department' : 'Add Department'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-slate-600 mb-1">Department Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoFocus
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
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default DepartmentFormModal;