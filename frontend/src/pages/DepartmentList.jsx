import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import DepartmentFormModal from '../components/DepartmentFormModal';
import { useAuth } from '../context/AuthContext';
import {
  getDepartments,
  createDepartment,
  updateDepartment,
  deleteDepartment,
} from '../api/departmentApi';

function DepartmentList() {
  const { user } = useAuth();
  const isAdmin = user?.role === 'ADMIN';

  const [departments, setDepartments] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingDept, setEditingDept] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    loadDepartments();
  }, []);

  const loadDepartments = async () => {
    try {
      const res = await getDepartments();
      setDepartments(res.data);
    } catch (err) {
      setError('Failed to load departments');
    }
  };

  const handleAdd = () => {
    setEditingDept(null);
    setModalOpen(true);
  };

  const handleEdit = (dept) => {
    setEditingDept(dept);
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this department? Employees assigned to it will be affected.')) return;
    try {
      await deleteDepartment(id);
      loadDepartments();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete department');
    }
  };

  const handleSubmit = async (formData) => {
    try {
      if (editingDept) {
        await updateDepartment(editingDept.id, formData);
      } else {
        await createDepartment(formData);
      }
      setModalOpen(false);
      loadDepartments();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to save department');
    }
  };

  return (
    <Layout>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6">
        <div>
          <h1 className="text-2xl font-display font-bold text-ink">Departments</h1>
          <p className="text-muted text-sm">{departments.length} total</p>
        </div>
        {isAdmin && (
          <button
            onClick={handleAdd}
            className="bg-brand text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-brand-dark transition-colors shrink-0"
          >
            + Add Department
          </button>
        )}
      </div>

      {error && <p className="text-danger mb-4">{error}</p>}

      <div className="bg-surface rounded-xl shadow-sm overflow-x-auto">
        <table className="w-full text-sm min-w-[400px]">
          <thead className="bg-bg text-left text-muted text-xs uppercase tracking-wide">
            <tr>
              <th className="px-4 py-3">Name</th>
              {isAdmin && <th className="px-4 py-3">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {departments.length === 0 ? (
              <tr>
                <td colSpan={isAdmin ? 2 : 1} className="px-4 py-10 text-center text-muted">
                  No departments yet. Add your first one to start assigning employees.
                </td>
              </tr>
            ) : (
              departments.map((dept) => (
                <tr key={dept.id} className="border-t border-slate-100">
                  <td className="px-4 py-3">{dept.name}</td>
                  {isAdmin && (
                    <td className="px-4 py-3 space-x-3">
                      <button
                        onClick={() => handleEdit(dept)}
                        className="text-brand hover:text-brand-dark font-medium text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(dept.id)}
                        className="text-danger hover:text-red-800 font-medium text-sm"
                      >
                        Delete
                      </button>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <DepartmentFormModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        initialData={editingDept}
      />
    </Layout>
  );
}

export default DepartmentList;