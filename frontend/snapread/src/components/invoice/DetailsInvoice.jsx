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
          72,
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
        <div className="grid grid-cols-1 lg:grid-cols-5 w-full h-full bg-slate-200 p-3 gap-3 sm:max-h[auto] overflow-y-scroll">
          <div className="w-full flex  lg:col-span-5 p-3 gap-3 overflow-x-scroll">
            <div className="w-20 h-20  bg-red-400 "></div>
            <div className="w-20 h-20  bg-red-400 "></div>
            <div className="w-20 h-20  bg-red-400 "></div>
            <div className="w-20 h-20  bg-red-400 "></div>
            <div className="w-20 h-20  bg-red-400 "></div>
            <div className="w-20 h-20  bg-red-400 "></div>
            <div className="w-20 h-20  bg-red-400 "></div>
            <div className="w-20 h-20  bg-red-400 "></div>
            <div className="w-20 h-20  bg-red-400 "></div>
            <div className="w-20 h-20  bg-red-400 "></div>
            <div className="w-20 h-20  bg-red-400 "></div>
            <div className="w-20 h-20  bg-red-400 "></div>
            <div className="w-20 h-20  bg-red-400 "></div>
            <div className="w-20 h-20  bg-red-400 "></div>
          </div>
          <div className="w-full h-[70vh] lg:col-span-3 p-3">
            <iframe
              className="h-full w-full"
              src={invoice.invoice_image}
            ></iframe>
          </div>
          <div className="w-full  p-3 max-h-[70.5vh] lg:col-span-2">
            <div className="h-4/5  bg-white flex flex-col items-center pt-3 overflow-scroll ">
              <h1 className="text-2xl p-3  text-slate-700 font-bold border-b border-slate-300 w-full text-center">
                Dane faktury
              </h1>
              <div className="border-b border-slate-300 w-5/6  max-w-2xl flex lg:justify-center p-3 gap-4">
                <label
                  className="text-md font-bold flex items-center  "
                  onClick={() => handleEnable('invoice_number')}
                >
                  Numer faktury
                </label>
                <input
                  type="text"
                  className="p-2 "
                  value={invoice.invoice_number || ''}
                  disabled={activeInput !== 'invoice_number'}
                />
              </div>
              <div className="border-b border-slate-300 w-5/6  max-w-2xl flex lg:justify-center p-3 gap-4">
                <label
                  className="text-md font-bold flex items-center  "
                  onClick={() => handleEnable('invoice_number')}
                >
                  Numer faktury
                </label>
                <input
                  type="text"
                  className="p-2 "
                  value={invoice.invoice_number || ''}
                  disabled={activeInput !== 'invoice_number'}
                />
              </div>
              <div className="border-b border-slate-300 w-5/6  max-w-2xl flex lg:justify-center p-3 gap-4">
                <label
                  className="text-md font-bold flex items-center  "
                  onClick={() => handleEnable('invoice_number')}
                >
                  Numer faktury
                </label>
                <input
                  type="text"
                  className="p-2 "
                  value={invoice.invoice_number || ''}
                  disabled={activeInput !== 'invoice_number'}
                />
              </div>
              <div className="border-b border-slate-300 w-5/6  max-w-2xl flex lg:justify-center p-3 gap-4">
                <label
                  className="text-md font-bold flex items-center  "
                  onClick={() => handleEnable('invoice_number')}
                >
                  Numer faktury
                </label>
                <input
                  type="text"
                  className="p-2 "
                  value={invoice.invoice_number || ''}
                  disabled={activeInput !== 'invoice_number'}
                />
              </div>
              <div className="border-b border-slate-300 w-5/6  max-w-2xl flex lg:justify-center p-3 gap-4">
                <label
                  className="text-md font-bold flex items-center  "
                  onClick={() => handleEnable('invoice_number')}
                >
                  Numer faktury
                </label>
                <input
                  type="text"
                  className="p-2 "
                  value={invoice.invoice_number || ''}
                  disabled={activeInput !== 'invoice_number'}
                />
              </div>
              <div className="border-b border-slate-300 w-5/6  max-w-2xl flex lg:justify-center p-3 gap-4">
                <label
                  className="text-md font-bold flex items-center  "
                  onClick={() => handleEnable('invoice_number')}
                >
                  Numer faktury
                </label>
                <input
                  type="text"
                  className="p-2 "
                  value={invoice.invoice_number || ''}
                  disabled={activeInput !== 'invoice_number'}
                />
              </div>
              <div className="border-b border-slate-300 w-5/6  max-w-2xl flex lg:justify-center p-3 gap-4">
                <label
                  className="text-md font-bold flex items-center  "
                  onClick={() => handleEnable('invoice_number')}
                >
                  Numer faktury
                </label>
                <input
                  type="text"
                  className="p-2 "
                  value={invoice.invoice_number || ''}
                  disabled={activeInput !== 'invoice_number'}
                />
              </div>
              <div className="border-b border-slate-300 w-5/6  max-w-2xl flex lg:justify-center p-3 gap-4">
                <label
                  className="text-md font-bold flex items-center  "
                  onClick={() => handleEnable('invoice_number')}
                >
                  Numer faktury
                </label>
                <input
                  type="text"
                  className="p-2 "
                  value={invoice.invoice_number || ''}
                  disabled={activeInput !== 'invoice_number'}
                />
              </div>
            </div>
            <div className="w-full h-1/5 bg-white flex gap-2 items-end justify-end p-3 ">
              <button className="bg-gray-500 hover:bg-slate-400 p-3 rounded-lg h-14 w-28 text-white font-bold">
                Anuluj
              </button>

              <button className="bg-blue-600 hover:bg-blue-500 p-3 rounded-lg h-14 w-28 text-white font-bold">
                Zapis
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailsInvoice;
