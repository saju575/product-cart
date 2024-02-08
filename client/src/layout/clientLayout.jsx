import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/navbar";

const ClientLayout = () => {
  return (
    <div className="bg-[#fafafa] min-h-screen">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default ClientLayout;
