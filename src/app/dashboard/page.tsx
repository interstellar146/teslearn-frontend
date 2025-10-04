'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useRouter } from 'next/navigation';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  BookOpen,
  FileText,
  MessageSquare,
  Video,
  Star,
  Award,
  ThumbsUp,
  History,
  Dumbbell, // Using Dumbbell as a stand-in for 'Strengths'
  BrainCircuit // Using BrainCircuit for 'Problem Solving'
} from 'lucide-react';

// --- MOCK DATA FOR THE NEW DASHBOARD ---
const userData = {
    name: "Alex",
    email: "alex.j@example.com",
    overallProgress: 75,
    progressByCategory: [
        { title: "Video & Podcast", progress: 80 },
        { title: "Notes & Mindmap", progress: 60 },
        { title: "Quiz & Viva", progress: 90 },
    ],
    recentActivity: [
        {
            category: "Video & Podcast",
            description: "Completed: Introduction to Data Science",
            icon: <Video className="w-6 h-6" />,
            href: "/study/session/dsa-arrays?view=video"
        },
        {
            category: "Notes & Mindmap",
            description: "Updated: Machine Learning Concepts",
            icon: <FileText className="w-6 h-6" />,
            href: "/study/session/dsa-arrays?view=notes"
        },
        {
            category: "Quiz & Viva",
            description: "Score: 95% in Python Basics",
            icon: <MessageSquare className="w-6 h-6" />,
            href: "/study/session/dsa-arrays?view=quiz"
        },
    ],
    badges: [
        { name: 'Perfect Score', icon: <Star className="w-8 h-8" />, color: 'text-yellow-500 bg-yellow-400/20' },
        { name: '100 Hours', icon: <Award className="w-8 h-8" />, color: 'text-green-500 bg-green-400/20' },
        { name: 'Bookworm', icon: <BookOpen className="w-8 h-8" />, color: 'text-blue-500 bg-blue-400/20' },
        { name: 'Streak Master', icon: <ThumbsUp className="w-8 h-8" />, color: 'text-red-500 bg-red-400/20' },
    ],
    // --- NEW: User's selected strengths ---
    strengths: [
        { name: 'Problem Solving', icon: <BrainCircuit className="w-5 h-5" /> },
        { name: 'Mathematics', icon: <Dumbbell className="w-5 h-5" /> }
    ]
};

// --- Sub-components for better organization ---

const ProgressCard = ({ title, value }: { title: string, value: number }) => (
    <Card className="flex flex-col justify-between p-6">
        <p className="font-semibold text-gray-800 mb-2">{title}</p>
        <p className="text-4xl font-bold text-primary">{value}%</p>
    </Card>
);

const ActivityItem = ({ icon, category, description, href }: { icon: React.ReactNode, category: string, description: string, href: string }) => (
    <Link href={href} className="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
        <div className="text-primary flex items-center justify-center rounded-lg bg-primary/10 shrink-0 size-12">
            {icon}
        </div>
        <div>
            <p className="font-semibold text-gray-800">{category}</p>
            <p className="text-sm text-gray-500">{description}</p>
        </div>
    </Link>
);

const AccountSettingsCard = () => {
    const [name, setName] = useState(userData.name);
    const [email, setEmail] = useState(userData.email);
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl">Account Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                 <div>
                    <Label htmlFor="full-name">Full Name</Label>
                    <Input id="full-name" type="text" value={name} onChange={(e) => setName(e.target.value)} className="mt-1" />
                </div>
                <div>
                    <Label htmlFor="email">Email address</Label>
                    <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1" />
                </div>
                <div className="flex justify-end">
                    <Button type="submit">Save Changes</Button>
                </div>
            </CardContent>
        </Card>
    );
};

const BadgesCard = () => (
    <Card>
        <CardHeader>
            <CardTitle className="text-2xl">Your Badges</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {userData.badges.map(badge => (
                <div key={badge.name} className="flex flex-col items-center text-center">
                    <div className={`flex h-16 w-16 items-center justify-center rounded-full ${badge.color}`}>
                        {badge.icon}
                    </div>
                    <p className="text-sm mt-2 font-medium">{badge.name}</p>
                </div>
            ))}
        </CardContent>
    </Card>
);

// --- NEW: Strengths Card Component ---
const StrengthsCard = () => (
    <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Strengths</h2>
        <Card>
            <CardContent className="p-6 space-y-3">
                {userData.strengths.map(strength => (
                    <div key={strength.name} className="flex items-center gap-3 p-3 bg-green-500/10 rounded-lg">
                        <div className="text-green-600">{strength.icon}</div>
                        <p className="font-semibold text-green-700">{strength.name}</p>
                    </div>
                ))}
            </CardContent>
        </Card>
    </div>
);


export default function DashboardPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    // --- 2. ADD THE ONBOARDING LOGIC BACK ---
    useEffect(() => {
        const hasCompleted = localStorage.getItem('hasCompletedOnboarding');
        
        if (hasCompleted !== 'true') {
            // If the user is new, redirect them to the start of the flow.
            router.push('/onboarding/step-1');
        } else {
            // If they are a returning user, show the dashboard.
            setIsLoading(false);
        }
    }, [router]);

    // 3. Add a loading state to prevent the dashboard from flashing.
    if (isLoading) {
        return (
            <div className="flex h-full w-full items-center justify-center">
                <p className="text-gray-500">Loading your personalized dashboard...</p>
            </div>
        );
    }
    
    return (
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
            <div className="max-w-5xl mx-auto space-y-8">
                <header>
                    <h1 className="text-4xl font-bold text-gray-900">Welcome back, {userData.name}</h1>
                    <p className="text-gray-500 mt-1">Let's continue your learning journey.</p>
                </header>

                <section>
                    <AccountSettingsCard />
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Progress</h2>
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex justify-between items-center mb-2">
                                <span className="font-semibold text-gray-800">Overall Progress</span>
                                <span className="font-bold text-primary">{userData.overallProgress}%</span>
                            </div>
                            <Progress value={userData.overallProgress} />
                        </CardContent>
                    </Card>
                </section>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {userData.progressByCategory.map(cat => (
                        <ProgressCard key={cat.title} title={cat.title} value={cat.progress} />
                    ))}
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Recent Activity</h2>
                        <Card>
                            <CardContent className="p-4 space-y-2">
                                {userData.recentActivity.map(activity => (
                                    <ActivityItem key={activity.description} {...activity} />
                                ))}
                            </CardContent>
                        </Card>
                    </section>
                    <section className="space-y-8">
                         <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Quick Actions</h2>
                            <Card>
                                <CardContent className="p-6 space-y-4">
                                    <Button className="w-full py-3" asChild>
                                        <Link href="/study/session/dsa-arrays">Resume Learning</Link>
                                    </Button>
                                    <Button variant="secondary" className="w-full py-3" asChild>
                                         <Link href="/upload">Start New Session</Link>
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                        <StrengthsCard />
                    </section>
                </div>
                
                <section>
                    <BadgesCard />
                </section>
            </div>
        </main>
    );
}

