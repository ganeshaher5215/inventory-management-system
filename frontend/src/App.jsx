import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import EmployeeList from './pages/EmployeeList';
import ProductList from './pages/ProductList';
import DepartmentList from './pages/DepartmentList';
import StockTransactionList from './pages/StockTransactionList';


function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/employees"
            element={
              <ProtectedRoute>
                <EmployeeList />
              </ProtectedRoute>
            }
          />

<Route
  path="/departments"
  element={
    <ProtectedRoute>
      <DepartmentList />
    </ProtectedRoute>
  }
/>
<Route
  path="/stock-transactions"
  element={
    <ProtectedRoute>
      <StockTransactionList />
    </ProtectedRoute>
  }
/>
          <Route
            path="/products"
            element={
              <ProtectedRoute>
                <ProductList />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;