import PropTypes from 'prop-types';
import { useRef, useState } from 'react';

const labels = [
  { label: 'Nazwa dostawcy', name: 'supplierName' },
  { label: 'Nip dostawcy', name: 'supplierNip' },
  { label: 'Adres dostawcy', name: 'supplierAddress' },
  { label: 'Numer faktury', name: 'invoiceNumber' },
  { label: 'Kwota netto', name: 'amountNet' },
  { label: 'Kwota vat', name: 'amountVat' },
  { label: 'Kwota brutto', name: 'amountGross' },
  { label: '%VAT', name: 'vatPercent' },
  { label: 'Opis', name: 'description' },
  { label: 'Data oryginału', name: 'invoiceDate' },
  { label: 'Termin płatności', name: 'dueDate' },
];

function InvoiceData({ invoice, handleInputChange, handleInvoicePopup }) {
  const [activeInput, setActiveInput] = useState(null);

  const inputBRef = useRef([]);

  const handleEnable = (inputName, index) => {
    setActiveInput(inputName);

    // Delays focus on input
    setTimeout(() => {
      if (inputBRef.current[index]) {
        inputBRef.current[index].focus();
      }
    }, 0);
  };

  return (
    <div className="w-full  p-3 h-[74.5vh] lg:col-span-2 rounded-lg">
      <div className="bg-white rounded-t-md">
        <h1 className="text-2xl p-3  text-slate-700 font-bold border-b border-slate-300 w-full text-center">
          Dane faktury
        </h1>
      </div>
      <div className="h-4/5  bg-white flex flex-col items-center pt-3 overflow-scroll ">
        {labels.map((label, index) => (
          <div
            className="border-b border-slate-300 w-5/6  max-w-2xl flex lg:justify-center p-3 gap-4"
            key={label.name}
          >
            <div className="flex justify-center items-center ">
              <i
                className="cursor-pointer pt- fa-solid fa-pen-to-square "
                onClick={() => {
                  handleEnable(label.name, index);
                }}
              ></i>
            </div>
            <label className="text-md font-bold flex items-center w-1/5  ">
              {label.label}
            </label>
            <input
              type="text"
              className={
                activeInput == label.name ? 'border border-blue-500 p-2' : ''
              }
              value={invoice[label.name] || ''}
              disabled={activeInput !== label.name}
              onChange={(e) => handleInputChange(e, label.name)}
              ref={(el) => (inputBRef.current[index] = el)}
            />
          </div>
        ))}
      </div>
      <div className="w-full h-1/5 bg-white flex gap-2 items-end justify-end p-3 rounded-md ">
        {invoice.invoice_image && (
          <a href={invoice.invoiceImage} target="_blank">
            <i className="fa-solid fa-file-pdf text-5xl hover:text-blue-600 cursor-pointer"></i>
          </a>
        )}

        <button
          className="bg-gray-500 hover:bg-slate-400 p-3 rounded-lg h-14 w-28 text-white font-bold"
          onClick={handleInvoicePopup}
        >
          Anuluj
        </button>

        <button className="bg-blue-600 hover:bg-blue-500 p-3 rounded-lg h-14 w-28 text-white font-bold">
          Zapisz
        </button>
      </div>
    </div>
  );
}

InvoiceData.propTypes = {
  activeInput: PropTypes.string,
  invoice: PropTypes.object.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleInvoicePopup: PropTypes.func.isRequired,
};

export default InvoiceData;
