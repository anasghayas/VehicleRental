import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import { Button } from '../components/ui/button';
import { toast } from 'sonner';
import LoadingSpinner from '../components/LoadingSpinner';

export default function AgencyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [actionLoading, setActionLoading] = useState(null); 

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await api.get('/bookings/agency');
      setBookings(response.data);
    } catch (err) {
      setError('Failed to load agency bookings.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (bookingId, newStatus) => {
    setActionLoading(bookingId);
    try {
      await api.put(`/bookings/${bookingId}/status`, { status: newStatus });

      setBookings((prevBookings) => 
        prevBookings.map((b) => b._id === bookingId ? { ...b, status: newStatus } : b)
      );
      toast.success(`Booking ${newStatus} successfully`);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || 'Failed to update status');
    } finally {
      setActionLoading(null);
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

  if (loading) return <div className="text-center mt-20 text-muted-foreground font-medium">Loading requests...</div>;
  if (error) return <div className="text-center text-red-500 mt-20 bg-red-50 p-4 rounded-lg inline-block">{error}</div>;

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6">
      <h2 className="text-3xl font-bold text-foreground mb-8">Manage Booking Requests 📥</h2>

      {bookings.length === 0 ? (
        <div className="text-center p-12 bg-card rounded-2xl border border-border shadow-sm">
          <p className="text-muted-foreground text-lg">No booking requests found for your vehicles.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {bookings.map((booking) => (
            <div key={booking._id} className="bg-card rounded-2xl shadow-sm border border-border p-6 flex flex-col justify-between">
              
              <div>
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-foreground">
                    {booking.vehicleId?.brand} {booking.vehicleId?.name}
                  </h3>
                  <span className={`px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full border ${getStatusColor(booking.status)}`}>
                    {booking.status}
                  </span>
                </div>
                
                <div className="bg-background p-4 rounded-xl border border-border mb-4">
                  <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider mb-2">Customer Details</p>
                  <p className="font-bold text-foreground">{booking.customerId?.name || 'Unknown Customer'}</p>
                  <p className="text-sm text-muted-foreground font-medium mt-1">📧 {booking.customerId?.email}</p>
                  <p className="text-sm text-muted-foreground font-medium mt-1">📞 {booking.customerId?.phone}</p>
                </div>

                <div className="flex justify-between items-center bg-muted p-4 rounded-xl border border-border mb-6">
                  <div>
                    <p className="text-xs text-primary font-bold uppercase tracking-wider mb-1">Duration</p>
                    <p className="text-sm font-medium text-foreground">
                      {new Date(booking.startDate).toLocaleDateString()} - {new Date(booking.endDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-primary font-bold uppercase tracking-wider mb-1">Expected Earnings</p>
                    <p className="text-lg font-bold text-primary">₹{booking.totalPrice}</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              {booking.status === 'pending' && (
                <div className="flex gap-4 border-t border-border pt-4 mt-2">
                  <Button 
                    className="flex-1 bg-green-600 hover:bg-green-700 text-primary-foreground font-bold h-12 rounded-xl shadow-sm transition-all"
                    onClick={() => handleStatusUpdate(booking._id, 'approved')}
                    disabled={actionLoading === booking._id}
                  >
                    {actionLoading === booking._id ? 'Updating...' : 'Approve Request'}
                  </Button>
                  <Button 
                    variant="outline"
                    className="flex-1 text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 font-bold h-12 rounded-xl transition-all"
                    onClick={() => handleStatusUpdate(booking._id, 'rejected')}
                    disabled={actionLoading === booking._id}
                  >
                    {actionLoading === booking._id ? 'Updating...' : 'Reject'}
                  </Button>
                </div>
              )}

              {booking.status === 'approved' && (
                <div className="border-t border-border pt-4 mt-2">
                   <Button 
                    variant="outline"
                    className="w-full text-primary border-blue-200 hover:bg-primary/10 hover:text-primary font-bold h-12 rounded-xl transition-all"
                    onClick={() => handleStatusUpdate(booking._id, 'completed')}
                    disabled={actionLoading === booking._id}
                  >
                    {actionLoading === booking._id ? 'Updating...' : 'Mark as Completed (Vehicle Returned)'}
                  </Button>
                </div>
              )}

            </div>
          ))}
        </div>
      )}
    </div>
  );
}
