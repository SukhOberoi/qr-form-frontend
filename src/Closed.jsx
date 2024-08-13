import React from 'react';
import { FaInstagram } from "react-icons/fa6";


export default function Closed() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-4 text-center bg-white rounded-md shadow-md">
        <h1 className="text-2xl font-bold text-red-600">Submissions Closed</h1>
        <p className="my-4 text-gray-700">
          We regret to inform you that the form submissions are now closed. Thank you for your interest in Campus Quest Epilogue: Code, Compete, Excel.
        </p>
        <div>
        <p>Follow our Instagram for updates</p>
            <a href="https://www.instagram.com/srm_cn/" target="_blank">
              <div className="flex items-center justify-center text-xl text-pink-500">
                <FaInstagram />
                <p className="pb-1">srm_cn</p>
              </div>
            </a>
          </div>
        <p className="mt-2 text-gray-500">
          Please stay tuned for our upcoming events!
        </p>
      </div>
    </div>
  );
}
