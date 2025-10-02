'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, History } from "lucide-react";
import Link from "next/link";

// Mock Data: In a real app, this would be fetched from your API
const user = {
  name: "Sarah",
};

const studySessions = [
  {
    id: '1',
    subject: "Math",
    topic: "Calculus Review",
    time: "10:00 AM - 12:00 PM",
    isCompleted: true,
  },
  {
    id: '2',
    subject: "History",
    topic: "World War II",
    time: "1:00 PM - 2:00 PM",
    isCompleted: true,
  },
  {
    id: '3',
    subject: "Computer Science",
    topic: "Data Structures",
    time: "3:00 PM - 4:30 PM",
    isCompleted: false,
  },
];

// This is a placeholder for the heatmap, which is fully implemented on the study plan page.
function StudyActivityHeatmap() {
  return (
    <div className="p-4 bg-gray-100 rounded-lg text-center">
      <p className="text-gray-500">Study activity heatmap will be displayed here.</p>
      <Link href="/study/plan" className="text-sm text-primary hover:underline">
        View full study plan & activity
      </Link>
    </div>
  )
}

export default function DashboardPage() {
  return (
    <div className="p-4 sm:p-6 md:p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Hi, {user.name}</h1>
        <p className="text-gray-500 mt-1">Here's your personalized study schedule for today. Ready to dive in?</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content: Daily Overview */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <History className="w-5 h-5" />
                Today's Study Plan
              </CardTitle>
              <CardDescription>Click on a session to start learning.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {studySessions.map((session) => (
                <Link key={session.id} href={`/study/session/${session.id}`} legacyBehavior>
                  <a className="flex items-center justify-between p-4 bg-gray-50/50 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer border">
                    <div>
                      <p className="font-semibold text-gray-800">{session.subject} - {session.topic}</p>
                      <p className="text-sm text-gray-500">{session.time}</p>
                    </div>
                    {session.isCompleted ? (
                      <CheckCircle2 className="w-6 h-6 text-green-500" />
                    ) : (
                      <div className="w-5 h-5 border-2 border-gray-300 rounded-full"></div>
                    )}
                  </a>
                </Link>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar: Study Activity */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Study Activity</CardTitle>
              <CardDescription>Your progress over the last year.</CardDescription>
            </CardHeader>
            <CardContent>
              <StudyActivityHeatmap />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
