import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../utils/api';
import { Button } from '../components/ui/button';

export default function VehicleDetails() {
  const { id } = useParams();
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const response = await api.get(`/api/vehicles/${id}`);
        setVehicle(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load vehicle details');
      } finally {
        setLoading(false);
      }
    };

    fetchVehicle();
  }, [id]);

  if (loading) return <div className="text-center py-20 text-xl font-medium text-gray-500">Loading details...</div>;
  if (error) return <div className="text-center py-20 text-xl font-medium text-red-500 bg-red-50 mx-6 mt-10 rounded-xl">{error}</div>;
  if (!vehicle) return <div className="text-center py-20 text-xl font-medium text-gray-500">Vehicle not found</div>;

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <Link to="/" className="text-primary font-bold mb-8 inline-block hover:underline bg-blue-50 px-4 py-2 rounded-lg">
        &larr; Back to browsing
      </Link>
      
      <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden flex flex-col md:flex-row">
        
        {/* Left Side: Beautiful Image Display */}
        <div className="md:w-1/2 bg-gray-50 flex items-center justify-center p-8 border-r border-gray-100 relative">
          {vehicle.imageUrl ? (
            <img src={vehicle.imageUrl} alt={vehicle.name} className="w-full h-auto object-contain rounded-2xl shadow-xl transform transition-transform hover:scale-105 duration-500" />
          ) : (
            <div className="w-full aspect-[4/3] flex items-center justify-center text-gray-400 bg-gray-200 rounded-2xl">
              No Image Available
            </div>
          )}
        </div>

        {/* Right Side: Detailed Info */}
        <div className="md:w-1/2 p-10 flex flex-col justify-between bg-white">
          <div>
            <span className="inline-block px-4 py-1.5 bg-gray-900 text-white font-bold text-xs uppercase tracking-widest rounded-full mb-5 shadow-sm">
              {vehicle.type === '4W' ? 'Car' : 'Bike/Scooter'}
            </span>
            
            <h1 className="text-4xl font-extrabold text-gray-900 mb-2 leading-tight">
              {vehicle.brand} {vehicle.name} <span className="text-gray-400 font-medium text-3xl">({vehicle.modelYear})</span>
            </h1>
            
            <p className="text-gray-600 font-medium text-lg mb-8 flex items-center gap-2">
              📍 Available in <span className="text-gray-900 font-bold bg-gray-100 px-3 py-1 rounded-md">{vehicle.location}</span>
            </p>

            <div className="grid grid-cols-2 gap-6 mb-8 border-y border-gray-100 py-6">
              <div>
                <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Fuel Type</p>
                <p className="text-lg font-bold text-gray-900">{vehicle.fuelType}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Transmission</p>
                <p className="text-lg font-bold text-gray-900">{vehicle.transmission}</p>
              </div>
              
              {/* Agency Information Card */}
              <div className="col-span-2 bg-blue-50/50 p-5 rounded-2xl border border-blue-100 flex flex-col">
                <p className="text-xs text-blue-600 uppercase font-bold tracking-widest mb-2">Verified Agency</p>
                <p className="text-xl font-bold text-blue-950">{vehicle.agencyId?.agencyName || 'Independent Agency'}</p>
                <p className="text-blue-800 font-medium mt-1">📞 {vehicle.agencyId?.phone || 'Contact not provided'}</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              Rental Pricing <span className="text-sm font-normal text-gray-500 bg-gray-100 px-2 py-1 rounded-md">Flexible Packages</span>
            </h3>
            
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-white p-4 rounded-2xl border border-gray-200 text-center shadow-sm hover:border-primary hover:shadow-md transition-all cursor-default">
                <p className="text-xs text-gray-500 font-bold uppercase mb-2">Daily</p>
                <p className="text-2xl font-bold text-primary">₹{vehicle.pricePerDay}</p>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-gray-200 text-center shadow-sm hover:border-primary hover:shadow-md transition-all cursor-default">
                <p className="text-xs text-gray-500 font-bold uppercase mb-2">Weekly</p>
                <p className="text-2xl font-bold text-primary">₹{vehicle.pricePerWeek}</p>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-gray-200 text-center shadow-sm hover:border-primary hover:shadow-md transition-all cursor-default">
                <p className="text-xs text-gray-500 font-bold uppercase mb-2">Monthly</p>
                <p className="text-2xl font-bold text-primary">₹{vehicle.pricePerMonth}</p>
              </div>
            </div>

            <Button className="w-full h-16 text-xl font-bold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all bg-primary hover:bg-primary/90 text-primary-foreground rounded-2xl">
              Proceed to Book
            </Button>
            <p className="text-center text-sm text-gray-400 mt-4 font-medium flex items-center justify-center gap-1">
              🔒 Payment gateway coming in Phase 6
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
