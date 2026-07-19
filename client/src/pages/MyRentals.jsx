import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import { Button } from '../components/ui/button';
import LoadingSpinner from '../components/LoadingSpinner';

export default function MyRentals() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchMyBookings();
  }, []);

  const fetchMyBookings = async () => {
    try {
      const response = await api.get('/bookings/my-bookings');
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
      case 'completed': return 'bg-primary/20 text-primary border-blue-200';
      case 'cancelled': return 'bg-muted text-foreground border-border';
      default: return 'bg-yellow-100 text-yellow-800 border-yellow-200'; // pending
    }
  };

  if (loading) return <LoadingSpinner text="Loading your rentals..." fullScreen />;
  if (error) return <div className="text-center text-red-500 mt-20 bg-red-50 p-4 rounded-lg inline-block">{error}</div>;

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6">
      <h2 className="text-3xl font-bold text-foreground mb-8">My Rental History 📋</h2>

      {bookings.length === 0 ? (
        <div className="text-center p-12 bg-card rounded-2xl border border-border shadow-sm">
          <p className="text-muted-foreground mb-6 text-lg">You haven't requested any vehicles yet.</p>
          <Link to="/">
            <Button className="h-12 px-8 text-lg font-bold">Browse Vehicles</Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {bookings.map((booking) => (
            <div key={booking._id} className="bg-card rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-border p-6 flex flex-col md:flex-row gap-6">
              
              {/* Vehicle Image */}
              <div className="w-full md:w-56 h-40 bg-background rounded-xl overflow-hidden flex-shrink-0 border border-border">
                {booking.vehicleId?.imageUrl ? (
                  <img src={booking.vehicleId.imageUrl} alt="Vehicle" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">
                    No Image
                  </div>
                )}
              </div>

              {/* Booking Details */}
              <div className="flex-grow flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-2xl font-bold text-foreground">
                      {booking.vehicleId?.brand} {booking.vehicleId?.name}
                    </h3>
                    <span className={`px-4 py-1.5 text-xs font-bold uppercase tracking-widest rounded-full border shadow-sm ${getStatusColor(booking.status)}`}>
                      {booking.status === 'pending' ? 'Pending (Agency Approval)' : booking.status}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground font-medium mb-4 flex gap-4 bg-background inline-block px-3 py-1.5 rounded-lg border border-border">
                    <span>From: <strong className="text-foreground">{new Date(booking.startDate).toLocaleDateString()}</strong></span>
                    <span>&rarr;</span>
                    <span>To: <strong className="text-foreground">{new Date(booking.endDate).toLocaleDateString()}</strong></span>
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-t border-border pt-4 mt-2">
                  <div>
                    <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider mb-1">Total Due</p>
                    <p className="text-2xl font-bold text-primary">₹{booking.totalPrice}</p>
                  </div>
                  <div className="text-left sm:text-right mt-4 sm:mt-0 bg-muted px-4 py-2 rounded-xl border border-border">
                    <p className="text-xs text-primary font-bold uppercase tracking-wider mb-1">Agency Contact</p>
                    <p className="font-bold text-foreground">{booking.agencyId?.agencyName || 'Unknown Agency'}</p>
                    <p className="text-sm text-primary font-medium">📞 {booking.agencyId?.phone}</p>
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
