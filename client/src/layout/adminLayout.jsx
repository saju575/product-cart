import Sidebar from "../components/sidebar/sidebar";
import Topbar from "../components/topbar/topbar";
import PromoList from "../pages/admin/subpage/promoList";

const AdminLayout = () => {
  return (
    <div>
      <Topbar />
      <div className="flex">
        <Sidebar />
        <div style={{ width: "calc(100% - 250px)" }}>
          {/* <OrderList /> */}
          {/* <ProductList /> */}
          <PromoList />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
