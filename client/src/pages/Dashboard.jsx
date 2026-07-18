import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    // Redirect them to their respective dashboard pages based on JWT token payload
    const role = user?.role;
    if (role === 'agency') {
      navigate('/agency/fleet');
    } else if (role === 'customer') {
      navigate('/customer/rentals');
    } else if (role === 'admin') {
      navigate('/admin/dashboard');
    } else {
      // If no role is found (or logged out), send to home
      navigate('/');
    }
  }, [navigate, user]);

  return (
    <div className="flex items-center justify-center h-screen bg-background">
      <div className="text-xl text-muted-foreground font-medium">Redirecting to your dashboard...</div>
    </div>
  );
}
