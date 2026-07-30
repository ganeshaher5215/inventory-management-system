import { useState, useEffect } from 'react';

function EmployeeFormModal({ isOpen, onClose, onSubmit, departments, initialData }) {
  const [form, setForm] = useState({
    name: '',
    departmentId: '',
    designation: '',
    salary: '',
    joiningDate: '',
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name || '',
        departmentId: initialData.departmentId || '',
        designation: initialData.designation || '',
        salary: initialData.salary || '',
        joiningDate: initialData.joiningDate || '',
      });
    } else {
      setForm({ name: '', departmentId: '', designation: '', salary: '', joiningDate: '' });
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
      departmentId: Number(form.departmentId),
      salary: Number(form.salary),
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
  <div className="bg-surface rounded-xl shadow-lg p-5 md:p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <h2 className="text-lg font-semibold text-slate-800 mb-4">
          {initialData ? 'Edit Employee' : 'Add Employee'}
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
            <label className="block text-sm text-slate-600 mb-1">Department</label>
            <select
              name="departmentId"
              value={form.departmentId}
              onChange={handleChange}
              required
              className="w-full border border-slate-300 rounded px-3 py-2 text-sm"
            >
              <option value="">Select department</option>
              {departments.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm text-slate-600 mb-1">Designation</label>
            <input
              name="designation"
              value={form.designation}
              onChange={handleChange}
              className="w-full border border-slate-300 rounded px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-600 mb-1">Salary</label>
            <input
              name="salary"
              type="number"
              value={form.salary}
              onChange={handleChange}
              required
              className="w-full border border-slate-300 rounded px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-600 mb-1">Joining Date</label>
            <input
              name="joiningDate"
              type="date"
              value={form.joiningDate}
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

export default EmployeeFormModal;