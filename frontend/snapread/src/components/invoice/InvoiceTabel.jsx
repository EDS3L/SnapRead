import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

function InvoiceTabel({ invoiceService, userService, handleInvoicePopup }) {
  const token = localStorage.getItem('token');
  const [invoices, setInvoices] = useState([]);
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState('ASC');

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const username = userService.getUsernameFromToken(token);
        const data = await invoiceService.getUserInvoice(username, token);
        setInvoices(data);
      } catch (error) {
        console.error('Error fetching invoices:', error);
      }
    };

    if (token) {
      fetchInvoices();
    }
  }, [invoiceService, userService, token]);

  useEffect(() => {
    const fetchSortedInvoices = async () => {
      if (sortField) {
        try {
          const data = await invoiceService.sortInvoice(
            sortDirection,
            sortField,
            token
          );
          setInvoices(data);
        } catch (err) {
          console.error(err.response?.data || err);
        }
      }
    };

    fetchSortedInvoices();
  }, [invoiceService, sortDirection, sortField, token]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'ASC' ? 'DESC' : 'ASC');
    } else {
      setSortField(field);
      setSortDirection('ASC');
    }
  };

  const renderSortIcon = (field) => {
    if (sortField !== field) {
      return (
        <i
          className="fa-solid fa-sort p-1 cursor-pointer"
          onClick={() => handleSort(field)}
        ></i>
      );
    }
    return sortDirection === 'ASC' ? (
      <i
        className="fa-solid fa-sort-down p-1 cursor-pointer"
        onClick={() => handleSort(field)}
      ></i>
    ) : (
      <i
        className="fa-solid fa-sort-up p-1 cursor-pointer"
        onClick={() => handleSort(field)}
      ></i>
    );
  };

  return (
    <div className="max-w-full h-full overflow-x-auto overflow-y-auto border border-slate-200 rounded-lg">
      <table className="table-auto w-full min-w-max text-sm text-left rtl:text-right">
        <thead className="uppercase bg-slate-100 sticky top-0">
          <tr>
            <th scope="col" className="px-6 py-3 whitespace-nowrap">
              ID
              {renderSortIcon('id')}
            </th>
            <th scope="col" className="px-6 py-3 whitespace-nowrap">
              Firma
            </th>
            <th scope="col" className="px-6 py-3 whitespace-nowrap">
              NIP
            </th>
            <th scope="col" className="px-6 py-3 whitespace-nowrap">
              Netto
              {renderSortIcon('amountNet')}
            </th>
            <th scope="col" className="px-6 py-3 whitespace-nowrap">
              Vat
              {renderSortIcon('amountVat')}
            </th>
            <th scope="col" className="px-6 py-3 whitespace-nowrap">
              Brutto
              {renderSortIcon('amountGross')}
            </th>
            <th scope="col" className="px-6 py-3 whitespace-nowrap">
              Vat %
            </th>
            <th scope="col" className="px-6 py-3 whitespace-nowrap">
              Data dodania
              {renderSortIcon('createdAt')}
            </th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => (
            <tr
              className="even:bg-slate-50 hover:bg-yellow-50"
              key={invoice.id}
            >
              <th
                scope="row"
                className="px-6 py-4 text-gray-900 font-bold whitespace-nowrap"
              >
                {invoice.id}
              </th>
              <td
                className="px-6 py-4 whitespace-nowrap cursor-pointer"
                onClick={() => handleInvoicePopup(invoice.id)}
              >
                {invoice.supplierName}
              </td>
              <td
                className="px-6 py-4 whitespace-nowrap cursor-pointer"
                onClick={() => handleInvoicePopup(invoice.id)}
              >
                {invoice.supplierNip}
              </td>
              <td
                className="px-6 py-4 whitespace-nowrap cursor-pointer"
                onClick={() => handleInvoicePopup(invoice.id)}
              >
                {invoice.amountNet}
              </td>
              <td
                className="px-6 py-4 whitespace-nowrap cursor-pointer"
                onClick={() => handleInvoicePopup(invoice.id)}
              >
                {invoice.amountVat}
              </td>
              <td
                className="px-6 py-4 whitespace-nowrap cursor-pointer"
                onClick={() => handleInvoicePopup(invoice.id)}
              >
                {invoice.amountGross}
              </td>
              <td
                className="px-6 py-4 whitespace-nowrap cursor-pointer"
                onClick={() => handleInvoicePopup(invoice.id)}
              >
                {invoice.vatPercent}
              </td>
              <td
                className="px-6 py-4 whitespace-nowrap cursor-pointer"
                onClick={() => handleInvoicePopup(invoice.id)}
              >
                {new Date(invoice.createdAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

InvoiceTabel.propTypes = {
  invoiceService: PropTypes.shape({
    getUserInvoice: PropTypes.func.isRequired,
    sortInvoice: PropTypes.func.isRequired,
  }).isRequired,
  userService: PropTypes.shape({
    getUsernameFromToken: PropTypes.func.isRequired,
  }).isRequired,
  handleInvoicePopup: PropTypes.func.isRequired,
};

export default InvoiceTabel;
