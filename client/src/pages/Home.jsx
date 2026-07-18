import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import LoadingSpinner from '../components/LoadingSpinner';

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
        let query = '/vehicles?';
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
    <div>
      {/* Hero Section */}
      <div className="relative bg-card overflow-hidden border-b border-border">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-70"></div>
          <div className="absolute top-1/2 -left-24 w-72 h-72 bg-primary/5 rounded-full blur-2xl opacity-50"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-32 lg:flex lg:items-center lg:gap-12">
          <div className="text-center lg:text-left lg:w-1/2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6 border border-primary/20">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              The Ultimate Rental Experience
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold text-foreground tracking-tight mb-6 leading-tight">
              Find Your <span className="text-primary">Perfect Ride</span> Today 🚗
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 mb-10 leading-relaxed">
              Rent premium cars and bikes from top verified agencies near you. Quick, secure, and hassle-free booking.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button size="lg" className="text-lg px-8 py-6 rounded-full font-bold shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-1 transition-all">
                Browse Vehicles
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 rounded-full font-bold hover:bg-card">
                List Your Fleet
              </Button>
            </div>
          </div>
          
          <div className="hidden lg:block lg:w-1/2 relative mt-16 lg:mt-0">
            {/* Hero Image / Composition */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-border bg-muted aspect-[4/3] group">
              <div className="absolute inset-0 bg-gradient-to-tr from-card/80 to-transparent z-10"></div>
              {/* Fallback pattern if we don't have an image, but let's use a nice gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-secondary via-background to-card group-hover:scale-105 transition-transform duration-700"></div>
              
              <div className="absolute bottom-8 left-8 z-20">
                <div className="bg-background/80 backdrop-blur-md p-4 rounded-xl border border-border shadow-xl">
                  <p className="text-primary font-bold text-lg flex items-center gap-2">
                    <span className="text-2xl">🔥</span> Premium Fleet
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">Starting from ₹500/day</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold text-foreground">Available Vehicles</h2>
            <p className="text-muted-foreground mt-2">Filter and find the exact ride you need.</p>
          </div>
        </div>

      {/* Filter Section */}
      <div className="bg-card p-6 rounded-2xl shadow-sm border border-border mb-10 flex flex-col md:flex-row gap-4 items-center">
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
        <div className="col-span-full">
          <LoadingSpinner text="Loading amazing vehicles..." />
        </div>
      ) : error ? (
        <div className="text-center text-red-500 py-20">{error}</div>
      ) : vehicles.length === 0 ? (
        <div className="text-center py-20 bg-background rounded-2xl border border-border">
          <p className="text-muted-foreground text-lg">No vehicles found matching your criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {vehicles.map((vehicle) => (
            <div key={vehicle._id} className="bg-card rounded-2xl shadow-sm border border-border overflow-hidden hover:shadow-lg transition-all duration-300 group flex flex-col">
              
              {/* Image Box */}
              <div className="relative h-56 bg-muted overflow-hidden">
                {vehicle.imageUrl ? (
                  <img src={vehicle.imageUrl} alt={vehicle.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                    No Image
                  </div>
                )}
                {/* Small Type Badge */}
                <div className="absolute top-4 right-4 bg-card/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-foreground shadow-sm">
                  {vehicle.type === '4W' ? 'Car' : 'Bike'}
                </div>
              </div>
              
              {/* Card Details */}
              <div className="p-5 flex-grow flex flex-col">
                <div className="mb-2">
                  <span className="text-sm font-semibold text-primary uppercase tracking-wider">{vehicle.brand}</span>
                  <h3 className="text-xl font-bold text-foreground line-clamp-1">
                    {vehicle.name} <span className="text-sm font-normal text-muted-foreground">({vehicle.modelYear})</span>
                  </h3>
                </div>
                
                <p className="text-muted-foreground text-sm mb-4 flex items-center gap-1 font-medium">
                  📍 {vehicle.location}
                </p>

                {/* Price and Button */}
                <div className="mt-auto pt-4 border-t border-gray-50 flex items-end justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">Starts at</p>
                    <p className="text-2xl font-bold text-foreground">₹{vehicle.pricePerDay}<span className="text-sm font-normal text-muted-foreground">/day</span></p>
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
