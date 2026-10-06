"use client";

import { useState } from "react";
import Link from "next/link";

export default function VerifyPickupPage() {
  const [code, setCode] = useState("");
  const [message, setMessage] = useState(null);
  const [isError, setIsError] = useState(false);

  const handleVerify = async (e) => {
    e.preventDefault();
    setMessage(null); // Clear old messages

    try {
      const response = await fetch('/api/reservations', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pickupCode: code })
      });

      const result = await response.json();

      if (response.ok) {
        setIsError(false);
        setMessage(`✅ ${result.message} (${result.data.foodName})`);
        setCode(""); // Clear the input box for the next customer
      } else {
        setIsError(true);
        setMessage(`❌ ${result.error}`);
      }
    } catch (error) {
      setIsError(true);
      setMessage("❌ Network error occurred.");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md border-t-4 border-green-600">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Verify Pickup</h1>
        <p className="text-gray-500 mb-6 text-sm">Enter the 4-digit code provided by the customer.</p>

        <form onSubmit={handleVerify} className="space-y-4">
          <input 
            type="text" 
            maxLength="4"
            placeholder="e.g., 4921" 
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full text-center text-3xl tracking-widest font-bold border border-gray-300 rounded-md p-4 focus:ring-green-500 focus:border-green-500 text-gray-900"
            required
          />
          
          <button 
            type="submit" 
            className="w-full bg-green-600 text-white font-bold py-3 rounded-md hover:bg-green-700 transition"
          >
            Verify Order
          </button>
        </form>

        {/* Feedback Message Box */}
        {message && (
          <div className={`mt-6 p-4 rounded-md font-medium text-center ${isError ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
            {message}
          </div>
        )}

        <div className="mt-6 text-center">
          <Link href="/add-food" className="text-green-600 hover:underline text-sm font-medium">
            &larr; Back to Add Food
          </Link>
        </div>
      </div>
    </main>
  );
}