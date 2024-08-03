import React, { useState } from 'react';
import { TailSpin } from 'react-loader-spinner'; // Import the loader

const Form = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [qrCode, setQrCode] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return; // Prevent multiple submissions

    const formData = {
      name: name,
      email: email,
    };

    setLoading(true);
    setMessage('');
    setQrCode('');

    try {
      const response = await fetch('https://form-response-server-production.up.railway.app/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message);
      }

      setMessage(result.message);
      setQrCode(result.qrCode);
    } catch (error) {
      console.error('Error:', error);
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center p-4 bg-gray-100 min-h-dvh">
      <div className="w-full max-w-md p-4 bg-white rounded-md shadow-md">
        <h1 className="mb-4 text-2xl font-bold text-center">Sign up for Campus Quest 3.0</h1>
        {!qrCode ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>  
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className={`w-full px-4 py-2 font-semibold text-white bg-blue-600 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Submit'}
            </button>
          </form>
        ) : (
          <div className="text-center">
            <p className="text-green-500">{message}</p>
            {qrCode && <img src={`data:image/png;base64,${qrCode}`} alt="QR Code" className="mx-auto mt-4" />}
          </div>
        )}
        {loading && (
          <div className="flex justify-center mt-4">
            <TailSpin color="#00BFFF" height={80} width={80} />
          </div>
        )}
        {message && !qrCode && (
          <p className={`mt-4 text-center ${message.includes('Error') ? 'text-red-500' : 'text-green-500'}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default Form;
