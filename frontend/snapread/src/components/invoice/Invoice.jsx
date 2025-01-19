import { useState } from 'react';
import InvoiceService from '../../services/invocie/InvoiceService';
import UserService from '../../services/user/UserService';
import InvoiceTabel from './InvoiceTabel';
import LoadingScreen from '../loading/LoadingScreen';
import InvoicePopup from './InvoicePopup';
import InvoiceErrorMessage from '../errors/InvoiceErrorMessage';

function Invoice() {
  const [file, setFile] = useState(null);
  const invoiceService = new InvoiceService();
  const userService = new UserService();
  const [loading, setLoading] = useState(null);
  const token = localStorage.getItem('token');
  const [popup, setPopup] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
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
      <InvoicePopup
        handleUpload={handleUpload}
        handleFileChange={handleFileChange}
        popup={popup}
        setPopup={setPopup}
      />
      {loading && <LoadingScreen value="Dodawanie fakutry" />}
      {error && <InvoiceErrorMessage value={error} />}

      <div className="flex  flex-col w-[calc(100%-3.2rem)] p-3 ">
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
              <button
                onClick={handlePopup}
                className="cursor-pointer bg-blue-600 p-3 rounded-md text-white font-bold"
              >
                Dodaj fakturę
              </button>
            </div>
          </div>
        </header>
        <main className="flex-grow h-96">
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
