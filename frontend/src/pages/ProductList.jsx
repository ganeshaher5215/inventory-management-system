import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import ProductFormModal from '../components/ProductFormModal';
import { useAuth } from '../context/AuthContext';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../api/productApi';

function ProductList() {
  const { user } = useAuth();
  const canEdit = user?.role === 'ADMIN' || user?.role === 'MANAGER';
  const isAdmin = user?.role === 'ADMIN';

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const res = await getProducts();
      setProducts(res.data);
    } catch (err) {
      setError('Failed to load products');
    }
  };

  const handleAdd = () => {
    setEditingProduct(null);
    setModalOpen(true);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    try {
      await deleteProduct(id);
      loadProducts();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete product');
    }
  };

  const handleSubmit = async (formData) => {
    try {
      if (editingProduct) {
        await updateProduct(editingProduct.id, formData);
      } else {
        await createProduct(formData);
      }
      setModalOpen(false);
      loadProducts();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to save product');
    }
  };

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Products</h1>
        {canEdit && (
          <button
            onClick={handleAdd}
            className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700"
          >
            + Add Product
          </button>
        )}
      </div>

      <input
        type="text"
        placeholder="Search by name or SKU..."
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
              <th className="px-4 py-3">SKU</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Quantity</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Supplier</th>
              {canEdit && <th className="px-4 py-3">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length === 0 ? (
              <tr>
                <td colSpan={canEdit ? 7 : 6} className="px-4 py-6 text-center text-slate-400">
                  No products found
                </td>
              </tr>
            ) : (
              filteredProducts.map((p) => (
                <tr key={p.id} className="border-t border-slate-100">
                  <td className="px-4 py-3">{p.name}</td>
                  <td className="px-4 py-3">{p.sku}</td>
                  <td className="px-4 py-3">{p.category}</td>
                  <td className={`px-4 py-3 ${p.quantity < 10 ? 'text-red-600 font-medium' : ''}`}>
                    {p.quantity}
                  </td>
                  <td className="px-4 py-3">₹{p.price?.toLocaleString()}</td>
                  <td className="px-4 py-3">{p.supplierName}</td>
                  {canEdit && (
                    <td className="px-4 py-3 space-x-2">
                      <button
                        onClick={() => handleEdit(p)}
                        className="text-blue-600 hover:underline text-sm"
                      >
                        Edit
                      </button>
                      {isAdmin && (
                        <button
                          onClick={() => handleDelete(p.id)}
                          className="text-red-600 hover:underline text-sm"
                        >
                          Delete
                        </button>
                      )}
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <ProductFormModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        initialData={editingProduct}
      />
    </Layout>
  );
}

export default ProductList;