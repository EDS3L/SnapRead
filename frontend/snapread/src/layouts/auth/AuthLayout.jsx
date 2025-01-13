import { useState } from 'react';
import '../../index.css';
import AuthForm from '../../components/auth/AuthForm';

const AuthLayout = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isSliding, setIsSliding] = useState(false);
  const handleToggle = () => {
    setIsSliding(true);
    setTimeout(() => {
      setIsLogin(!isLogin);
      setIsSliding(false);
    }, 500);
  };

  return (
    <div className="flex items-center justify-center w-screen min-h-screen bg-gray-100">
      <div className="relative w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="grid grid-cols-1 sm:grid-cols-2 h-full">
          <div className="flex flex-col items-center justify-center p-6 sm:p-10 bg-gradient-to-br from-sky-500 to-sky-700 text-white">
            <h1 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6">
              {isLogin ? 'Welcome Back!' : 'Join Us!'}
            </h1>
            <p className="text-md sm:text-lg mb-6 sm:mb-8">
              {isLogin
                ? 'Log in to access your account and continue where you left off.'
                : 'Sign up to start your journey with us today!'}
            </p>
            <button
              onClick={handleToggle}
              className="px-6 sm:px-8 py-2 sm:py-3 bg-white text-sky-600 font-semibold rounded-md shadow-md hover:bg-gray-100 transition"
            >
              {isLogin ? 'Create Account' : 'Log In'}
            </button>
          </div>

          <div
            className={`transition-transform duration-500 ${
              isSliding ? 'translate-x-full' : 'translate-x-0'
            }`}
          >
            {isLogin ? <AuthForm type="login" /> : <AuthForm type="signup" />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
