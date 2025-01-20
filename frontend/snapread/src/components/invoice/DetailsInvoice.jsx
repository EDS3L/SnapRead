import { useEffect, useState } from 'react';
import UserService from '../../services/user/UserService';
import InvoiceService from '../../services/invocie/InvoiceService';

function DetailsInvoice() {
  const token = localStorage.getItem('token');
  const [invoice, setInvoices] = useState([]);
  const userService = new UserService();
  const invoiceService = new InvoiceService();

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const username = userService.getUsernameFromToken(token);
        const data = await invoiceService.getUserInvoiceByID(
          'mati',
          7,
          username
        );
        setInvoices(data);
      } catch (error) {
        console.error('Error fetching invoices:', error);
      }
    };

    if (token) {
      fetchInvoices();
    }
  }, [invoiceService, userService, token]);

  return (
    <div className="absolute w-full h-full flex justify-center items-center bg-slate-600 bg-opacity-60 z-50 p-14">
      <div className="w-full h-full bg-slate-50">
        <div className="w-full flex justify-end">
          <div className=" p-3">X</div>
        </div>
        <div className="h-full bg-slate-200 w-full p-3">
          <img className=" " src={invoice.invoice_image} alt="" />
        </div>
      </div>
    </div>
  );
}

export default DetailsInvoice;
