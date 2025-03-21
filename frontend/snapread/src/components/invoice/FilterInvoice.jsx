import { useRef, useState } from 'react';
import Datepicker from 'react-tailwindcss-datepicker';
import HelperService from '../../services/invocie/HelperService';
import PropTypes from 'prop-types';

function FilterInvoice({
  invoiceService,
  setInvoices,
  userService,
  setSortField,
  setNotFound,
}) {
  const [value, setValue] = useState({
    startDate: null,
    endDate: null,
  });
  const [companyName, setCompanyName] = useState();
  const [nip, setNip] = useState();
  const helperService = new HelperService();

  const nipRef = useRef(null);
  const companyRef = useRef(null);
  const token = localStorage.getItem('token');

  const fetchInvoices = async () => {
    try {
      const username = userService.getUsernameFromToken(token);
      const data = await invoiceService.getUserInvoice(username, token);
      setInvoices(data);
    } catch (error) {
      console.error('Error fetching invoices:', error);
    }
  };

  const onClear = () => {
    nipRef.current.value = '';
    setNip('');
    companyRef.current.value = '';
    setCompanyName('');
    setValue({ startDate: null, endDate: null });
    setSortField(null);
    setNotFound(false);
    fetchInvoices();
  };

  //do kasacji, funkcja łącząca funkcje do wywołania

  // const combineFunctions = (...fns) => () => {
  //   fns.forEach(fn => fn());
  // };

  const handleFilter = async () => {
    const username = userService.getUsernameFromToken(token);
    let localSortField = null;
    setSortField(localSortField);
    const response = await invoiceService.filterInvoice(
      companyName,
      nip,
      helperService.getFormatedDate(value.startDate),
      helperService.getFormatedDate(value.endDate),
      username,
      token
    );
    console.log(response.length);
    if (response.length > 0) {
      setNotFound(false);
      setInvoices(response);
    } else {
      setNotFound(true);
      console.log('niema');
    }
  };

  return (
    <div className="w-full h-1/6 bg-white rounded-lg flex  ">
      <div className="flex w-4/6">
        <div className="flex flex-col justify-center p-3 gap-1 w-1/4">
          <span className="text-slate-700 font-bold text-sm">NAZWA FIRMY</span>
          <input
            type="text"
            ref={companyRef}
            placeholder="example company"
            className="border border-slate-300 p-3 rounded-md"
            onChange={(e) => setCompanyName(e.target.value)}
          />
        </div>
        <div className="flex flex-col justify-center p-3 gap-1 w-1/4">
          <span className="text-slate-700 font-bold text-sm">NIP</span>
          <input
            ref={nipRef}
            type="text"
            placeholder="123-123-123"
            className="border border-slate-300 p-3 rounded-md  "
            onChange={(e) => setNip(e.target.value)}
          />
        </div>
        <div className="flex flex-col justify-center p-3 gap-1 w-2/5">
          <span className="text-slate-700 font-bold text-sm">
            Data wystawienia
          </span>
          <div className="flex border border-slate-300 rounded-md">
            <Datepicker
              primaryColor="blue"
              displayFormat="YYYY/MM/DD"
              value={value}
              onChange={(newValue) => setValue(newValue)}
              showShortcuts={true}
              inputClassName="p-3 rounded-md h-full w-full"
            />
          </div>
        </div>
      </div>
      <div className="flex  justify-end items-center p-3 gap-3 w-2/6">
        <button
          onClick={onClear}
          className="bg-slate-200 p-3 rounded-md text-slate-800 font-bold hover:bg-slate-400 w-1/4"
        >
          Wyczyść
        </button>
        <button
          className="bg-violet-700 p-3 rounded-md text-white font-bold hover:bg-violet-500 w-2/4"
          onClick={handleFilter}
        >
          Filtruj
        </button>
      </div>
    </div>
  );
}

FilterInvoice.propTypes = {
  invoiceService: PropTypes.object.isRequired,
  setInvoices: PropTypes.func.isRequired,
  userService: PropTypes.shape({
    getUsernameFromToken: PropTypes.func.isRequired,
  }).isRequired,
  setSortField: PropTypes.func,
  setNotFound: PropTypes.func.isRequired,
};

export default FilterInvoice;
