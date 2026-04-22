"use client";

import { useState, useEffect } from "react";

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeReviewId, setActiveReviewId] = useState(null);
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('/api/orders');
        const result = await response.json();
        setOrders(result.data);
      } catch (error) {
        console.error("Failed to load orders:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const handleSubmitReview = async (orderId) => {
    try {
      await fetch('/api/orders', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId, rating, reviewText })
      });

      setActiveReviewId(null);
      setRating(5);
      setReviewText("");
    } catch (error) {
      console.error("Review failed");
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Order History</h1>
        
        {/* Order History */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-100 bg-gray-50">
            <h2 className="text-xl font-bold text-gray-800">My Orders</h2>
          </div>
          
          {loading ? (
            <div className="p-8 text-center text-gray-500">Loading your history...</div>
          ) : (
            <div className="divide-y divide-gray-100">
              {orders.map((order) => (
                <div key={order._id} className="p-6 flex flex-col md:flex-row justify-between items-center gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 capitalize">{order.foodName}</h3>
                    <p className="text-sm text-gray-500">Pickup Code: <span className="font-mono bg-gray-100 px-2 py-1 rounded">{order.pickupCode}</span></p>
                    
                    <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-bold ${
                      order.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.status}
                    </span>

                    {order.status === 'Completed' && !order.rating && activeReviewId !== order._id && (
                      <button onClick={() => setActiveReviewId(order._id)}>
                        ★ Leave Review
                      </button>
                    )}

                    {order.rating && (
                      <div>
                        {"★".repeat(order.rating)}{"☆".repeat(5 - order.rating)}
                        <p>"{order.reviewText}"</p>
                      </div>
                    )}

                    {activeReviewId === order._id && (
                      <div>
                        <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
                          <option value="5">5 Stars</option>
                          <option value="4">4 Stars</option>
                          <option value="3">3 Stars</option>
                          <option value="2">2 Stars</option>
                          <option value="1">1 Star</option>
                        </select>

                        <input
                          value={reviewText}
                          onChange={(e) => setReviewText(e.target.value)}
                          placeholder="Write review"
                        />

                        <button onClick={() => handleSubmitReview(order._id)}>
                          Submit
                        </button>
                      </div>
                    )}
                  
                  </div>
                </div>
              ))}
              {orders.length === 0 && <div className="p-8 text-center text-gray-500">No orders yet.</div>}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
