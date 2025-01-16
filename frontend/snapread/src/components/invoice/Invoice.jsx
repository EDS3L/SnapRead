import { useState } from 'react';
import InvoiceService from '../../services/invocie/InvoiceService';
import UserService from '../../services/user/UserService';
import InvoiceTabel from './InvoiceTabel';

function Invoice() {
  const [file, setFile] = useState(null);
  const invoiceService = new InvoiceService();
  const userService = new UserService();
  const [loading, setLoading] = useState(null);
  const token = localStorage.getItem('token');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      return;
    }

    try {
      setLoading(true);
      const response = await invoiceService.createInvoice(
        file,
        userService.getUsernameFromToken(token),
        token
      );
      console.log('Odpowiedź serwera:', response);
    } catch (error) {
      console.error('Błąd:', error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {' '}
      {loading && (
        <div className="absolute bg-white bg-opacity-60 z-10 h-full w-full flex items-center justify-center">
          <div className="flex items-center">
            <span className="text-3xl mr-4">Dodawanie faktury</span>
            <svg
              className="animate-spin h-8 w-8 text-gray-800"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
        </div>
      )}
      <div className="flex min-h-screen flex-col w-full p-3 ">
        <header className="flex flex-col p-4 w-full gap-5 bg-slate-100 rounded-3xl mb-3 ">
          <div className="w-full">
            <span className="text-gray-800 font-bold text-2xl">
              Dashboard{' > '}Faktury
            </span>
          </div>

          <div className="flex justify-between mt-2 p-4">
            <span className="text-gray-800 font-extrabold text-3xl">
              Faktury
            </span>

            <div className="flex text-center align-middle">
              <div>
                <input
                  id="file"
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>
              <label
                htmlFor="file"
                className="cursor-pointer bg-blue-600 p-3 rounded-md text-white font-bold"
              >
                Dodaj fakturę
              </label>
              <button
                onClick={handleUpload}
                className="ml-3 bg-green-600 p-3 rounded-md text-white font-bold"
              >
                Wyślij
              </button>
            </div>
          </div>
        </header>
        <main className="flex-grow">
          <InvoiceTabel
            userService={userService}
            invoiceService={invoiceService}
          />
        </main>
        <footer></footer>
      </div>
    </>
  );
}

export default Invoice;
