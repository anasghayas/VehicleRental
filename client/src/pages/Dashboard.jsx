import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    // Check local storage to see who is logged in
    const role = localStorage.getItem('role');
    
    // Redirect them to their respective dashboard pages
    if (role === 'agency') {
      navigate('/agency/fleet');
    } else if (role === 'customer') {
      navigate('/customer/rentals');
    } else {
      // If no role is found (or logged out), send to home
      navigate('/');
    }
  }, [navigate]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="text-xl text-gray-500 font-medium">Redirecting to your dashboard...</div>
    </div>
  );
}
