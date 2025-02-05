import axios from '../../config/axiosConfig';

class InvoiceService {
  async createInvoice(file, username, token, setError) {
    try {
      const formData = new FormData();
      formData.append('file', file);
      const response = await axios.post(
        `/api/invoice?username=${username}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return response.data;
    } catch (err) {
      setError(err.response.data);
      setTimeout(() => {
        setError(false);
      }, 4000);
    }
  }

  async getUserInvoice(username, token) {
    try {
      const response = await axios.get(
        `/api/invoice/usersInvoice?username=${username}`,
        token,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (err) {
      console.error(err.response.data || err);
    }
  }

  async getUserInvoiceByID(username, id, token) {
    try {
      const response = await axios.get(
        `/api/invoice/invoiceByID?username=${username}&id=${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (err) {
      console.error(err.response.data || err);
    }
  }

  async sortInvoice(invoices, direction, value, token) {
    try {
      const response = await axios.post(`/api/invoice/sort`, invoices, {
        params: {
          direction,
          value,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (err) {
      console.error(err.response?.data || err);
    }
  }

  async filterInvoice(company, nip, startDate, endDate, username, token) {
    try {
      const defaultStartDate = '2025-01-01';
      const defaultEndDate = new Date().toISOString().split('T')[0];
      const response = await axios.get(
        `/api/invoice/sort/company?supplierName=${company || ''}&supplierNip=${
          nip || ''
        }&startDate=${startDate || defaultStartDate}&endDate=${
          endDate || defaultEndDate
        }&username=${username}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (err) {
      console.error(err.response.data || err);
    }
  }

  async correctInvoice(
    id,
    supplierName,
    supplierNip,
    supplierAddress,
    invoiceNumber,
    amountNet,
    amountVat,
    amountGross,
    vatPercent,
    description,
    invoiceDate,
    dueDate,
    token
  ) {
    try {
      const response = await axios.put(
        '/api/invoice/correctInvoice',
        {
          id: id,
          supplierName: supplierName,
          supplierNip: supplierNip,
          supplierAddress: supplierAddress,
          invoiceNumber: invoiceNumber,
          amountNet: amountNet,
          amountVat: amountVat,
          amountGross: amountGross,
          vatPercent: vatPercent,
          description: description,
          invoiceDate: invoiceDate,
          dueDate: dueDate,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response;
    } catch (e) {
      console.error(e.response.data || e);
    }
  }
}

export default InvoiceService;
