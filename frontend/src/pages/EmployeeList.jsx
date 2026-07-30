import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import EmployeeFormModal from '../components/EmployeeFormModal';
import { useAuth } from '../context/AuthContext';
import {
  getEmployees,
  getDepartments,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from '../api/employeeApi';

function EmployeeList() {
  const { user } = useAuth();
  const isAdmin = user?.role === 'ADMIN';

  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [empRes, deptRes] = await Promise.all([getEmployees(), getDepartments()]);
      setEmployees(empRes.data);
      setDepartments(deptRes.data);
    } catch (err) {
      setError('Failed to load employees');
    }
  };

  const handleAdd = () => {
    setEditingEmployee(null);
    setModalOpen(true);
  };

  const handleEdit = (emp) => {
    const dept = departments.find((d) => d.name === emp.departmentName);
    setEditingEmployee({ ...emp, departmentId: dept?.id });
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this employee?')) return;
    try {
      await deleteEmployee(id);
      loadData();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete employee');
    }
  };

  const handleSubmit = async (formData) => {
    try {
      if (editingEmployee) {
        await updateEmployee(editingEmployee.id, formData);
      } else {
        await createEmployee(formData);
      }
      setModalOpen(false);
      loadData();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to save employee');
    }
  };

  const filteredEmployees = employees.filter((emp) =>
    emp.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Employees</h1>
        {isAdmin && (
          <button
            onClick={handleAdd}
            className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700"
          >
            + Add Employee
          </button>
        )}
      </div>

      <input
        type="text"
        placeholder="Search by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full max-w-sm border border-slate-300 rounded px-3 py-2 text-sm mb-4"
      />

      {error && <p className="text-red-600 mb-4">{error}</p>}

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left text-slate-500">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Department</th>
              <th className="px-4 py-3">Designation</th>
              <th className="px-4 py-3">Salary</th>
              <th className="px-4 py-3">Joining Date</th>
              {isAdmin && <th className="px-4 py-3">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.length === 0 ? (
              <tr>
                <td colSpan={isAdmin ? 6 : 5} className="px-4 py-6 text-center text-slate-400">
                  No employees found
                </td>
              </tr>
            ) : (
              filteredEmployees.map((emp) => (
                <tr key={emp.id} className="border-t border-slate-100">
                  <td className="px-4 py-3">{emp.name}</td>
                  <td className="px-4 py-3">{emp.departmentName}</td>
                  <td className="px-4 py-3">{emp.designation}</td>
                  <td className="px-4 py-3">₹{emp.salary?.toLocaleString()}</td>
                  <td className="px-4 py-3">{emp.joiningDate}</td>
                  {isAdmin && (
                    <td className="px-4 py-3 space-x-2">
                      <button
                        onClick={() => handleEdit(emp)}
                        className="text-blue-600 hover:underline text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(emp.id)}
                        className="text-red-600 hover:underline text-sm"
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

      <EmployeeFormModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        departments={departments}
        initialData={editingEmployee}
      />
    </Layout>
  );
}

export default EmployeeList;