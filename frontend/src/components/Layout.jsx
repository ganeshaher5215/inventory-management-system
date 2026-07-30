import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ROLE_STYLES = {
  ADMIN: 'bg-brand/20 text-brand',
  MANAGER: 'bg-alert-bg text-alert',
  EMPLOYEE: 'bg-slate-200 text-slate-600',
};

function RoleBadge({ role }) {
  return (
    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${ROLE_STYLES[role] || ROLE_STYLES.EMPLOYEE}`}>
      {role}
    </span>
  );
}

function Layout({ children }) {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
  { path: '/dashboard', label: 'Dashboard' },
  { path: '/departments', label: 'Departments' },
  { path: '/employees', label: 'Employees' },
  { path: '/products', label: 'Products' },
  { path: '/stock-transactions', label: 'Stock Log' },
];

  const isActive = (path) => location.pathname === path;

  const SidebarContent = () => (
    <>
      <div className="p-5 text-lg font-display font-bold border-b border-white/10">
        Inventory System
      </div>
      <nav className="flex-1 p-3 space-y-1">
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            onClick={() => setMobileOpen(false)}
            className={`block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              isActive(link.path)
                ? 'bg-brand text-white'
                : 'text-slate-300 hover:bg-white/10 hover:text-white'
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
      <div className="p-4 border-t border-white/10 space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-sm text-slate-200 font-medium truncate">{user?.username}</p>
          <RoleBadge role={user?.role} />
        </div>
        <button
          onClick={logout}
          className="w-full bg-danger/90 hover:bg-danger text-white text-sm font-medium py-2 rounded-lg transition-colors"
        >
          Logout
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-bg flex">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex md:w-60 bg-ink text-white flex-col fixed inset-y-0">
        <SidebarContent />
      </aside>

      {/* Mobile sidebar (slide-out) */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-40 flex">
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="relative w-64 bg-ink text-white flex flex-col z-50">
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 inset-x-0 h-14 bg-ink text-white flex items-center justify-between px-4 z-30">
        <span className="font-display font-bold">Inventory System</span>
        <button
          onClick={() => setMobileOpen(true)}
          className="p-2 rounded hover:bg-white/10"
          aria-label="Open menu"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </div>

      <main className="flex-1 md:ml-60 pt-14 md:pt-0 p-4 md:p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}

export default Layout;