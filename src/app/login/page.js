"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRole, setSelectedRole] = useState("consumer");
  const [selectedRestaurant, setSelectedRestaurant] = useState("");

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await fetch('/api/restaurants');
        const result = await response.json();
        
        const approved = (result.data || []).filter(r => r.status === 'Approved');
        
        setRestaurants(approved);
        if (approved.length > 0) setSelectedRestaurant(JSON.stringify(approved[0]));
      } catch (error) {
        console.error("Failed to load restaurants. API might be missing.");
      }
    };
    fetchRestaurants();
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    
    let userSession = { role: selectedRole };

    if (selectedRole === "restaurant") {
      const restData = JSON.parse(selectedRestaurant);
      userSession = { 
        role: "restaurant", 
        id: restData._id, 
        name: restData.name, 
        address: restData.address || restData.contactInfo // Fallback for old data
      };
    }

    // Save the "session" to the browser's local storage
    localStorage.setItem("ecoBiteUser", JSON.stringify(userSession));
    
    // Redirect them based on their role
    if (selectedRole === "admin") router.push('/admin');
    else if (selectedRole === "restaurant") router.push('/add-food');
    else router.push('/food');
  };

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-md border-t-4 border-green-600">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">Development Login</h1>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Your Role</label>
            <div className="grid grid-cols-3 gap-2">
              {['consumer', 'restaurant', 'admin'].map((role) => (
                <button
                  key={role}
                  type="button"
                  onClick={() => setSelectedRole(role)}
                  className={`p-2 text-sm font-bold rounded-md capitalize transition ${
                    selectedRole === role ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>
          </div>

          {selectedRole === "restaurant" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Which Restaurant?</label>
              <select 
                value={selectedRestaurant}
                onChange={(e) => setSelectedRestaurant(e.target.value)}
                className="w-full border border-gray-500 rounded-md p-3 focus:ring-green-500 focus:border-green-500 bg-gray-500"
              >
                {restaurants.map(r => (
                  <option key={r._id} value={JSON.stringify(r)}>{r.name}</option>
                ))}
              </select>
            </div>
          )}

          <button type="submit" className="w-full bg-gray-900 text-white font-bold py-3 rounded-md hover:bg-gray-800 transition">
            Log In
          </button>
        </form>
      </div>
    </main>
  );
}