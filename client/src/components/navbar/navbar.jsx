/* eslint-disable no-empty-pattern */
import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { IoLogInOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setSearchName } from "../../redux/features/filter/filterSlice";
import { useGetUserQuery } from "../../redux/features/user/userApi";
const Navbar = () => {
  const { name } = useSelector((state) => state.filter);
  const { items } = useSelector((state) => state.cart);
  const { userData } = useSelector((state) => state.user);
  const [searchText, setSearchText] = useState(name);
  const dispatch = useDispatch();

  const {} = useGetUserQuery();
  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(setSearchName(searchText));
  };
  return (
    <nav className="bg-white">
      <div className="container mx-auto px-2 py-2">
        <div className="flex justify-between items-center text-lg">
          <Link to={"/"}>
            <svg
              id="logo-15"
              width="49"
              height="48"
              viewBox="0 0 49 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {" "}
              <path
                d="M24.5 12.75C24.5 18.9632 19.4632 24 13.25 24H2V12.75C2 6.53679 7.03679 1.5 13.25 1.5C19.4632 1.5 24.5 6.53679 24.5 12.75Z"
                className="ccustom"
                fill="#17CF97"
              ></path>{" "}
              <path
                d="M24.5 35.25C24.5 29.0368 29.5368 24 35.75 24H47V35.25C47 41.4632 41.9632 46.5 35.75 46.5C29.5368 46.5 24.5 41.4632 24.5 35.25Z"
                className="ccustom"
                fill="#17CF97"
              ></path>{" "}
              <path
                d="M2 35.25C2 41.4632 7.03679 46.5 13.25 46.5H24.5V35.25C24.5 29.0368 19.4632 24 13.25 24C7.03679 24 2 29.0368 2 35.25Z"
                className="ccustom"
                fill="#17CF97"
              ></path>{" "}
              <path
                d="M47 12.75C47 6.53679 41.9632 1.5 35.75 1.5H24.5V12.75C24.5 18.9632 29.5368 24 35.75 24C41.9632 24 47 18.9632 47 12.75Z"
                className="ccustom"
                fill="#17CF97"
              ></path>{" "}
            </svg>
          </Link>
          {/* search input */}
          <form onSubmit={handleSearch} onBlur={handleSearch}>
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                className="border-b border-gray-300 w-full py-2 pl-8 pr-4 focus:outline-none focus:border-blue-500"
                value={searchText}
                onChange={(e) => setSearchText(() => e.target.value)}
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <CiSearch className="text-gray-400" />
              </div>
            </div>
          </form>

          <div className="flex gap-4 items-center">
            <Link to={"/cart"} className="flex gap-1 items-center">
              <FiShoppingCart />
              <span>Cart</span>
              <span className="bg-[#fff700]  rounded-full h-6 w-6 flex justify-center items-center">
                {items?.length}
              </span>
            </Link>
            {userData?.phone && (
              <div>
                <FaRegUser />
              </div>
            )}

            {!userData?.phone && (
              <Link
                to={"/login"}
                className="flex gap-1 items-center cursor-pointer py-1 px-2 rounded-sm bg-slate-100"
              >
                <IoLogInOutline />
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
