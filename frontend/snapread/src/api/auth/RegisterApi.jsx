import axios from 'axios';

export const register = async (username, email, password, setError) => {
  const url = '/api/register';

  if (username === '' || email === '' || password === '') {
    console.log('Please fill in all fields');
    return;
  }

  try {
    const response = await axios.post(url, {
      username,
      email,
      password,
    });
    console.log(response);
    if (response.status === 200) {
      window.location.reload();
    }
  } catch (err) {
    setError(err.response.data);
  }
};
