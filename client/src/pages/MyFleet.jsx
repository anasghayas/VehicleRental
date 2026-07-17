import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import { Button } from '../components/ui/button';

export default function MyFleet() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchMyVehicles();
  }, []);

  const fetchMyVehicles = async () => {
    try {
      const response = await api.get('/api/vehicles/my-fleet');
      setVehicles(response.data);
    } catch (err) {
      setError('Failed to fetch your fleet.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to completely delete this vehicle? This action cannot be undone.")) {
      try {
        await api.delete(`/api/vehicles/${id}`);
        // Remove the deleted car from the screen without needing a page refresh!
        setVehicles(vehicles.filter((v) => v._id !== id));
      } catch (err) {
        alert(err.response?.data?.message || 'Failed to delete vehicle');
      }
    }
  };

  if (loading) return <div className="text-center mt-20 text-gray-500 font-medium">Loading your fleet...</div>;
  if (error) return <div className="text-center text-red-500 mt-20 bg-red-50 p-4 rounded-lg inline-block">{error}</div>;

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <h2 className="text-3xl font-bold text-gray-800">My Fleet 🚙</h2>
        <Link to="/agency/add-vehicle">
          <Button className="h-10 px-6 font-semibold shadow-sm">+ Add New Vehicle</Button>
        </Link>
      </div>

      {vehicles.length === 0 ? (
        <div className="text-center p-12 bg-white rounded-xl border border-gray-100 shadow-sm">
          <p className="text-gray-500 mb-4 text-lg">You haven't listed any vehicles yet.</p>
          <Link to="/agency/add-vehicle">
            <Button variant="outline" className="font-semibold">List your first vehicle</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vehicles.map((vehicle) => (
            <div key={vehicle._id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col hover:shadow-md transition-shadow duration-200">
              
              {/* Image Section */}
              {vehicle.imageUrl ? (
                <img src={vehicle.imageUrl} alt={vehicle.name} className="w-full h-52 object-cover border-b border-gray-100" />
              ) : (
                <div className="w-full h-52 bg-gray-100 flex items-center justify-center text-gray-400 border-b border-gray-200">
                  No Image Available
                </div>
              )}
              
              {/* Details Section */}
              <div className="p-5 flex-grow">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-gray-800 line-clamp-1">{vehicle.brand} {vehicle.name}</h3>
                  
                  {/* Status Badge */}
                  <span className={`px-2.5 py-1 text-xs font-bold rounded-full whitespace-nowrap ${
                    vehicle.isAdminApproved ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {vehicle.isAdminApproved ? 'Approved' : 'Pending Review'}
                  </span>
                </div>
                
                <p className="text-gray-600 text-sm mb-1 font-medium">{vehicle.type} • {vehicle.fuelType} • {vehicle.transmission}</p>
                <p className="text-gray-500 text-sm mb-3">Registration: <span className="font-mono text-gray-700 font-semibold">{vehicle.vehicleNumber}</span></p>
                
                <p className="text-2xl font-bold text-primary mt-2">₹{vehicle.pricePerDay} <span className="text-sm font-medium text-gray-500">/ day</span></p>
              </div>

              {/* Actions Section */}
              <div className="p-4 bg-gray-50 border-t border-gray-100">
                <Button variant="destructive" className="w-full font-semibold hover:bg-red-600" onClick={() => handleDelete(vehicle._id)}>
                  Delete Vehicle
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
