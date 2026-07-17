import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Link, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';

export default function Register() {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    agencyName: ''
  });
  const [role, setRole] = useState('customer');
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await api.post('/auth/register', {
        ...formData,
        role
      });
      
      login(response.data.user, response.data.token);
      toast.success("Registration Successful!");
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] bg-gray-50 p-4">
      <Card className="w-full max-w-md shadow-lg border-0">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold tracking-tight">Create an account</CardTitle>
          <CardDescription className="text-gray-500">
            Enter your details below to get started with GoVroom
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            
            {/* Show Error Message if any */}
            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm font-medium text-center border border-red-200">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" placeholder="John Doe" value={formData.name} onChange={handleChange} required />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="m@example.com" value={formData.email} onChange={handleChange} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" value={formData.password} onChange={handleChange} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" type="tel" placeholder="123-456-7890" value={formData.phone} onChange={handleChange} required />
            </div>

            <div className="space-y-2">
              <Label>I am registering as a...</Label>
              <Select onValueChange={setRole} defaultValue={role}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="customer">Customer (Looking to rent)</SelectItem>
                  <SelectItem value="agency">Agency (Looking to list vehicles)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Only show the Agency Name field if they select 'agency' */}
            {role === 'agency' && (
              <div className="space-y-2 border-t pt-4 mt-4 animate-in fade-in zoom-in duration-300">
                <Label htmlFor="agencyName">Agency Business Name</Label>
                <Input id="agencyName" placeholder="GoVroom Rentals Ltd." value={formData.agencyName} onChange={handleChange} required />
                <p className="text-xs text-amber-600 bg-amber-50 p-2 rounded-md">
                  Note: Agencies require admin approval before listing vehicles.
                </p>
              </div>
            )}

            <Button disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-md transition-all" type="submit">
              {loading ? "Signing up..." : "Sign Up"}
            </Button>
            
          </form>
        </CardContent>
        <CardFooter className="flex justify-center border-t pt-4">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 font-semibold hover:underline">
              Log in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
