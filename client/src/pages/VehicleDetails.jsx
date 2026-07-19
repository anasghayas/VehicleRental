import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { toast } from 'sonner';
import LoadingSpinner from '../components/LoadingSpinner';

export default function VehicleDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Booking Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingError, setBookingError] = useState('');

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const response = await api.get(`/vehicles/${id}`);
        setVehicle(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load vehicle details');
      } finally {
        setLoading(false);
      }
    };
    fetchVehicle();
  }, [id]);

  // Dynamically calculate the total price based on selected dates
  useEffect(() => {
    if (startDate && endDate && vehicle) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diffTime = end - start;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
      
      // Minimum 1 day rental
      const days = diffDays > 0 ? diffDays : 1;
      setTotalPrice(days * vehicle.pricePerDay);
    } else {
      setTotalPrice(0);
    }
  }, [startDate, endDate, vehicle]);

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setBookingLoading(true);
    setBookingError('');

    if (new Date(endDate) < new Date(startDate)) {
      setBookingError("End date cannot be before start date!");
      setBookingLoading(false);
      return;
    }

    try {
      await api.post('/bookings', {
        vehicleId: vehicle._id,
        startDate,
        endDate,
        totalPrice
      });
      toast.success('Booking requested successfully! Waiting for Agency approval.');
      setIsModalOpen(false);
      navigate('/dashboard'); 
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create booking.');
      setBookingError(err.response?.data?.message || 'Failed to create booking. Please make sure you are logged in as a Customer.');
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) return <LoadingSpinner text="Loading vehicle details..." fullScreen />;
  if (error) return <div className="text-center py-20 text-xl font-medium text-red-500 bg-red-50 mx-6 mt-10 rounded-xl">{error}</div>;
  if (!vehicle) return <div className="text-center py-20 text-xl font-medium text-muted-foreground">Vehicle not found</div>;

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 relative">
      <Link to="/" className="text-primary font-bold mb-8 inline-block hover:underline bg-primary/10 px-4 py-2 rounded-lg">
        &larr; Back to browsing
      </Link>
      
      <div className="bg-card rounded-3xl shadow-lg border border-border overflow-hidden flex flex-col md:flex-row">
        
        {/* Left Side: Beautiful Image Display */}
        <div className="md:w-1/2 bg-background flex items-center justify-center p-8 border-r border-border relative">
          {vehicle.imageUrl ? (
            <img src={vehicle.imageUrl} alt={vehicle.name} className="w-full h-auto object-contain rounded-2xl shadow-xl transform transition-transform hover:scale-105 duration-500" />
          ) : (
            <div className="w-full aspect-[4/3] flex items-center justify-center text-muted-foreground bg-secondary rounded-2xl">
              No Image Available
            </div>
          )}
        </div>

        {/* Right Side: Detailed Info */}
        <div className="md:w-1/2 p-10 flex flex-col justify-between bg-card">
          <div>
            <span className="inline-block px-4 py-1.5 bg-muted text-foreground border border-border font-bold text-xs uppercase tracking-widest rounded-full mb-5 shadow-sm">
              {vehicle.type === '4W' ? 'Car' : 'Bike/Scooter'}
            </span>
            
            <h1 className="text-4xl font-extrabold text-foreground mb-2 leading-tight">
              {vehicle.brand} {vehicle.name} <span className="text-muted-foreground font-medium text-3xl">({vehicle.modelYear})</span>
            </h1>
            
            <p className="text-muted-foreground font-medium text-lg mb-8 flex items-center gap-2">
              📍 Available in <span className="text-foreground font-bold bg-muted px-3 py-1 rounded-md">{vehicle.location}</span>
            </p>

            <div className="grid grid-cols-2 gap-6 mb-8 border-y border-border py-6">
              <div>
                <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider mb-1">Fuel Type</p>
                <p className="text-lg font-bold text-foreground">{vehicle.fuelType}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider mb-1">Transmission</p>
                <p className="text-lg font-bold text-foreground">{vehicle.transmission}</p>
              </div>
              
              <div className="col-span-2 bg-muted p-5 rounded-2xl border border-border flex flex-col">
                <p className="text-xs text-primary uppercase font-bold tracking-widest mb-2">Verified Agency</p>
                <p className="text-xl font-bold text-foreground">{vehicle.agencyId?.agencyName || 'Independent Agency'}</p>
                <p className="text-primary font-medium mt-1">📞 {vehicle.agencyId?.phone || 'Contact not provided'}</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              Rental Pricing <span className="text-sm font-normal text-muted-foreground bg-muted px-2 py-1 rounded-md">Flexible Packages</span>
            </h3>
            
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-card p-4 rounded-2xl border border-border text-center shadow-sm hover:border-primary hover:shadow-md transition-all cursor-default">
                <p className="text-xs text-muted-foreground font-bold uppercase mb-2">Daily</p>
                <p className="text-2xl font-bold text-primary">₹{vehicle.pricePerDay}</p>
              </div>
              <div className="bg-card p-4 rounded-2xl border border-border text-center shadow-sm hover:border-primary hover:shadow-md transition-all cursor-default">
                <p className="text-xs text-muted-foreground font-bold uppercase mb-2">Weekly</p>
                <p className="text-2xl font-bold text-primary">₹{vehicle.pricePerWeek}</p>
              </div>
              <div className="bg-card p-4 rounded-2xl border border-border text-center shadow-sm hover:border-primary hover:shadow-md transition-all cursor-default">
                <p className="text-xs text-muted-foreground font-bold uppercase mb-2">Monthly</p>
                <p className="text-2xl font-bold text-primary">₹{vehicle.pricePerMonth}</p>
              </div>
            </div>

            <Button 
              onClick={() => {
                if (!user) {
                  navigate('/login');
                } else {
                  setIsModalOpen(true);
                }
              }}
              className="w-full h-16 text-xl font-bold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all bg-primary hover:bg-primary/90 text-primary-foreground rounded-2xl"
            >
              Proceed to Book
            </Button>
            <p className="text-center text-sm text-muted-foreground mt-4 font-medium flex items-center justify-center gap-1">
              🔒 Payment gateway coming in Phase 6
            </p>
          </div>
        </div>
      </div>

      {/* Booking Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-3xl p-8 max-w-md w-full shadow-2xl relative">
            
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground text-2xl font-bold"
            >
              &times;
            </button>
            
            <h2 className="text-2xl font-bold text-foreground mb-6">Complete Your Booking</h2>
            
            {bookingError && (
              <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium border border-red-100">
                {bookingError}
              </div>
            )}

            <form onSubmit={handleBookingSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="startDate" className="font-bold">Start Date</Label>
                <Input 
                  type="date" 
                  id="startDate" 
                  required 
                  value={startDate}
                  min={new Date().toISOString().split('T')[0]} // Prevents selecting past dates
                  onChange={(e) => setStartDate(e.target.value)} 
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="endDate" className="font-bold">End Date</Label>
                <Input 
                  type="date" 
                  id="endDate" 
                  required 
                  value={endDate}
                  min={startDate || new Date().toISOString().split('T')[0]} 
                  onChange={(e) => setEndDate(e.target.value)} 
                  className="h-12"
                />
              </div>

              <div className="bg-background p-4 rounded-xl border border-border">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-muted-foreground font-medium">Rate:</span>
                  <span className="font-bold">₹{vehicle.pricePerDay} / day</span>
                </div>
                <div className="flex justify-between items-center text-xl">
                  <span className="text-foreground font-bold">Total Price:</span>
                  <span className="font-bold text-primary">₹{totalPrice}</span>
                </div>
              </div>

              <Button type="submit" className="w-full h-14 text-lg font-bold rounded-xl" disabled={bookingLoading}>
                {bookingLoading ? 'Processing Request...' : 'Confirm Request'}
              </Button>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
