import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('EMPLOYEE');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await register(username, password, role);
      setSuccess(true);
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      setError(err.response?.data || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid place-items-center bg-bg p-4">
  <div className="bg-surface p-6 md:p-8 rounded-xl shadow-md w-full max-w-sm">
    <h1 className="text-2xl font-display font-bold text-ink mb-6 text-center">
          Create Account
        </h1>

        {error && (
          <div className="bg-red-100 text-red-700 text-sm p-3 rounded mb-4">
            {String(error)}
          </div>
        )}

        {success && (
          <div className="bg-green-100 text-green-700 text-sm p-3 rounded mb-4">
            Registered successfully! Redirecting to login...
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full border border-slate-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border border-slate-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Role
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full border border-slate-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="EMPLOYEE">Employee</option>
              <option value="MANAGER">Manager</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
           className="w-full bg-blue-600 text-white py-2 rounded font-medium hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Creating account...' : 'Register'}
          </button>
        </form>

        <p className="text-sm text-slate-600 text-center mt-4">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;