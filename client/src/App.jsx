import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AddVehicle from './pages/AddVehicle';
import MyFleet from './pages/MyFleet';
import VehicleDetails from './pages/VehicleDetails';
import MyRentals from './pages/MyRentals';
import AgencyBookings from './pages/AgencyBookings';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Define which component loads for which URL */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/vehicle/:id" element={<VehicleDetails />} />
        
        {/* Protected Dashboard Route */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />

        {/* Customer Only Route: My Rentals */}
        <Route 
          path="/customer/rentals" 
          element={
            <ProtectedRoute allowedRoles={['customer']}>
              <MyRentals />
            </ProtectedRoute>
          } 
        />
        
        {/* Agency Only Route: Add Vehicle */}
        <Route 
          path="/agency/add-vehicle" 
          element={
            <ProtectedRoute allowedRoles={['agency']}>
              <AddVehicle />
            </ProtectedRoute>
          } 
        />

        {/* Agency Only Route: My Fleet */}
        <Route 
          path="/agency/fleet" 
          element={
            <ProtectedRoute allowedRoles={['agency']}>
              <MyFleet />
            </ProtectedRoute>
          } 
        />

        {/* Agency Only Route: Manage Bookings */}
        <Route 
          path="/agency/bookings" 
          element={
            <ProtectedRoute allowedRoles={['agency']}>
              <AgencyBookings />
            </ProtectedRoute>
          } 
        />
        
      </Routes>
    </Router>
  );
}

export default App;
