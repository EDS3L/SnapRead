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
        console.error('Error fetching invoice:', error);
      }
    };
    fetchInvoice();
  }, [token, userService, invoiceService, invoiceId]);

  return (
    <>
      {invoicePopup && (
        <div
          className=" z-50 absolute w-full h-full bg-slate-600 bg-opacity-60 justify-center items-center flex"
          onClick={handleInvoicePopup}
        >
          <div
            className="w-5/6 h-5/6 bg-slate-50 "
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-end">
              <i className="fa-solid fa-x p-3" onClick={handleInvoicePopup}></i>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-5 w-full h-full bg-slate-200 p-3 gap-3 sm:max-h[auto] overflow-y-scroll">
              <div className="w-full sm:h-[74.5vh] lg:h-full   lg:col-span-3 p-3">
                <iframe
                  className="h-full w-full"
                  src={invoice.invoiceImage}
                ></iframe>
              </div>
              <InvoiceData
                invoice={invoice}
                handleInputChange={handleInputChange}
                handleInvoicePopup={handleInvoicePopup}
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
