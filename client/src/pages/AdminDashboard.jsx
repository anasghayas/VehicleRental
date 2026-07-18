import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import LoadingSpinner from '../components/LoadingSpinner';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await api.get('/admin/analytics');
        setStats(response.data);
      } catch (err) {
        setError('Failed to load admin analytics');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) return <LoadingSpinner text="Loading analytics..." fullScreen />;
  if (error) return <div className="text-center text-red-500 mt-20 bg-red-50 p-4 rounded-lg inline-block">{error}</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-foreground mb-8">Admin Dashboard ⚡</h1>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="bg-card p-6 rounded-2xl shadow-sm border border-border flex flex-col items-center justify-center hover:shadow-md transition-shadow">
          <p className="text-muted-foreground text-sm font-bold uppercase tracking-wider mb-2">Total Revenue</p>
          <p className="text-4xl font-extrabold text-green-600">₹{stats.revenue.toLocaleString()}</p>
        </div>
        
        <div className="bg-card p-6 rounded-2xl shadow-sm border border-border flex flex-col items-center justify-center hover:shadow-md transition-shadow">
          <p className="text-muted-foreground text-sm font-bold uppercase tracking-wider mb-2">Total Bookings</p>
          <p className="text-4xl font-extrabold text-primary">{stats.bookings}</p>
        </div>

        <div className="bg-card p-6 rounded-2xl shadow-sm border border-border flex flex-col items-center justify-center hover:shadow-md transition-shadow">
          <p className="text-muted-foreground text-sm font-bold uppercase tracking-wider mb-2">Vehicles Listed</p>
          <p className="text-4xl font-extrabold text-indigo-600">{stats.vehicles}</p>
        </div>

        <div className="bg-card p-6 rounded-2xl shadow-sm border border-border flex flex-col items-center justify-center hover:shadow-md transition-shadow">
          <p className="text-muted-foreground text-sm font-bold uppercase tracking-wider mb-2">Total Users</p>
          <p className="text-4xl font-extrabold text-purple-600">{stats.customers + stats.agencies}</p>
        </div>
      </div>

      {/* Admin Navigation Cards */}
      <h2 className="text-2xl font-bold text-foreground mb-6">Quick Links</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link to="/admin/users" className="block group">
          <div className="bg-card p-8 rounded-2xl shadow-sm border border-border hover:border-primary hover:shadow-md transition-all h-full">
            <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">Manage Users</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">Approve new agencies and view all registered users.</p>
          </div>
        </Link>
        
        <Link to="/admin/vehicles" className="block group">
          <div className="bg-card p-8 rounded-2xl shadow-sm border border-border hover:border-primary hover:shadow-md transition-all h-full">
            <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">Manage Vehicles</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">Review and approve newly listed vehicles from agencies.</p>
          </div>
        </Link>

        <Link to="/admin/bookings" className="block group">
          <div className="bg-card p-8 rounded-2xl shadow-sm border border-border hover:border-primary hover:shadow-md transition-all h-full">
            <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">All Bookings</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">Monitor all platform transactions and booking history.</p>
          </div>
        </Link>
      </div>

    </div>
  );
}
