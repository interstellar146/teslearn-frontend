'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookUp, BrainCircuit, Flame } from 'lucide-react';

// MOCK DATA: In a real app, this would be fetched for the logged-in user
const userData = {
  fullName: 'Sophia Clark',
  email: 'sophia.clark@state.edu',
  university: 'State University',
  major: 'Computer Science',
  avatarUrl: 'https://i.pravatar.cc/150?u=sophia', // Placeholder image
  joinYear: 2021,
  stats: {
    totalStudyHours: 250,
    topicsMastered: 15,
    dayStreak: 30,
  },
};

export default function ProfilePage() {
  const [formState, setFormState] = useState({
    fullName: userData.fullName,
    email: userData.email,
    university: userData.university,
    major: userData.major,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormState(prevState => ({ ...prevState, [id]: value }));
  };

  const handleSaveChanges = () => {
    // In a real app, you would send this formState to your API
    console.log('Saving data:', formState);
    alert('Profile saved!'); // Replace with a toast notification in a real app
  };

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Your Profile</h1>
          <p className="text-gray-500 mt-1">Manage your personal information, preferences, and notification settings.</p>
        </header>

        <Card className="mb-8 overflow-hidden">
          <CardContent className="flex items-center gap-6 p-6">
            <Avatar className="w-20 h-20 border">
              <AvatarImage src={userData.avatarUrl} alt={userData.fullName} />
              <AvatarFallback>{userData.fullName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-2xl font-bold">{userData.fullName}</h2>
              <p className="text-muted-foreground">{`Student at ${userData.university}`}</p>
              <p className="text-sm text-muted-foreground/80">{`Joined ${userData.joinYear}`}</p>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="goals">Goals</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="mt-6">
            <div className="space-y-8">
              <section>
                <h3 className="text-xl font-semibold mb-4 text-gray-700">Learning Journey</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-4 flex items-center gap-4">
                      <BookUp className="w-8 h-8 text-blue-500" />
                      <div>
                        <p className="text-2xl font-bold">{userData.stats.totalStudyHours}</p>
                        <p className="text-sm text-muted-foreground">Total Study Hours</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 flex items-center gap-4">
                       <BrainCircuit className="w-8 h-8 text-green-500" />
                       <div>
                        <p className="text-2xl font-bold">{userData.stats.topicsMastered}</p>
                        <p className="text-sm text-muted-foreground">Topics Mastered</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 flex items-center gap-4">
                      <Flame className="w-8 h-8 text-orange-500" />
                      <div>
                        <p className="text-2xl font-bold">{userData.stats.dayStreak}</p>
                        <p className="text-sm text-muted-foreground">Day Streak</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </section>

              <section>
                <h3 className="text-xl font-semibold mb-4 text-gray-700">Personal Information</h3>
                <Card>
                  <CardContent className="p-6 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input id="fullName" value={formState.fullName} onChange={handleInputChange} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email address</Label>
                        <Input id="email" type="email" value={formState.email} onChange={handleInputChange} />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="university">University</Label>
                        <Input id="university" value={formState.university} onChange={handleInputChange} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="major">Major</Label>
                        <Input id="major" value={formState.major} onChange={handleInputChange} />
                      </div>
                    </div>
                     <div className="flex justify-end pt-4">
                        <Button onClick={handleSaveChanges}>Save Changes</Button>
                     </div>
                  </CardContent>
                </Card>
              </section>
            </div>
          </TabsContent>
          
          <TabsContent value="settings" className="mt-6 text-center text-muted-foreground"><p>User settings will be managed here.</p></TabsContent>
          <TabsContent value="goals" className="mt-6 text-center text-muted-foreground"><p>Learning goals and targets will be set here.</p></TabsContent>
          <TabsContent value="notifications" className="mt-6 text-center text-muted-foreground"><p>Notification preferences will be configured here.</p></TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
