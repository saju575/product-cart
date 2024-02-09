/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AdminRouteProtect = ({ children }) => {
  const { userData } = useSelector((state) => state.user);

  if (userData?.role !== "admin") {
    return <Navigate to="/adminlogin" />;
  } else {
    return children;
  }
};

export default AdminRouteProtect;
