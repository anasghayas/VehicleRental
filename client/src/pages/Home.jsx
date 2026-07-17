import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';

export default function Home() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [locationFilter, setLocationFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        setLoading(true);
        let query = '/api/vehicles?';
        if (locationFilter) query += `location=${locationFilter}&`;
        if (typeFilter) query += `type=${typeFilter}`;

        const response = await api.get(query);
        setVehicles(response.data);
      } catch (err) {
        setError('Failed to load vehicles');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, [locationFilter, typeFilter]); 

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
          Find Your Perfect Ride 🚗
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Rent cars and bikes from top agencies near you. Quick, secure, and hassle-free.
        </p>
      </div>

      {/* Filter Section */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-10 flex flex-col md:flex-row gap-4 items-center">
        <div className="w-full md:w-1/3">
          <Input 
            placeholder="Search by Location (e.g., Mumbai)" 
            value={locationFilter} 
            onChange={(e) => setLocationFilter(e.target.value)}
            className="h-12 text-lg"
          />
        </div>
        <div className="w-full md:w-1/4">
          <select 
            className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="">All Vehicle Types</option>
            <option value="4W">Cars (4W)</option>
            <option value="2W">Bikes/Scooters (2W)</option>
          </select>
        </div>
      </div>

      {/* Vehicles Grid */}
      {loading ? (
        <div className="text-center text-gray-500 py-20 text-xl font-medium">Loading vehicles...</div>
      ) : error ? (
        <div className="text-center text-red-500 py-20">{error}</div>
      ) : vehicles.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-2xl border border-gray-100">
          <p className="text-gray-500 text-lg">No vehicles found matching your criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {vehicles.map((vehicle) => (
            <div key={vehicle._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 group flex flex-col">
              
              {/* Image Box */}
              <div className="relative h-56 bg-gray-100 overflow-hidden">
                {vehicle.imageUrl ? (
                  <img src={vehicle.imageUrl} alt={vehicle.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    No Image
                  </div>
                )}
                {/* Small Type Badge */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gray-800 shadow-sm">
                  {vehicle.type === '4W' ? 'Car' : 'Bike'}
                </div>
              </div>
              
              {/* Card Details */}
              <div className="p-5 flex-grow flex flex-col">
                <div className="mb-2">
                  <span className="text-sm font-semibold text-primary uppercase tracking-wider">{vehicle.brand}</span>
                  <h3 className="text-xl font-bold text-gray-900 line-clamp-1">
                    {vehicle.name} <span className="text-sm font-normal text-gray-500">({vehicle.modelYear})</span>
                  </h3>
                </div>
                
                <p className="text-gray-500 text-sm mb-4 flex items-center gap-1 font-medium">
                  📍 {vehicle.location}
                </p>

                {/* Price and Button */}
                <div className="mt-auto pt-4 border-t border-gray-50 flex items-end justify-between">
                  <div>
                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-1">Starts at</p>
                    <p className="text-2xl font-bold text-gray-900">₹{vehicle.pricePerDay}<span className="text-sm font-normal text-gray-500">/day</span></p>
                  </div>
                  
                  <Link to={`/vehicle/${vehicle._id}`}>
                    <Button variant="default" className="font-semibold shadow-sm">View Details</Button>
                  </Link>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}
