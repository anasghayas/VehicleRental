import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import { Button } from '../components/ui/button';
import { toast } from 'sonner';
import LoadingSpinner from '../components/LoadingSpinner';

export default function MyFleet() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchMyVehicles();
  }, []);

  const fetchMyVehicles = async () => {
    try {
      const response = await api.get('/vehicles/my-fleet');
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
        await api.delete(`/vehicles/${id}`);
        setVehicles(vehicles.filter((v) => v._id !== id));
        toast.success("Vehicle deleted successfully!");
      } catch (err) {
        console.error(err);
        toast.error(err.response?.data?.message || 'Failed to delete vehicle');
      }
    }
  };

  if (loading) return <LoadingSpinner text="Loading your fleet..." fullScreen />;
  if (error) return <div className="text-center text-red-500 mt-20 bg-red-50 p-4 rounded-lg inline-block">{error}</div>;

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <h2 className="text-3xl font-bold text-foreground">My Fleet 🚙</h2>
        <Link to="/agency/add-vehicle">
          <Button className="h-10 px-6 font-semibold shadow-sm">+ Add New Vehicle</Button>
        </Link>
      </div>

      {vehicles.length === 0 ? (
        <div className="text-center p-12 bg-card rounded-xl border border-border shadow-sm">
          <p className="text-muted-foreground mb-4 text-lg">You haven't listed any vehicles yet.</p>
          <Link to="/agency/add-vehicle">
            <Button variant="outline" className="font-semibold">List your first vehicle</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vehicles.map((vehicle) => (
            <div key={vehicle._id} className="bg-card rounded-xl shadow-sm border border-border overflow-hidden flex flex-col hover:shadow-md transition-shadow duration-200">
              
              {/* Image Section */}
              {vehicle.imageUrl ? (
                <img src={vehicle.imageUrl} alt={vehicle.name} className="w-full h-52 object-cover border-b border-border" />
              ) : (
                <div className="w-full h-52 bg-muted flex items-center justify-center text-muted-foreground border-b border-border">
                  No Image Available
                </div>
              )}
              
              {/* Details Section */}
              <div className="p-5 flex-grow">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-foreground line-clamp-1">{vehicle.brand} {vehicle.name}</h3>
                  
                  {/* Status Badge */}
                  <span className={`px-2.5 py-1 text-xs font-bold rounded-full whitespace-nowrap ${
                    vehicle.isAdminApproved ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {vehicle.isAdminApproved ? 'Approved' : 'Pending Review'}
                  </span>
                </div>
                
                <p className="text-muted-foreground text-sm mb-1 font-medium">{vehicle.type} • {vehicle.fuelType} • {vehicle.transmission}</p>
                <p className="text-muted-foreground text-sm mb-3">Registration: <span className="font-mono text-muted-foreground font-semibold">{vehicle.vehicleNumber}</span></p>
                
                <p className="text-2xl font-bold text-primary mt-2">₹{vehicle.pricePerDay} <span className="text-sm font-medium text-muted-foreground">/ day</span></p>
              </div>

              {/* Actions Section */}
              <div className="p-4 bg-background border-t border-border">
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
