import { useEffect, useState } from 'react';
import UserService from '../../services/user/UserService';
import InvoiceService from '../../services/invocie/InvoiceService';

function DetailsInvoice() {
  const token = localStorage.getItem('token');
  const userService = new UserService();
  const invoiceService = new InvoiceService();
  const [invoice, setInvoice] = useState([]);
  const [activeInput, setActiveInput] = useState(null);

  const handleEnable = (inputName) => {
    setActiveInput(inputName);
  };

  useEffect(() => {
    const fetchInvoice = async () => {
      if (!token) return;
      try {
        const username = userService.getUsernameFromToken(token);
        const data = await invoiceService.getUserInvoiceByID(
          'mati',
          3,
          username
        );
        setInvoice(data);
      } catch (error) {
        console.error('Error fetching invoice:', error);
      }
    };
    fetchInvoice();
  }, [token, userService, invoiceService]);

  return (
    <div className=" z-50 absolute w-full h-full bg-slate-600 bg-opacity-60 justify-center items-center flex">
      <div
        className="w-5/6 h-5/6 bg-slate-50 "
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-end">
          <i className="fa-solid fa-x p-3"></i>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-6  w-full h-full bg-slate-200 p-3 gap-3">
          <div className="w-full bg-slate-500  md:col-span-1 p-3 flex flex-col gap-3">
            {/* załączniki pobierane, ilosc ustalana dynamicznie, po nacisnieciu wywietlamy je */}
            <div className="w-full aspect-square bg-red-400 "></div>
            <div className="w-full aspect-square bg-red-400"></div>
            <div className="w-full aspect-square bg-red-400"></div>
          </div>
          <div className="w-full bg-slate-500  md:col-span-3 p-3">
            <iframe
              className="h-full w-full"
              src={invoice.invoice_image}
            ></iframe>
          </div>
          <div className="w-full bg-slate-500  md:col-span-2">
            <div>
              <label onClick={() => handleEnable('invoice_number')}>
                numer faktury
              </label>
              <input
                type="text"
                value={invoice.invoice_number || ''}
                disabled={activeInput !== 'invoice_number'}
              />
            </div>
            <div>
              <label onClick={() => handleEnable('supplier_name')}>
                Nazwa firmy
              </label>
              <input
                type="text"
                value={invoice.supplier_name || ''}
                disabled={activeInput !== 'supplier_name'}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailsInvoice;
