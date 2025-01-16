import axios from '../../config/axiosConfig';

export const login = async (email, password, nav, setError) => {
  try {
    if (email != null && password != null) {
      const response = await axios.post('/api/login', {
        email,
        password,
      });
      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
        nav('/dashboard');
      }
    }
  } catch (e) {
    setError(e.response.data);
  }
};
