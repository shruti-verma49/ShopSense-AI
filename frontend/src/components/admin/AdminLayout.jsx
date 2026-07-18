import AdminSidebar from "./AdminSidebar";

function AdminLayout({ children }) {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-[calc(100vh-64px)] transition-colors duration-300">
      <div className="flex flex-col md:flex-row">
        <AdminSidebar />
        <main className="flex-1 p-6 md:p-10">{children}</main>
      </div>
    </div>
  );
}

export default AdminLayout;