import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { toast, Zoom } from 'react-toastify';

function InvoiceTabel({
  invoiceService,
  userService,
  handleInvoicePopup,
  setInvoices,
  invoices,
  sortField,
  setSortField,
  sortDirection,
  setSortDirection,
  notFound,
}) {
  const token = localStorage.getItem('token');
  const username = userService.getUsernameFromToken(token);

  const handleDelete = async (id) => {
    try {
      console.log(id);
      const response = await invoiceService.deleteInvoice(id, username, token);
      toast.info(response.data, {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
        transition: Zoom,
      });
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const data = await invoiceService.getUserInvoice(username, token);
        setInvoices(data);
      } catch (error) {
        console.error('Error fetching invoices:', error);
      }
    };

    if (token && invoices.length === 0) {
      fetchInvoices();
    }
  }, [
    invoiceService,
    userService,
    token,
    setInvoices,
    invoices.length,
    username,
  ]);

  useEffect(() => {
    const fetchSortedInvoices = async () => {
      if (sortField) {
        try {
          const data = await invoiceService.sortInvoice(
            invoices,
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
  }, [invoices, invoiceService, sortDirection, sortField, token, setInvoices]);

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
    <div className="max-w-full h-5/6 overflow-x-auto overflow-y-auto border border-slate-200 rounded-lg bg-white">
      <table className="table-auto w-full min-w-max text-sm text-left rtl:text-right ">
        <thead className="uppercase bg-slate-200 bg-opacity-100 sticky top-0 ">
          <tr>
            <th scope="col" className="px-6 py-3 whitespace-nowrap">
              ID
              {renderSortIcon('id')}
            </th>
            <th scope="col" className="px-6 py-3 whitespace-nowrap">
              Firma
              {renderSortIcon('supplierName')}
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
              Data dodania
              {renderSortIcon('createdAt')}
            </th>
            <th className="px-6 py-3 whitespace-nowrap">Akcje</th>
          </tr>
        </thead>

        {notFound ? (
          <>
            <tbody>
              <tr>
                <td className="text-center p-3 text-xl" colSpan={8}>
                  Brak wyników filtrowania
                </td>
              </tr>
            </tbody>
          </>
        ) : (
          <tbody>
            {invoices
              .filter((invoice) => invoice !== undefined && invoice !== null)
              .map((invoice) => (
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
                    {new Date(invoice.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap cursor-pointer">
                    <i
                      className="fa-solid fa-trash hover:text-red-600"
                      onClick={() => handleDelete(invoice.id)}
                    ></i>
                  </td>
                </tr>
              ))}
          </tbody>
        )}
      </table>
    </div>
  );
}

InvoiceTabel.propTypes = {
  invoiceService: PropTypes.shape({
    getUserInvoice: PropTypes.func.isRequired,
    sortInvoice: PropTypes.func.isRequired,
    deleteInvoice: PropTypes.func.isRequired,
  }).isRequired,
  userService: PropTypes.shape({
    getUsernameFromToken: PropTypes.func.isRequired,
  }).isRequired,
  handleInvoicePopup: PropTypes.func.isRequired,
  setInvoices: PropTypes.func.isRequired,
  invoices: PropTypes.array.isRequired,
  sortField: PropTypes.string,
  setSortField: PropTypes.func.isRequired,
  sortDirection: PropTypes.string.isRequired,
  setSortDirection: PropTypes.func.isRequired,
  notFound: PropTypes.bool,
};

export default InvoiceTabel;
