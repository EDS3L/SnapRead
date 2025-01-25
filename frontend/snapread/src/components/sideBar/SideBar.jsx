import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../services/dashboard/logout';

function SideBar() {
  const nav = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  const URLENDS = {
    INVOICES: '/invoices',
    HOME: '/home',
    CAR: '/car',
    SUBSCRIPTION: '/subscription',
  }


  return (
    <div className="relative">
      <div className="p-4 xxl:hidden">
        <button onClick={toggleSidebar} className="text-xl">
          <i  className="fa-solid fa-bars"></i>
        </button>
      </div>

      <div
        className={`fixed top-0 left-0 h-screen w-64 bg-white shadow-md
          transform transition-transform duration-300 ease-in-out z-50
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          xxl:translate-x-0 xxl:relative xxl:block
        `}
      >
        <div className="flex flex-col h-full -z-10">
          <div>
            <div className="p-5 text-2xl flex items-center justify-between xxl:justify-start">
              <div  className="flex items-center">
                <i onClick={toggleSidebar} className="fa-solid fa-bars cursor-pointer"></i>
                <Link to="/dashboard">
                <span className="pl-5">SnapRead</span>
                </Link>
              </div>

              <button onClick={toggleSidebar} className="text-xl xxl:hidden">
                <i className="fa-solid fa-times"></i>
              </button>
            </div>

            <div className="flex flex-col m-2 p-2 gap-3">
              <Link to="/invoices">
                <div className={window.location.pathname == URLENDS.INVOICES ? "text-gray-500 text-xl w-full p-3 rounded-md bg-gray-200 cursor-default": 'text-gray-500 text-xl hover:bg-blue-600 hover:text-white w-full p-3 rounded-md '}>
                  <i className="fa-solid fa-file-invoice-dollar"></i>
                  <span className='pl-5' >Invoice</span>
                </div>
              </Link>
              <Link to="/home">
              <div className={window.location.pathname == URLENDS.HOME ? "text-gray-500 text-xl w-full p-3 rounded-md bg-gray-200 cursor-default": 'text-gray-500 text-xl hover:bg-blue-600 hover:text-white w-full p-3 rounded-md '}>
              <i className="fa-solid fa-house"></i>
                  <span className="pl-5">Home</span>
                </div>
              </Link>
              <Link to="/car">
              <div className={window.location.pathname == URLENDS.CAR ? "text-gray-500 text-xl w-full p-3 rounded-md bg-gray-200 cursor-default": 'text-gray-500 text-xl hover:bg-blue-600 hover:text-white w-full p-3 rounded-md '}>
              <i className="fa-solid fa-car"></i>
                  <span className="pl-5">Car</span>
                </div>
              </Link>
              <Link to="/subscription">
              <div className={window.location.pathname == URLENDS.SUBSCRIPTION ? "text-gray-500 text-xl w-full p-3 rounded-md bg-gray-200 cursor-default": 'text-gray-500 text-xl hover:bg-blue-600 hover:text-white w-full p-3 rounded-md '}>
              <i className="fa-regular fa-credit-card"></i>
                  <span className="pl-5">Subscription</span>
                </div>
              </Link>
              <Link to="/receipt">
                <div className="text-gray-500 text-xl hover:bg-blue-600 hover:text-white w-full p-3 rounded-md">
                  <i className="fa-solid fa-receipt"></i>
                  <span className="pl-5">Receipt</span>
                </div>
              </Link>
              <Link to="/shopping-list">
                <div className="text-gray-500 text-xl hover:bg-blue-600 hover:text-white w-full p-3 rounded-md">
                  <i className="fa-solid fa-carrot"></i>
                  <span className="pl-5">Shopping list</span>
                </div>
              </Link>
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
          className="fixed inset-0 bg-black bg-opacity-30 xxl:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
}

export default SideBar;
