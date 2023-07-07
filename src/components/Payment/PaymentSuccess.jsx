import React from 'react';
import { Link } from 'react-router-dom';

const PaymentSuccessPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-teal-300 to-blue-300 text-white">
      <img
        src="https://i.pinimg.com/originals/32/b6/f2/32b6f2aeeb2d21c5a29382721cdc67f7.gif"
        alt="Payment Success GIF"
        className="w-64 h-60 mb-8 rounded-full border-4 border-white"
      />
      <h2 className="text-4xl font-extrabold mb-4">Payment Successful!</h2>
      <p className="text-lg mb-8">Thank you for your payment. Your transaction was successful.</p>
      <Link
        to="/"
        className="bg-white text-purple-500 font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-purple-500 hover:text-white transition duration-300"
      >
        Go to Home
      </Link>
    </div>
  );
};

export default PaymentSuccessPage;
