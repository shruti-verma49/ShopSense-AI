import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import toast from "react-hot-toast";
import AdminLayout from "../../components/admin/AdminLayout";
import { getAdminProductsApi, createProductApi, updateProductApi, deleteProductApi } from "../../services/adminService";

const emptyForm = { title: "", description: "", price: "", category: "", image: "", rating: "", stock: "" };

function Products() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState(emptyForm);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadProducts = async () => {
    setIsLoading(true);
    try {
      const response = await getAdminProductsApi({ search, page, limit: 10 });
      setProducts(response.data.products);
      setTotalPages(response.data.totalPages || 1);
    } catch (error) {
      toast.error("Could not load products");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    loadProducts();
  };

  const handleAdd = () => {
    setEditingProduct(null);
    setFormData(emptyForm);
    setIsFormOpen(true);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      title: product.title,
      description: product.description,
      price: product.price,
      category: product.category,
      image: product.image || "",
      rating: product.rating || "",
      stock: product.stock,
    });
    setIsFormOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      await deleteProductApi(id);
      toast.success("Product deleted");
      loadProducts();
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not delete product");
    }
  };

  const handleFormChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const payload = {
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock),
        rating: Number(formData.rating) || 0,
      };
      if (editingProduct) {
        await updateProductApi(editingProduct._id, payload);
        toast.success("Product updated");
      } else {
        await createProductApi(payload);
        toast.success("Product created");
      }
      setIsFormOpen(false);
      loadProducts();
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not save product");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = "w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white outline-none focus:border-[#6D5DF6]";

  return (
    <AdminLayout>
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Products</h1>
        <button onClick={handleAdd} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#6D5DF6] text-white font-medium hover:bg-[#5b4de0] transition-all duration-200">
          <Plus size={16} />
          Add Product
        </button>
      </div>

      <form onSubmit={handleSearch} className="mt-6 flex gap-2 max-w-md">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white outline-none focus:border-[#6D5DF6]"
          />
        </div>
        <button type="submit" className="px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 font-medium">Search</button>
      </form>

      {isFormOpen && (
        <form onSubmit={handleFormSubmit} className="mt-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 space-y-4 max-w-2xl">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{editingProduct ? "Edit Product" : "Add Product"}</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <input name="title" value={formData.title} onChange={handleFormChange} placeholder="Title" required className={inputClass} />
            <input name="category" value={formData.category} onChange={handleFormChange} placeholder="Category" required className={inputClass} />
          </div>
          <textarea name="description" value={formData.description} onChange={handleFormChange} placeholder="Description" required className={inputClass} rows={3} />
          <div className="grid sm:grid-cols-3 gap-4">
            <input name="price" type="number" value={formData.price} onChange={handleFormChange} placeholder="Price" required className={inputClass} />
            <input name="stock" type="number" value={formData.stock} onChange={handleFormChange} placeholder="Stock" required className={inputClass} />
            <input name="rating" type="number" step="0.1" value={formData.rating} onChange={handleFormChange} placeholder="Rating" className={inputClass} />
          </div>
          <input name="image" value={formData.image} onChange={handleFormChange} placeholder="Image URL (optional)" className={inputClass} />
          <div className="flex gap-3">
            <button type="submit" disabled={isSubmitting} className="px-6 py-2.5 rounded-xl bg-[#6D5DF6] text-white font-medium disabled:opacity-60">
              {isSubmitting ? "Saving..." : "Save"}
            </button>
            <button type="button" onClick={() => setIsFormOpen(false)} className="px-6 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 font-medium">
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="mt-6 overflow-x-auto">
        {isLoading ? (
          <p className="text-gray-400 text-sm">Loading products...</p>
        ) : products.length === 0 ? (
          <p className="text-gray-400 text-sm">No products found.</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
                <th className="py-2 pr-4">Title</th>
                <th className="py-2 pr-4">Category</th>
                <th className="py-2 pr-4">Price</th>
                <th className="py-2 pr-4">Stock</th>
                <th className="py-2 pr-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id} className="border-b border-gray-100 dark:border-gray-800">
                  <td className="py-3 pr-4 text-gray-900 dark:text-white">{product.title}</td>
                  <td className="py-3 pr-4 text-gray-600 dark:text-gray-300">{product.category}</td>
                  <td className="py-3 pr-4 text-gray-600 dark:text-gray-300">₹{product.price}</td>
                  <td className="py-3 pr-4 text-gray-600 dark:text-gray-300">{product.stock}</td>
                  <td className="py-3 pr-4">
                    <div className="flex gap-2">
                      <button onClick={() => handleEdit(product)} className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-[#6D5DF6]">
                        <Pencil size={16} />
                      </button>
                      <button onClick={() => handleDelete(product._id)} className="p-2 rounded-lg text-gray-500 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-500">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {totalPages > 1 && (
        <div className="mt-6 flex items-center gap-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`w-8 h-8 rounded-lg text-sm font-medium ${page === i + 1 ? "bg-[#6D5DF6] text-white" : "border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300"}`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </AdminLayout>
  );
}

export default Products;