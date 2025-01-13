import PropTypes from 'prop-types';
import img from '../../assets/images/logo.png';

import { useState } from 'react';
import { login } from '../../api/auth/LoginApi';
import { register } from '../../api/auth/RegisterApi';
import { useNavigate } from 'react-router-dom';
import ErrorMessage from '../errors/ErrorMessage';

const AuthForm = ({ type }) => {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPasword, setConfirmPasword] = useState();
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const nav = useNavigate();

  const isLogin = type === 'login';

  const handleSignIn = async () => {
    await login(email, password, nav, setError);
  };

  const handleSignUp = async () => {
    if (password === confirmPasword) {
      await register(username, email, password, setError);
    } else {
      console.log('password must be the same!');
    }
  };

  return (
    <div
      className={`w-full flex flex-col items-center  justify-center p-6 sm:p-10 bg-gray-50 sm:max-w-full ${
        isLogin ? '' : 'bg-gray-50'
      }`}
    >
      <img
        src={img}
        alt="Logo"
        width={100}
        height={100}
        className="mb-4 sm:mb-6"
      />
      <p className="text-xl sm:text-2xl font-semibold text-gray-800 mb-6 sm:mb-8">
        {isLogin ? 'Log In' : 'Sign Up'}
      </p>
      {error && <ErrorMessage value={error} />}
      <div className="w-full mb-4 sm:mb-6">
        <label className="text-gray-800 font-bold block mb-2">E-mail</label>
        <div className="flex items-center gap-2 p-3 sm:p-4 border rounded-md">
          <i className="fa-solid fa-envelope fa-flip-horizontal text-sky-700"></i>
          <input
            type="text"
            className="w-full outline-none bg-gray-50"
            placeholder="example@web.com"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>

      <div className="w-full mb-4 sm:mb-6">
        <label className="text-gray-800 font-bold block mb-2">Password</label>
        <div className="flex items-center gap-2 p-3 sm:p-4 border rounded-md">
          <i className="fa-solid fa-key text-sky-700"></i>
          <input
            type={showPassword ? 'text' : 'password'}
            className="w-full outline-none bg-gray-50"
            placeholder="*********************"
            onChange={(e) => setPassword(e.target.value)}
          />
          {showPassword ? (
            <i
              onClick={() => setShowPassword((prevState) => !prevState)}
              className="fa-regular fa-eye"
            ></i>
          ) : (
            <i
              onClick={() => setShowPassword((prevState) => !prevState)}
              className="fa-regular fa-eye-slash"
            ></i>
          )}
        </div>
      </div>

      {!isLogin && (
        <>
          <div className="w-full mb-6 sm:mb-8">
            <label className="text-gray-800 font-bold block mb-2">
              Confirm password
            </label>
            <div className="flex items-center gap-2 p-3 sm:p-4 border rounded-md">
              <i className="fa-solid fa-key text-sky-700"></i>
              <input
                type="password"
                className="w-full outline-none bg-gray-50"
                placeholder="*********************"
                onChange={(e) => setConfirmPasword(e.target.value)}
              />
            </div>
          </div>
          <div className="w-full mb-6 sm:mb-8">
            <label className="text-gray-800 font-bold block mb-2">
              Username
            </label>
            <div className="flex items-center gap-2 p-3 sm:p-4 border rounded-md">
              <i className="fa-solid fa-key text-sky-700"></i>
              <input
                type="text"
                className="w-full outline-none bg-gray-50"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>
        </>
      )}

      <button
        className="w-full p-3 sm:p-4 bg-sky-600 text-white rounded-md hover:bg-sky-700"
        onClick={isLogin ? handleSignIn : handleSignUp}
      >
        {isLogin ? 'Sign In' : 'Sign Up'}
      </button>
    </div>
  );
};
AuthForm.propTypes = {
  type: PropTypes.string.isRequired,
};

export default AuthForm;
