import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';

export default function AddVehicle() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    modelYear: '',
    type: '4W',
    fuelType: 'Petrol',
    transmission: 'Manual',
    vehicleNumber: '',
    pricePerDay: '',
    pricePerWeek: '',
    pricePerMonth: '',
    location: ''
  });
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // 1. Because we are uploading a physical file, we MUST use FormData instead of standard JSON
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });
      

      if (image) {
        data.append('image', image);
      }
      await api.post('/api/vehicles', data);
      
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to add vehicle');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-8 bg-white rounded-2xl shadow-sm border border-gray-100">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">List a New Vehicle 🚗</h2>
      
      {error && (
        <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg text-sm border border-red-100 font-medium">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="space-y-2">
            <Label htmlFor="name">Vehicle Name (e.g., Swift Dzire)</Label>
            <Input id="name" name="name" required value={formData.name} onChange={handleChange} />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="brand">Brand (e.g., Maruti Suzuki)</Label>
            <Input id="brand" name="brand" required value={formData.brand} onChange={handleChange} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="modelYear">Model Year</Label>
            <Input type="number" id="modelYear" name="modelYear" required value={formData.modelYear} onChange={handleChange} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="vehicleNumber">Registration Number</Label>
            <Input id="vehicleNumber" name="vehicleNumber" required value={formData.vehicleNumber} onChange={handleChange} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Vehicle Type</Label>
            <select 
              id="type" 
              name="type" 
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              value={formData.type} 
              onChange={handleChange}
            >
              <option value="2W">2-Wheeler (Bike/Scooter)</option>
              <option value="4W">4-Wheeler (Car)</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="fuelType">Fuel Type</Label>
            <select 
              id="fuelType" 
              name="fuelType" 
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              value={formData.fuelType} 
              onChange={handleChange}
            >
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
              <option value="Electric">Electric</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="transmission">Transmission</Label>
            <select 
              id="transmission" 
              name="transmission" 
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              value={formData.transmission} 
              onChange={handleChange}
            >
              <option value="Manual">Manual</option>
              <option value="Automatic">Automatic</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location (City)</Label>
            <Input id="location" name="location" required value={formData.location} onChange={handleChange} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="pricePerDay">Price Per Day (₹)</Label>
            <Input type="number" id="pricePerDay" name="pricePerDay" required value={formData.pricePerDay} onChange={handleChange} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="pricePerWeek">Price Per Week (₹)</Label>
            <Input type="number" id="pricePerWeek" name="pricePerWeek" required value={formData.pricePerWeek} onChange={handleChange} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="pricePerMonth">Price Per Month (₹)</Label>
            <Input type="number" id="pricePerMonth" name="pricePerMonth" required value={formData.pricePerMonth} onChange={handleChange} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Vehicle Photo</Label>
            <Input type="file" id="image" name="image" accept="image/*" onChange={handleImageChange} className="cursor-pointer file:text-primary file:font-semibold" />
          </div>
        </div>

        <Button type="submit" className="w-full h-12 text-lg font-semibold mt-4" disabled={loading}>
          {loading ? 'Uploading Photo & Saving...' : 'List Vehicle'}
        </Button>
      </form>
    </div>
  );
}
