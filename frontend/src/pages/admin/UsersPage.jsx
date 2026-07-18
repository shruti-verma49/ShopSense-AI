import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import toast from "react-hot-toast";
import AdminLayout from "../../components/admin/AdminLayout";
import { getAdminUsersApi } from "../../services/adminService";

function UsersPage() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const loadUsers = async () => {
    setIsLoading(true);
    try {
      const response = await getAdminUsersApi({ search, page, limit: 10 });
      setUsers(response.data.users);
      setTotalPages(response.data.totalPages || 1);
    } catch (error) {
      toast.error("Could not load users");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    loadUsers();
  };

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Users</h1>

      <form onSubmit={handleSearch} className="mt-6 flex gap-2 max-w-md">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or email..."
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white outline-none focus:border-[#6D5DF6]"
          />
        </div>
        <button type="submit" className="px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 font-medium">Search</button>
      </form>

      <div className="mt-6 overflow-x-auto">
        {isLoading ? (
          <p className="text-gray-400 text-sm">Loading users...</p>
        ) : users.length === 0 ? (
          <p className="text-gray-400 text-sm">No users found.</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
                <th className="py-2 pr-4">Name</th>
                <th className="py-2 pr-4">Email</th>
                <th className="py-2 pr-4">Role</th>
                <th className="py-2 pr-4">Join Date</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="border-b border-gray-100 dark:border-gray-800">
                  <td className="py-3 pr-4 text-gray-900 dark:text-white">{user.name}</td>
                  <td className="py-3 pr-4 text-gray-600 dark:text-gray-300">{user.email}</td>
                  <td className="py-3 pr-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${user.role === "admin" ? "bg-[#6D5DF6]/10 text-[#6D5DF6]" : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="py-3 pr-4 text-gray-600 dark:text-gray-300">
                    {new Date(user.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
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

export default UsersPage;