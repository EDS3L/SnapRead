import { useEffect, useState } from 'react';
import UserService from '../../services/user/UserService';
import InvoiceService from '../../services/invocie/InvoiceService';

function DetailsInvoice({ onClose }) {
  const token = localStorage.getItem('token');
  const userService = new UserService();
  const invoiceService = new InvoiceService();
  const [invoice, setInvoice] = useState([]);

  
  useEffect(() => {
    const fetchInvoice = async () => {
      if (!token) return;
      try {
        const username = userService.getUsernameFromToken(token);
        const data = await invoiceService.getUserInvoiceByID('mati', 38, username);
        setInvoice(data)
      } catch (error) {
        console.error('Error fetching invoice:', error);
      }
    };
    fetchInvoice();
    
  }, [token, userService, invoiceService]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="relative bg-white max-w-7xl w-full mx-auto rounded shadow-lg overflow-hidden max-h-[90vh] overflow-y-auto">
        <div className="flex justify-end p-3 bg-gray-100">
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            X
          </button>
        </div>
        <div className="p-4 grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-2 flex flex-col items-center gap-2">
            <div className="w-full aspect-square bg-gray-300 rounded" />
            <div className="w-full aspect-square bg-gray-300 rounded" />
            <div className="w-full aspect-square bg-gray-300 rounded" />
          </div>
          <div className="md:col-span-6 flex items-center justify-center max-h-full">
            <div className="bg-gray-200 text-gray-500 h-full p-4 rounded text-center w-full">
              <img className="max-h-full mx-auto" src={invoice.invoice_image} alt="" />
            </div>
          </div>
          <div className="md:col-span-4 flex flex-col gap-4">
            <div>
              <label className="block mb-1 font-semibold text-gray-700">
                Numer faktury
              </label>
              <input
                type="text"
                placeholder="Wpisz numer faktury..."
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold text-gray-700">
                Wystawca
              </label>
              <input
                type="text"
                placeholder="Nazwa wystawcy..."
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold text-gray-700">
                Data
              </label>
              <input
                type="date"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold text-gray-700">
                Opis
              </label>
              <textarea
                rows={4}
                placeholder="Dowolny opis..."
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end p-4 bg-gray-50">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded mr-2 hover:bg-gray-100 transition-colors"
          >
            Anuluj
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Zapisz
          </button>
        </div>
      </div>
    </div>
  );
}

export default DetailsInvoice;
