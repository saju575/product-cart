import { createBrowserRouter } from "react-router-dom";
import AdminLayout from "../layout/adminLayout";
import ClientLayout from "../layout/clientLayout";
import AdminLogin from "../pages/admin/adminLogin";
import OrderList from "../pages/admin/subpage/orderlist";
import ProductList from "../pages/admin/subpage/productList";
import PromoList from "../pages/admin/subpage/promoList";
import Cart from "../pages/cart";
import Home from "../pages/home";
import Login from "../pages/login";
import Signup from "../pages/signup";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <ClientLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/adminlogin",
    element: <AdminLogin />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        path: "/admin",
        element: <div className="min-h-[90vh]" />,
      },
      {
        path: "/admin/promolist",
        element: <PromoList />,
      },
      {
        path: "/admin/orderlist",
        element: <OrderList />,
      },
      {
        path: "/admin/productlist",
        element: <ProductList />,
      },
    ],
  },
]);
