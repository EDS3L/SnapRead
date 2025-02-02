import Invoice from "../../components/invoice/Invoice";
import SideBar from "../../components/sideBar/SideBar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function InvoiceLayout() {
  return (
    <div className="flex h-screen">
      <SideBar />
      <Invoice />
      <ToastContainer />
    </div>
  );
}

export default InvoiceLayout;
