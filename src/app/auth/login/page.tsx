'use client';

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GraduationCap } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Frontend Duty:
    // In a real app, this is where you would call your authentication provider
    // (e.g., NextAuth.js's signIn function or a custom API call)
    console.log('Attempting to log in with:', { email, password });

    // Simulate an API call
    setTimeout(() => {
      console.log('Login successful (simulated)');
      setIsLoading(false);
      // Here you would redirect the user, e.g., router.push('/dashboard');
    }, 1500);
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="text-center">
        <div className="flex justify-center items-center gap-2 mb-2">
           <GraduationCap className="w-8 h-8 text-primary"/>
           <h1 className="text-3xl font-bold">TesLearn</h1>
        </div>
        <CardTitle className="text-2xl">Welcome Back!</CardTitle>
        <CardDescription>Enter your credentials to access your account.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Signing In...' : 'Sign In'}
          </Button>
        </form>
         <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
          </div>
        </div>
        <Button variant="outline" className="w-full" disabled={isLoading}>
            {/* You would add a Google Icon here */}
            Sign in with Google
        </Button>
      </CardContent>
      <CardFooter className="flex justify-center text-sm">
        <p>Don't have an account?&nbsp;</p>
        <Link href="/signup" className="font-semibold text-primary hover:underline">
          Sign up
        </Link>
      </CardFooter>
    </Card>
  );
}
