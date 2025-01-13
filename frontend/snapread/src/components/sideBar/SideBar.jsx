import { useNavigate, Link } from 'react-router-dom';
import { logout } from '../../services/dashboard/logout';

function SideBar() {
  const nav = useNavigate();
  return (
    <div className="w-72 font-bold text-gray-800 p-3 rounded-r-lg flex flex-col h-full">
      <div className="p-5 text-2xl">
        <i className="fa-solid fa-bars"></i>
        <span className="pl-5">SnapRead</span>
      </div>

      <div className="flex flex-col m-2 p-2 gap-3">
        <Link to={'/invoices'}>
          <div className="text-gray-500 text-xl hover:bg-blue-600 hover:text-white w-full h-full p-3 rounded-md">
            <i className="fa-solid fa-file-invoice-dollar"></i>
            <span className="pl-5">Invoice</span>
          </div>
        </Link>
        <div className="text-gray-500 text-xl hover:bg-blue-600 hover:text-white w-full h-full p-3 rounded-md">
          <i className="fa-solid fa-house"></i>
          <span className="pl-5">Home</span>
        </div>
        <div className="text-gray-500 text-xl hover:bg-blue-600 hover:text-white w-full h-full p-3 rounded-md">
          <i className="fa-solid fa-car"></i>
          <span className="pl-5">Car</span>
        </div>
        <div className="text-gray-500 text-xl hover:bg-blue-600 hover:text-white w-full h-full p-3 rounded-md">
          <i className="fa-regular fa-credit-card"></i>
          <span className="pl-5">Subscription</span>
        </div>
        <div className="text-gray-500 text-xl hover:bg-blue-600 hover:text-white w-full h-full p-3 rounded-md">
          <i className="fa-solid fa-receipt"></i>
          <span className="pl-5">Receipt</span>
        </div>
        <div className="text-gray-500 text-xl hover:bg-blue-600 hover:text-white w-full h-full p-3 rounded-md">
          <i className="fa-solid fa-carrot"></i>
          <span className="pl-5">Shopping list</span>
        </div>
      </div>

      <div className="flex flex-col m-2 p-2 gap-3 mt-auto">
        <div className="text-gray-500 text-xl hover:bg-blue-600 hover:text-white w-full h-full p-3 rounded-md">
          <i className="fa-solid fa-gear"></i>
          <span className="pl-5">Settings</span>
        </div>
        <div className="text-gray-500 text-xl hover:bg-blue-600 hover:text-white w-full h-full p-3 rounded-md">
          <i className="fa-solid fa-right-from-bracket"></i>
          <button onClick={() => logout(nav)} className="pl-5">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
