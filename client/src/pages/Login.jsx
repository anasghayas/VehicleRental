import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function Login() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] bg-gray-50 p-4">
      <Card className="w-full max-w-md shadow-lg border-0">
        
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold tracking-tight">Welcome back</CardTitle>
          <CardDescription className="text-gray-500">
            Enter your email and password to access your account
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form className="space-y-4">
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="m@example.com" required />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                {/* A tiny fake link just to make it look professional */}
                <Link to="#" className="text-sm font-medium text-blue-600 hover:underline">
                  Forgot password?
                </Link>
              </div>
              <Input id="password" type="password" required />
            </div>

            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-md transition-all mt-6" type="submit">
              Log In
            </Button>
            
          </form>
        </CardContent>
        
        <CardFooter className="flex justify-center border-t pt-4">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/register" className="text-blue-600 font-semibold hover:underline">
              Sign up
            </Link>
          </p>
        </CardFooter>
        
      </Card>
    </div>
  );
}
