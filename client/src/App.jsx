import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AddVehicle from './pages/AddVehicle';
import MyFleet from './pages/MyFleet';
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
        
        {/* Protected Dashboard Route */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
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
      </Routes>
    </Router>
  );
}

export default App;
