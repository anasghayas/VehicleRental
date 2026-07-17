import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Link } from 'react-router-dom';

export default function Register() {
  const [role, setRole] = useState('customer');

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
          <form className="space-y-4">
            
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" placeholder="John Doe" required />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="m@example.com" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" type="tel" placeholder="123-456-7890" required />
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
                <Input id="agencyName" placeholder="GoVroom Rentals Ltd." required />
                <p className="text-xs text-amber-600 bg-amber-50 p-2 rounded-md">
                  Note: Agencies require admin approval before listing vehicles.
                </p>
              </div>
            )}

            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-md transition-all" type="submit">
              Sign Up
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
