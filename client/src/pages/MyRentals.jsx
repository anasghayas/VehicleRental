import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import { Button } from '../components/ui/button';

export default function MyRentals() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchMyBookings();
  }, []);

  const fetchMyBookings = async () => {
    try {
      const response = await api.get('/api/bookings/my-bookings');
      setBookings(response.data);
    } catch (err) {
      setError('Failed to load your rental history.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
      case 'completed': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'cancelled': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-yellow-100 text-yellow-800 border-yellow-200'; // pending
    }
  };

  if (loading) return <div className="text-center mt-20 text-gray-500 font-medium">Loading your rentals...</div>;
  if (error) return <div className="text-center text-red-500 mt-20 bg-red-50 p-4 rounded-lg inline-block">{error}</div>;

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">My Rental History 📋</h2>

      {bookings.length === 0 ? (
        <div className="text-center p-12 bg-white rounded-2xl border border-gray-100 shadow-sm">
          <p className="text-gray-500 mb-6 text-lg">You haven't requested any vehicles yet.</p>
          <Link to="/">
            <Button className="h-12 px-8 text-lg font-bold">Browse Vehicles</Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {bookings.map((booking) => (
            <div key={booking._id} className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 p-6 flex flex-col md:flex-row gap-6">
              
              {/* Vehicle Image */}
              <div className="w-full md:w-56 h-40 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0 border border-gray-100">
                {booking.vehicleId?.imageUrl ? (
                  <img src={booking.vehicleId.imageUrl} alt="Vehicle" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                    No Image
                  </div>
                )}
              </div>

              {/* Booking Details */}
              <div className="flex-grow flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-2xl font-bold text-gray-900">
                      {booking.vehicleId?.brand} {booking.vehicleId?.name}
                    </h3>
                    <span className={`px-4 py-1.5 text-xs font-bold uppercase tracking-widest rounded-full border shadow-sm ${getStatusColor(booking.status)}`}>
                      {booking.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 font-medium mb-4 flex gap-4 bg-gray-50 inline-block px-3 py-1.5 rounded-lg border border-gray-100">
                    <span>From: <strong className="text-gray-900">{new Date(booking.startDate).toLocaleDateString()}</strong></span>
                    <span>&rarr;</span>
                    <span>To: <strong className="text-gray-900">{new Date(booking.endDate).toLocaleDateString()}</strong></span>
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-t border-gray-100 pt-4 mt-2">
                  <div>
                    <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Total Due</p>
                    <p className="text-2xl font-bold text-primary">₹{booking.totalPrice}</p>
                  </div>
                  <div className="text-left sm:text-right mt-4 sm:mt-0 bg-blue-50 px-4 py-2 rounded-xl border border-blue-100">
                    <p className="text-xs text-blue-600 font-bold uppercase tracking-wider mb-1">Agency Contact</p>
                    <p className="font-bold text-blue-950">{booking.agencyId?.agencyName || 'Unknown Agency'}</p>
                    <p className="text-sm text-blue-800 font-medium">📞 {booking.agencyId?.phone}</p>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}
