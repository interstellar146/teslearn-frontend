'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { Edit, School, Flame, Star, Award, BookOpen, ThumbsUp } from 'lucide-react';
import Image from 'next/image';

// --- MOCK DATA ---
const userData = {
  fullName: 'Sophia Clark',
  email: 'sophia.clark@state.edu',
  avatarUrl: 'https://i.pravatar.cc/150?u=sophia-clark',
  interestedTopics: 'Quantum Physics, Machine Learning, Renaissance Art',
  stats: {
    topicsMastered: 15,
    currentStreak: 30,
  },
  badges: [
    { name: 'Perfect Score', icon: <Star className="w-8 h-8" />, color: 'text-yellow-500 bg-yellow-400/20' },
    { name: '100 Hours', icon: <Award className="w-8 h-8" />, color: 'text-green-500 bg-green-400/20' },
    { name: 'Bookworm', icon: <BookOpen className="w-8 h-8" />, color: 'text-blue-500 bg-blue-400/20' },
    { name: 'Streak Master', icon: <ThumbsUp className="w-8 h-8" />, color: 'text-red-500 bg-red-400/20' },
  ]
};


// --- Sub-components for better organization ---

const AccountSettings = () => {
    const [name, setName] = useState(userData.fullName);
    const [email, setEmail] = useState(userData.email);
    return (
         <Card className="p-8">
            <h2 className="text-2xl font-bold mb-6">Account Settings</h2>
            <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                        <Label htmlFor="full-name">Full Name</Label>
                        <Input id="full-name" type="text" value={name} onChange={(e) => setName(e.target.value)} className="mt-2" />
                    </div>
                    <div>
                        <Label htmlFor="email">Email address</Label>
                        <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-2" />
                    </div>
                </div>
                <div>
                    <Label>Password</Label>
                    <Button variant="link" className="p-0 h-auto mt-2 text-primary">Change Password</Button>
                </div>
                <div className="flex justify-end pt-4">
                    <Button type="submit">Save Changes</Button>
                </div>
            </form>
        </Card>
    );
};

const LearningPreferences = () => {
    const [topics, setTopics] = useState(userData.interestedTopics);
    return (
        <Card className="p-8">
            <h2 className="text-2xl font-bold mb-6">Learning Preferences</h2>
            <form className="space-y-6">
                <div>
                    <Label htmlFor="topics">Interested Topics</Label>
                    <Input id="topics" type="text" value={topics} onChange={(e) => setTopics(e.target.value)} className="mt-2" />
                </div>
                <div>
                    <Label>Learning Modes</Label>
                    <div className="mt-2 space-y-3">
                        <div className="flex items-center gap-x-3"><Checkbox id="visual" defaultChecked /><Label htmlFor="visual">Visual (Videos, Infographics)</Label></div>
                        <div className="flex items-center gap-x-3"><Checkbox id="auditory" /><Label htmlFor="auditory">Auditory (Podcasts, Lectures)</Label></div>
                        <div className="flex items-center gap-x-3"><Checkbox id="reading" defaultChecked /><Label htmlFor="reading">Reading (Articles, Books)</Label></div>
                        <div className="flex items-center gap-x-3"><Checkbox id="interactive" defaultChecked /><Label htmlFor="interactive">Interactive (Quizzes, Simulations)</Label></div>
                    </div>
                </div>
                <div className="flex justify-end pt-4">
                    <Button type="submit">Save Preferences</Button>
                </div>
            </form>
        </Card>
    );
};


export default function ProfilePage() {
  return (
    <main className="flex-1 bg-gray-50/50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
            <div className="flex flex-col md:flex-row items-center justify-between mb-12">
                <div className="flex items-center gap-6">
                    <div className="relative">
                        <Avatar className="h-32 w-32 ring-4 ring-primary/30">
                            <AvatarImage src={userData.avatarUrl} alt={userData.fullName} />
                            <AvatarFallback>{userData.fullName.slice(0, 2)}</AvatarFallback>
                        </Avatar>
                        <Button size="icon" className="absolute bottom-1 right-1 h-8 w-8 rounded-full">
                            <Edit className="h-4 w-4" />
                        </Button>
                    </div>
                    <div>
                        <h1 className="text-4xl font-bold">{userData.fullName}</h1>
                        <p className="mt-1 text-lg text-gray-600">{userData.email}</p>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2 space-y-10">
                    <AccountSettings />
                    <LearningPreferences />
                </div>
                <div className="space-y-10">
                    <Card className="p-8">
                        <h2 className="text-2xl font-bold mb-6">Progress & Achievements</h2>
                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary"><School className="text-3xl" /></div>
                                <div>
                                    <p className="text-sm text-gray-500">Mastery Summary</p>
                                    <p className="text-xl font-bold">{userData.stats.topicsMastered} Topics Mastered</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary"><Flame className="text-3xl" /></div>
                                <div>
                                    <p className="text-sm text-gray-500">Current Streak</p>
                                    <p className="text-xl font-bold">{userData.stats.currentStreak} Days</p>
                                </div>
                            </div>
                        </div>
                        <h3 className="text-xl font-bold mt-8 mb-4">Badges</h3>
                        <div className="grid grid-cols-3 gap-4">
                            {userData.badges.map(badge => (
                                <div key={badge.name} className="flex flex-col items-center text-center">
                                    <div className={`flex h-16 w-16 items-center justify-center rounded-full ${badge.color}`}>
                                        {badge.icon}
                                    </div>
                                    <p className="text-sm mt-2 font-medium">{badge.name}</p>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    </main>
  );
}

