import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../../services/dashboard/logout";

function SideBar() {
  const nav = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  //Auto sets active on NavLink, css styles inside
  const linkClass = ({ isActive }) =>
    isActive
      ? "text-gray-500 text-xl w-full p-3 rounded-md bg-gray-200 cursor-default"
      : "text-gray-500 text-xl hover:bg-blue-600 hover:text-white w-full p-3 rounded-md ";

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="relative">
      <div className="p-4 xxl:hidden">
        <button onClick={toggleSidebar} className="text-xl">
          <i className="fa-solid fa-bars"></i>
        </button>
      </div>

      <div
        className={`fixed top-0 left-0 h-screen w-64 bg-white shadow-md
          transform transition-transform duration-300 ease-in-out z-50
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          xxl:translate-x-0 xxl:relative xxl:block`}
      >
        <div className="flex flex-col h-full -z-10">
          <div>
            <div className="p-5 text-2xl flex items-center justify-between xxl:justify-start">
              <div className="flex items-center">
                <i
                  onClick={toggleSidebar}
                  className="fa-solid fa-bars cursor-pointer"
                ></i>
                <NavLink to="/dashboard">
                  <span className="pl-5">SnapRead</span>
                </NavLink>
              </div>

              <button onClick={toggleSidebar} className="text-xl xxl:hidden">
                <i className="fa-solid fa-times"></i>
              </button>
            </div>

            <div className="flex flex-col m-2 p-2 gap-3">
              <NavLink className={linkClass} to="/invoices">
                <div>
                  <i className="fa-solid fa-file-invoice-dollar"></i>
                  <span className="pl-5">Invoice</span>
                </div>
              </NavLink>
              <NavLink className={linkClass} to="/home">
                <div>
                  <i className="fa-solid fa-house"></i>
                  <span className="pl-5">Home</span>
                </div>
              </NavLink>
              <NavLink className={linkClass} to="/car">
                <div>
                  <i className="fa-solid fa-car"></i>
                  <span className="pl-5">Car</span>
                </div>
              </NavLink>
              <NavLink className={linkClass} to="/subscription">
                <div>
                  <i className="fa-regular fa-credit-card"></i>
                  <span className="pl-5">Subscription</span>
                </div>
              </NavLink>
              <NavLink className={linkClass} to="/receipt">
                <div>
                  <i className="fa-solid fa-receipt"></i>
                  <span className="pl-5">Receipt</span>
                </div>
              </NavLink>
              <NavLink className={linkClass} to="/shopping-list">
                <div>
                  <i className="fa-solid fa-carrot"></i>
                  <span className="pl-5">Shopping list</span>
                </div>
              </NavLink>
            </div>
          </div>

          <div className="m-2 p-2 gap-3 mt-auto flex flex-col">
            <div className="text-gray-500 text-xl hover:bg-blue-600 hover:text-white w-full p-3 rounded-md">
              <i className="fa-solid fa-gear"></i>
              <span className="pl-5">Settings</span>
            </div>
            <div className="text-gray-500 text-xl hover:bg-blue-600 hover:text-white w-full p-3 rounded-md">
              <i className="fa-solid fa-right-from-bracket"></i>
              <button onClick={() => logout(nav)} className="pl-5">
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40 xxl:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
}

export default SideBar;
