'use client';
import { useState } from 'react';

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    const hardcodedEmail = 'admin@example.com';
    const hardcodedPassword = 'password123';

    if (email === hardcodedEmail && password === hardcodedPassword) {
      sessionStorage.setItem('isUser', 'true');
      onLogin();
    } else {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-6 bg-[#f4c7ffca] text-[#96034f] rounded-md shadow-xl">
        <h2 className="text-2xl font-light uppercase text-center mb-4">Login to dashboard</h2>
        {error && <p className="text-red-500 text-center mb-2">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#96034f]"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#96034f]"
        />
        <button
          onClick={handleLogin}
          className="w-full py-2 bg-[#96034f] text-white rounded-md hover:bg-[#96034f98] uppercase transition duration-200"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
