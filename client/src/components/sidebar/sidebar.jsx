import { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-white min-h-[90vh] border-r-[1px]">
      <div className="w-[250px]">
        <div className="px-6 py-4">
          <ul className="space-y-1">
            <li className="p-2">
              <span onClick={() => setOpen(!open)} className="cursor-pointer">
                Promotion
              </span>
              <ul className={`${open ? "block" : "hidden"}`}>
                <li className="p-1">
                  <Link to={"/admin/promolist"}>Promo Codes</Link>
                </li>
                <li className="p-1">Add Promo Code</li>
              </ul>
            </li>
            <li className="p-2">
              <Link to={"/admin/orderlist"}>Orders</Link>
            </li>
            <li className="p-2">
              <Link to={"/admin/productlist"}>Products</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
