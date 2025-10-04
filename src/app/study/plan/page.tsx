'use client';

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { format, startOfYear, addDays, isSameDay, differenceInDays } from 'date-fns';
import { GripVertical, BookOpen } from 'lucide-react';
import { AddSessionDialog } from '@/features/scheduler/AddSessionDialog';
import type { StudySession } from '@/types';
import Link from 'next/link';

// --- UPDATED MOCK DATA ---
// Now uses the correct IDs ('dsa-arrays', 'maths-limits') to link to the detailed study set data.
const allSessionsData: StudySession[] = [
  { id: 'dsa-arrays', date: new Date(), subject: "DSA", topic: 'Arrays & Strings', time: '10:00 AM - 12:00 PM', isCompleted: true, iconBg: 'bg-blue-100', iconColor: 'text-blue-500' },
  { id: 'maths-limits', date: new Date(), subject: "Maths", topic: 'Introduction to Limits', time: '1:00 PM - 2:30 PM', isCompleted: false, iconBg: 'bg-purple-100', iconColor: 'text-purple-500' },
];

// --- Heatmap data generation ---
const today = new Date();
const studyPerformance = Array.from({ length: 365 }).map((_, i) => {
    const date = addDays(startOfYear(new Date()), i);
    let studiedHours = 0;
    const diffDays = differenceInDays(today, date);
    if (diffDays >= 0) {
        if (diffDays <= 90) { // High concentration in the last 3 months
             if (Math.random() > 0.4) { studiedHours = Math.random() * 4; }
        } else { // Sparse activity for older dates
            if (Math.random() > 0.8) { studiedHours = Math.random() * 2; }
        }
    }
    return { date, studiedHours };
});

const getHeatmapColor = (studied: number, target: number): string => {
  if (target === 0 && studied === 0) return 'bg-gray-200/80';
  if (studied === 0) return 'bg-gray-200';
  const ratio = studied / target;
  if (ratio <= 0.25) return 'bg-blue-200';
  if (ratio <= 0.75) return 'bg-blue-400';
  if (ratio <= 1.25) return 'bg-blue-600';
  return 'bg-blue-800';
};

const parseTimeRange = (timeRange: string): number => {
    try {
        const [startTimeStr, endTimeStr] = timeRange.split('-').map(s => s.trim());
        const today = new Date();
        const startDate = new Date(`${today.toDateString()} ${startTimeStr}`);
        const endDate = new Date(`${today.toDateString()} ${endTimeStr}`);
        if (endDate < startDate) endDate.setDate(endDate.getDate() + 1);
        const durationMs = endDate.getTime() - startDate.getTime();
        if (isNaN(durationMs) || durationMs < 0) return 0;
        return durationMs / (1000 * 60 * 60);
    } catch { return 0; }
};

const targetHoursByDate = new Map<string, number>();
allSessionsData.forEach(session => {
    const dateKey = session.date.toDateString();
    const currentHours = targetHoursByDate.get(dateKey) || 0;
    targetHoursByDate.set(dateKey, currentHours + parseTimeRange(session.time));
});

function SortableSessionItem({ session }: { session: StudySession }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: session.id });
  const style = { transform: CSS.Transform.toString(transform), transition };

  return (
    <Link href={`/study/session/${session.id}`} className="block">
        <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="flex items-center p-4 bg-white rounded-lg border shadow-sm cursor-grab hover:shadow-md transition-shadow">
          <div className={`p-3 rounded-lg ml-2 ${session.iconBg}`}><BookOpen className={`w-6 h-6 ${session.iconColor}`} /></div>
          <div className='ml-4 flex-1'>
            <p className="font-semibold">{session.subject} - {session.topic}</p>
            <p className="text-sm text-gray-500">{session.time}</p>
          </div>
           <div className={`size-3 rounded-full ${session.isCompleted ? 'bg-green-500' : 'bg-gray-300'}`}></div>
        </div>
    </Link>
  );
}

// Main Scheduler Page
export default function SchedulerPage() {
  const [sessions, setSessions] = useState<StudySession[]>(allSessionsData);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  
  const dailySessions = useMemo(() => sessions.filter(s => isSameDay(s.date, selectedDate)), [sessions, selectedDate]);
  const totalTargetHours = useMemo(() => dailySessions.reduce((total, session) => total + parseTimeRange(session.time), 0), [dailySessions]);
  const sensors = useSensors(useSensor(PointerSensor), useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }));

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setSessions((current) => {
        const oldIndex = current.findIndex(s => s.id === active.id);
        const newIndex = current.findIndex(s => s.id === over.id);
        return arrayMove(current, oldIndex, newIndex);
      });
    }
  }
  
  const handleAddSession = (subject: string, topic: string, time: string) => {
    const newSession: StudySession = {
      id: `${Date.now()}`,
      date: selectedDate,
      subject,
      topic,
      time,
      isCompleted: false,
      iconBg: 'bg-yellow-100',
      iconColor: 'text-yellow-500',
    };
    setSessions(prev => [...prev, newSession]);
  };

  return (
    <div className="p-4 sm:p-6 md:p-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">My Study Plan</h1>
          <p className="text-gray-500 mt-1">Organize your sessions and track your progress.</p>
        </header>
        
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Schedule for {format(selectedDate, 'MMMM do, yyyy')}</CardTitle>
                <CardDescription>
                  Total Target: <span className="font-bold text-primary">{totalTargetHours.toFixed(1)} hours</span>
                </CardDescription>
              </div>
              <AddSessionDialog onAddSession={handleAddSession} />
            </CardHeader>
            <CardContent>
              <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={sessions.map(s => s.id)} strategy={verticalListSortingStrategy}>
                  <div className="space-y-3">
                    {dailySessions.length > 0 ? (
                      dailySessions.map((session) => <SortableSessionItem key={session.id} session={session} />)
                    ) : (
                      <div className="text-center text-gray-500 py-8 border-2 border-dashed rounded-lg">
                        <p>No sessions scheduled for this day.</p>
                        <p className="text-sm">Click 'Add Session' to get started!</p>
                      </div>
                    )}
                  </div>
                </SortableContext>
              </DndContext>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Study Activity Heatmap</CardTitle>
              <CardDescription>Your daily study hours compared to your scheduled target.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-14 gap-1.5">
                {studyPerformance.slice(-98).map(({ date, studiedHours }, i) => {
                    const targetHoursForDay = targetHoursByDate.get(date.toDateString()) || 0;
                    return (
                      <div
                        key={i}
                        className={`h-4 w-full rounded ${getHeatmapColor(studiedHours, targetHoursForDay)}`}
                        title={`${format(date, 'MMM d')}: Studied ${studiedHours.toFixed(1)}h / Target ${targetHoursForDay.toFixed(1)}h`}
                      ></div>
                    );
                })}
              </div>
               <div className="flex items-center justify-end gap-2 text-xs text-gray-500 mt-4">
                <span>Less</span>
                <div className="w-3 h-3 rounded-sm bg-gray-200"></div>
                <div className="w-3 h-3 rounded-sm bg-blue-200"></div>
                <div className="w-3 h-3 rounded-sm bg-blue-400"></div>
                <div className="w-3 h-3 rounded-sm bg-blue-600"></div>
                <div className="w-3 h-3 rounded-sm bg-blue-800"></div>
                <span>More</span>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-1">
          <Card className="overflow-hidden">
             <DayPicker
                mode="single"
                selected={selectedDate}
                onSelect={(day) => {
                  if (day) setSelectedDate(day)
                }}
                className="p-4"
                disabled={{ before: new Date() }}
              />
          </Card>
        </div>
      </div>
    </div>
  );
}

