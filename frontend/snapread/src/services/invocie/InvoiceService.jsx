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

  async sortInvoice(direction, value, token) {
    try {
      const response = await axios.get(
        `/api/invoice/sort?direction=${direction}&value=${value}`,
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

  async filterInvoice(company, nip, startDate, endDate, token) {
    try {
      const response = await axios.get(
        `/api/invoice/sort/company?supplierName=${company}&supplierNip=${nip}&startDate=${startDate}&endDate=${endDate}`,
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
}

export default InvoiceService;
