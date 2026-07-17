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
import AdminDashboard from './pages/AdminDashboard';
import AdminManageUsers from './pages/AdminManageUsers';
import AdminManageVehicles from './pages/AdminManageVehicles';
import AdminAllBookings from './pages/AdminAllBookings';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import { Toaster } from 'sonner';

function App() {
  return (
    <Router>
      <Navbar />
      <Toaster position="top-right" richColors />
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

        {/* Admin Only Route: Dashboard */}
        <Route 
          path="/admin/dashboard" 
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />

        {/* Admin Only Route: Manage Users */}
        <Route 
          path="/admin/users" 
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminManageUsers />
            </ProtectedRoute>
          } 
        />

        {/* Admin Only Route: Manage Vehicles */}
        <Route 
          path="/admin/vehicles" 
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminManageVehicles />
            </ProtectedRoute>
          } 
        />

        {/* Admin Only Route: All Bookings */}
        <Route 
          path="/admin/bookings" 
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminAllBookings />
            </ProtectedRoute>
          } 
        />
        
      </Routes>
    </Router>
  );
}

export default App;
