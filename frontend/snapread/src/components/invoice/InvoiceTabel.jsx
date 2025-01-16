import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

function InvoiceTabel({ invoiceService, userService }) {
  const token = localStorage.getItem('token');
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const username = userService.getUsernameFromToken(token);
        const data = await invoiceService.getUserInvoice(username);
        setInvoices(data);
      } catch (error) {
        console.error('Error fetching invoices:', error);
      }
    };

    if (token) {
      fetchInvoices();
    }
  }, [invoiceService, userService, token]);

  return (
    <div className="relative overflow-x-auto rounded-xl overflow-y-auto max-h-96">
      <table className="w-full text-sm text-left rtl:text-right ">
        <thead className="uppercase font-bold bg-slate-100 ">
          <tr>
            <th scope="col" className="px-6 py-3 rounded-s-lg ">
              ID
            </th>
            <th scope="col" className="px-6 py-3 rounded-s-lg">
              Firma
            </th>
            <th scope="col" className="px-6 py-3">
              NIP
            </th>
            <th scope="col" className="px-6 py-3 rounded-e-lg">
              Netto
            </th>
            <th scope="col" className="px-6 py-3 rounded-e-lg">
              Vat
            </th>
            <th scope="col" className="px-6 py-3 rounded-e-lg">
              Brutto
            </th>
            <th scope="col" className="px-6 py-3 rounded-e-lg">
              Vat %
            </th>
            <th scope="col" className="px-6 py-3 rounded-e-lg">
              Data dodania
            </th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => {
            return (
              <tr className="border border-slate-200 " key={invoice.id}>
                <th
                  scope="row"
                  className="px-6 py-4  text-gray-900 font-bold whitespace-nowrap "
                >
                  {invoice.id}
                </th>
                <td className="px-6 py-4">{invoice.supplier_name}</td>
                <td className="px-6 py-4">{invoice.supplier_nip}</td>
                <td className="px-6 py-4">{invoice.amount_net}</td>
                <td className="px-6 py-4">{invoice.amount_vat}</td>
                <td className="px-6 py-4">{invoice.amount_gross}</td>
                <td className="px-6 py-4">{invoice.vat_percent}</td>
                <td className="px-6 py-4">{invoice.created_at}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

InvoiceTabel.propTypes = {
  invoiceService: PropTypes.shape({
    getUserInvoice: PropTypes.func.isRequired,
  }).isRequired,
  userService: PropTypes.shape({
    getUsernameFromToken: PropTypes.func.isRequired,
  }).isRequired,
};

export default InvoiceTabel;
