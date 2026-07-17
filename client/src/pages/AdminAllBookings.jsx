import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import { format } from 'date-fns';
import LoadingSpinner from '../components/LoadingSpinner';

export default function AdminAllBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await api.get('/admin/bookings');
      setBookings(response.data);
    } catch (err) {
      setError('Failed to load bookings.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending': return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">Pending</span>;
      case 'approved': return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">Approved</span>;
      case 'rejected': return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">Rejected</span>;
      case 'completed': return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Completed</span>;
      default: return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 capitalize">{status}</span>;
    }
  };

  if (loading) return <LoadingSpinner text="Loading platform bookings..." fullScreen />;
  if (error) return <div className="text-center text-red-500 mt-20 bg-red-50 p-4 rounded-lg inline-block">{error}</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">All Platform Bookings 📜</h1>
      
      <div className="bg-white shadow-sm border border-gray-200 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 font-medium border-b border-gray-200">
              <tr>
                <th className="px-6 py-4">Booking ID</th>
                <th className="px-6 py-4">Vehicle</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Agency</th>
                <th className="px-6 py-4">Dates</th>
                <th className="px-6 py-4">Total Price</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {bookings.map(booking => (
                <tr key={booking._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-xs font-mono text-gray-500">
                    {booking._id.substring(18)}
                  </td>
                  <td className="px-6 py-4">
                    {booking.vehicleId ? (
                      <div>
                        <div className="font-bold text-gray-900">{booking.vehicleId.brand} {booking.vehicleId.name}</div>
                        <div className="text-gray-500 text-xs">{booking.vehicleId.vehicleNumber}</div>
                      </div>
                    ) : (
                      <span className="text-gray-400 italic">Vehicle Deleted</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {booking.customerId ? (
                      <div>
                        <div className="font-medium text-gray-900">{booking.customerId.name}</div>
                        <div className="text-gray-500 text-xs">{booking.customerId.email}</div>
                      </div>
                    ) : (
                      <span className="text-gray-400 italic">User Deleted</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {booking.agencyId ? (
                      <div>
                        <div className="font-medium text-gray-900">{booking.agencyId.agencyName}</div>
                        <div className="text-gray-500 text-xs">{booking.agencyId.email}</div>
                      </div>
                    ) : (
                      <span className="text-gray-400 italic">Agency Deleted</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-gray-900">{format(new Date(booking.startDate), 'MMM dd, yyyy')}</div>
                    <div className="text-gray-500 text-xs">to {format(new Date(booking.endDate), 'MMM dd, yyyy')}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-bold text-green-600">₹{booking.totalPrice}</span>
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(booking.status)}
                  </td>
                </tr>
              ))}
              {bookings.length === 0 && (
                <tr>
                  <td colSpan="7" className="px-6 py-8 text-center text-gray-500">
                    No bookings found on the platform yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
