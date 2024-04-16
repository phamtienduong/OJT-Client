import React, { useState } from 'react';

export const Payment = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');

  const handlePayment = () => {
    // Xử lý thanh toán ở đây
    console.log('Processing payment...');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-10 rounded-lg shadow-xl w-full max-w-lg">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">Payment Information</h2>
        <form className="space-y-4">
          <div>
            <label htmlFor="cardName" className="block text-gray-600 text-sm font-semibold mb-2">
              Cardholder Name
            </label>
            <input
              type="text"
              id="cardName"
              className="block w-full px-4 py-3 mb-2 text-gray-700 bg-white border rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label htmlFor="cardNumber" className="block text-gray-600 text-sm font-semibold mb-2">
              Card Number
            </label>
            <input
              type="text"
              id="cardNumber"
              className="block w-full px-4 py-3 mb-2 text-gray-700 bg-white border rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              placeholder="1234 5678 9123 4567"
            />
          </div>
          <div className="flex justify-between gap-3">
            <div className="w-1/2">
              <label htmlFor="expiryDate" className="block text-gray-600 text-sm font-semibold mb-2">
                Expiry Date
              </label>
              <input
                type="text"
                id="expiryDate"
                className="block w-full px-4 py-3 mb-2 text-gray-700 bg-white border rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                placeholder="MM/YY"
              />
            </div>
            <div className="w-1/2">
              <label htmlFor="cvc" className="block text-gray-600 text-sm font-semibold mb-2">
                CVC
              </label>
              <input
                type="text"
                id="cvc"
                className="block w-full px-4 py-3 mb-2 text-gray-700 bg-white border rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                placeholder="123"
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="w-full px-4 py-3 text-base font-semibold text-white bg-blue-600 rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Pay Now
            </button>
          </div>
        </form>
      </div>
    </div>
   
  );
};


