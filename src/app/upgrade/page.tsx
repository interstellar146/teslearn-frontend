'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, CreditCard } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';

// MOCK DATA: In a real app, this would come from your backend/Stripe
const plans = {
  basic: {
    name: 'Basic',
    price: 'Free',
    features: [
      'Access to basic courses',
      'Limited AI generations',
      'Standard resources',
    ],
    isCurrentPlan: true,
  },
  premium: {
    name: 'Premium',
    price: 9.99,
    features: [
      'Unlimited access to all courses',
      'Unlimited AI content generations',
      'Personalized learning paths & labs',
      'Priority support',
    ],
    isCurrentPlan: false,
  },
};

const creditData = {
  remaining: 50,
  total: 100,
};

// Add mock userData to resolve the error
const userData = {
    fullName: "S. Clark"
};

export default function UpgradePage() {
  return (
    <div className="p-4 sm:p-6 md:p-8">
      <div className="max-w-4xl mx-auto">

        <header className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800">Unlock Premium Features</h1>
          <p className="text-gray-500 mt-2 max-w-2xl mx-auto">Upgrade to access premium content and features, or use credits to unlock individual items.</p>
        </header>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-gray-700">Subscription Plans</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            
            <Card className={cn(plans.basic.isCurrentPlan && "border-gray-300 bg-gray-50")}>
              <CardHeader>
                <CardTitle>{plans.basic.name}</CardTitle>
                <CardDescription className="text-4xl font-bold text-gray-800">
                  {plans.basic.price} <span className="text-lg font-normal text-gray-500">/month</span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {plans.basic.features.map(feature => (
                    <li key={feature} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-muted-foreground"/>
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                 <Button disabled variant="secondary" className="w-full">
                  Current Plan
                </Button>
              </CardFooter>
            </Card>

            <Card className={cn("border-primary shadow-2xl shadow-blue-100")}>
              <CardHeader>
                <div className="flex justify-between items-center">
                   <CardTitle>{plans.premium.name}</CardTitle>
                   <div className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">Best Value</div>
                </div>
                <CardDescription className="text-4xl font-bold text-gray-800">
                  ${plans.premium.price} <span className="text-lg font-normal text-gray-500">/month</span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                 <ul className="space-y-3">
                  {plans.premium.features.map(feature => (
                    <li key={feature} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-primary"/>
                      <span className="text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  Select Plan
                </Button>
              </CardFooter>
            </Card>

          </div>
        </section>

        <section className="mb-12">
           <h2 className="text-2xl font-semibold mb-6 text-gray-700">Credit Packs</h2>
           <Card className="overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 items-center">
                <div className="p-6">
                    <CardTitle>Flexible Credit Packs</CardTitle>
                    <CardDescription className="mt-2">Use credits to unlock individual premium resources as you need them without a subscription.</CardDescription>
                    <Button variant="outline" className="mt-4">Buy Credits</Button>
                </div>
                 <div className="hidden md:flex items-center justify-center bg-muted/50 p-6 h-full">
                     <div className="w-52 h-32 bg-gradient-to-br from-blue-200 to-indigo-300 rounded-lg shadow-md flex flex-col justify-between p-3 text-white relative">
                        <CreditCard className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 text-white/20" />
                        <p className="text-sm font-mono tracking-widest">1234 5678 9876 5432</p>
                        <p className="text-xs font-mono self-end uppercase">{userData.fullName}</p>
                    </div>
                 </div>
            </div>
           </Card>
        </section>

        <section>
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-2">
                 <h3 className="font-semibold text-gray-700">Your Credits</h3>
                 <p className="font-mono font-semibold text-gray-800">
                    <span className="text-primary">{creditData.remaining}</span> / {creditData.total}
                 </p>
              </div>
              <Progress value={(creditData.remaining / creditData.total) * 100} />
            </CardContent>
          </Card>
        </section>
         <div className="mt-10 flex justify-center">
            <Button size="lg" variant="ghost">Continue with free plan</Button>
         </div>
      </div>
    </div>
  );
}

