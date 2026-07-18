import { Navigate } from "react-router-dom";

function AdminHome() {
  return <Navigate to="/admin/dashboard" replace />;
}

export default AdminHome;