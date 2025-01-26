import { useState } from 'react';
import InvoiceService from '../../services/invocie/InvoiceService';
import UserService from '../../services/user/UserService';
import InvoiceTabel from './InvoiceTabel';
import LoadingScreen from '../loading/LoadingScreen';
import InvoicePopup from './InvoicePopup';
import InvoiceErrorMessage from '../errors/InvoiceErrorMessage';

import DetailsInvoice from './DetailsInvoice';
import FilterInvoice from './FilterInvoice';

function Invoice() {
  const [file, setFile] = useState(null);
  const invoiceService = new InvoiceService();
  const userService = new UserService();
  const [loading, setLoading] = useState(null);
  const token = localStorage.getItem('token');
  const [popup, setPopup] = useState(false);
  const [invoicePopup, setinvoicePopup] = useState(false);
  const [selectedInvoiceId, setSelectedInvoiceId] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleInvoicePopup = (invoiceId) => {
    setSelectedInvoiceId(invoiceId);
    setinvoicePopup(true);
  };

  const handleClosePopup = () => {
    setinvoicePopup(false);
    setSelectedInvoiceId(null);
  };

  const handlePopup = () => {
    setPopup(!popup);
  };

  const handleUpload = async () => {
    if (!file) {
      return;
    }

    try {
      setLoading(true);
      console.log(loading);
      const response = await invoiceService.createInvoice(
        file,
        userService.getUsernameFromToken(token),
        token,
        setError
      );
      console.log(response);
      // todo: dodać jakieś ładne powiadomienie o dodaniu faktury
    } catch (error) {
      console.error('Błąd:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <DetailsInvoice
        invoicePopup={invoicePopup}
        setinvoicePopup={handleClosePopup}
        invoiceId={selectedInvoiceId}
        userService={userService}
        invoiceService={invoiceService}
      />
      <InvoicePopup
        handleUpload={handleUpload}
        handleFileChange={handleFileChange}
        popup={popup}
        setPopup={setPopup}
      />
      {loading && <LoadingScreen value="Dodawanie fakutry" />}
      {error && <InvoiceErrorMessage value={error} />}
      <div className="flex  flex-col md:w-[calc(100%-3.2rem)] xxl:w-[calc(100%-16rem)] w-[calc(100%-3.1rem)] p-3 bg-slate-100 ">
        <header className="flex flex-col p-4 w-full gap-5 bg-white rounded-3xl mb-3 ">
          <div className="flex justify-between mt-2 p-4">
            <span className="text-gray-800 font-extrabold text-3xl">
              Faktury
            </span>

            <div className="flex text-center align-middle">
              <button
                data-modal-target="default-modal"
                data-modal-toggle="default-modal"
                onClick={handlePopup}
                className="cursor-pointer bg-blue-600 p-3 rounded-md text-white font-bold"
              >
                Dodaj fakturę
              </button>
            </div>
          </div>
        </header>
        <main className="flex flex-col flex-grow h-96 gap-1">
          <FilterInvoice />
          <InvoiceTabel
            userService={userService}
            invoiceService={invoiceService}
            handleInvoicePopup={handleInvoicePopup}
          />
        </main>
        <footer></footer>
      </div>
    </>
  );
}

export default Invoice;
