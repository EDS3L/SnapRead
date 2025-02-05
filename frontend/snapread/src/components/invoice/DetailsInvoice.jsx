import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import InvoiceData from './detailsInvoiceComponents/InvoiceData';

function DetailsInvoice({
  setinvoicePopup,
  invoicePopup,
  invoiceId,
  userService,
  invoiceService,
}) {
  const token = localStorage.getItem('token');
  const [invoice, setInvoice] = useState({});

  const handleInvoicePopup = () => {
    setinvoicePopup(!invoicePopup);
  };

  const handleInputChange = (e, name) => {
    const { value } = e.target;
    setInvoice((prevInvoice) => ({
      ...prevInvoice,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const response = await invoiceService.correctInvoice(
        invoiceId,
        invoice.supplierName,
        invoice.supplierNip,
        invoice.supplierAddress,
        invoice.invoiceNumber,
        invoice.amountNet,
        invoice.amountVat,
        invoice.amountGross,
        invoice.vatPercent,
        invoice.description,
        invoice.invoiceDate,
        invoice.dueDate,
        token
      );
      console.log(invoiceId);
      console.log('Faktura zaktualizowana:', response);
    } catch (error) {
      console.error('Błąd podczas aktualizacji faktury:', error);
    }
  };

  useEffect(() => {
    const fetchInvoice = async () => {
      if (!token || !invoiceId) return;
      try {
        const username = userService.getUsernameFromToken(token);
        const data = await invoiceService.getUserInvoiceByID(
          username,
          invoiceId,
          username
        );
        setInvoice(data);
      } catch (error) {
        console.error('Błąd pobierania faktury:', error);
      }
    };
    fetchInvoice();
  }, [token, userService, invoiceService, invoiceId]);

  return (
    <>
      {invoicePopup && (
        <div
          className="z-50 absolute w-full h-full bg-slate-600 bg-opacity-60 flex justify-center items-center"
          onClick={handleInvoicePopup}
        >
          <div
            className="w-5/6 h-5/6 bg-slate-50"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-end">
              <i className="fa-solid fa-x p-3" onClick={handleInvoicePopup}></i>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-5 w-full h-full bg-slate-200 p-3 gap-3 overflow-y-scroll">
              <div className="w-full lg:col-span-3 p-3">
                <iframe
                  className="h-full w-full"
                  src={invoice.invoiceImage}
                  title="Faktura"
                ></iframe>
              </div>
              <InvoiceData
                invoice={invoice}
                handleInputChange={handleInputChange}
                handleInvoicePopup={handleInvoicePopup}
                handleSave={handleSave}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

DetailsInvoice.propTypes = {
  setinvoicePopup: PropTypes.func.isRequired,
  invoicePopup: PropTypes.bool.isRequired,
  invoiceId: PropTypes.number,
  userService: PropTypes.object,
  invoiceService: PropTypes.object,
};

export default DetailsInvoice;
