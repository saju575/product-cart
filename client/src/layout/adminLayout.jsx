import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar/sidebar";
import Topbar from "../components/topbar/topbar";

const AdminLayout = () => {
  return (
    <div className="bg-[#fafafa]">
      <Topbar />
      <div className="flex">
        <Sidebar />
        <div style={{ width: "calc(100% - 250px)" }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
