import Invoice from '../../components/invoice/Invoice';
import SideBar from '../../components/sideBar/SideBar';

function InvoiceLayout() {
  return (
    <div className="flex h-screen">
      <SideBar />
      <Invoice />
    </div>
  );
}

export default InvoiceLayout;
