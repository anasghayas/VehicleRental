import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import { Button } from '../components/ui/button';
import LoadingSpinner from '../components/LoadingSpinner';
import { toast } from 'sonner';

export default function AdminManageVehicles() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [actionLoading, setActionLoading] = useState(null);

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const response = await api.get('/admin/vehicles');
      setVehicles(response.data);
    } catch (err) {
      setError('Failed to load vehicles.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (vehicleId) => {
    setActionLoading(vehicleId);
    try {
      await api.put(`/admin/vehicles/${vehicleId}/approve`);
      setVehicles(vehicles.map(v => 
        v._id === vehicleId ? { ...v, isAdminApproved: true } : v
      ));
      toast.success("Vehicle approved successfully!");
    } catch (err) {
      console.error("Failed to approve vehicle", err);
      toast.error(err.response?.data?.message || "Error approving vehicle.");
    } finally {
      setActionLoading(null);
    }
  };

  if (loading) return <LoadingSpinner text="Loading vehicles..." fullScreen />;
  if (error) return <div className="text-center text-red-500 mt-20 bg-red-50 p-4 rounded-lg inline-block">{error}</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Manage Vehicles 🚗</h1>
      
      <div className="bg-white shadow-sm border border-gray-200 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 font-medium border-b border-gray-200">
              <tr>
                <th className="px-6 py-4">Image</th>
                <th className="px-6 py-4">Vehicle Details</th>
                <th className="px-6 py-4">Agency</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {vehicles.map(vehicle => (
                <tr key={vehicle._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    {vehicle.imageUrl ? (
                      <img 
                        src={vehicle.imageUrl} 
                        alt={vehicle.name} 
                        className="w-20 h-14 object-cover rounded-md border border-gray-200"
                      />
                    ) : (
                      <div className="w-20 h-14 bg-gray-100 rounded-md flex items-center justify-center text-gray-400 text-xs border border-gray-200">
                        No Image
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-bold text-gray-900">{vehicle.brand} {vehicle.name}</div>
                    <div className="text-gray-500 text-xs">{vehicle.vehicleNumber}</div>
                    <div className="text-blue-600 font-medium mt-1">₹{vehicle.pricePerDay}/day</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{vehicle.agencyId?.agencyName || 'Unknown'}</div>
                    <div className="text-gray-500 text-xs">{vehicle.agencyId?.email}</div>
                  </td>
                  <td className="px-6 py-4">
                    {vehicle.isAdminApproved ? (
                      <span className="text-green-600 font-medium">Approved ✅</span>
                    ) : (
                      <span className="text-yellow-600 font-medium">Pending ⏳</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    {!vehicle.isAdminApproved && (
                      <Button 
                        onClick={() => handleApprove(vehicle._id)}
                        disabled={actionLoading === vehicle._id}
                        size="sm"
                      >
                        {actionLoading === vehicle._id ? 'Approving...' : 'Approve Vehicle'}
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
              {vehicles.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                    No vehicles found.
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
