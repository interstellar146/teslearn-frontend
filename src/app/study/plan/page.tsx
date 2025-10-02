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
import { format, startOfYear, addDays, isSameDay } from 'date-fns';
import { GripVertical } from 'lucide-react';
import { AddSessionDialog } from '@/features/scheduler/AddSessionDialog';
import type { StudySession } from '@/types';

// Mock Data
const allSessionsData: StudySession[] = [
  { id: '1', date: new Date(), topic: 'Calculus Review', time: '10:00 AM - 12:00 PM' },
  { id: '2', date: new Date(), topic: 'History: World War II', time: '1:00 PM - 2:00 PM' },
  { id: '3', date: addDays(new Date(), 1), topic: 'Physics: Kinematics', time: '11:00 AM - 1:00 PM' },
];

const studyPerformance = Array.from({ length: 365 }).map((_, i) => {
    const date = addDays(startOfYear(new Date()), i);
    const targetHours = 2;
    const studiedHours = Math.random() * 4;
    return { date, targetHours, studiedHours };
});

const getHeatmapColor = (studied: number, target: number): string => {
  if (studied === 0) return 'bg-gray-200';
  const ratio = studied / target;
  if (ratio < 0.5) return 'bg-red-300';
  if (ratio < 1) return 'bg-yellow-300';
  if (ratio < 1.5) return 'bg-green-300';
  return 'bg-green-500';
};

// Draggable Item Component
function SortableSessionItem({ session }: { session: StudySession }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: session.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="flex items-center p-4 bg-white rounded-lg border shadow-sm"
    >
      <button {...listeners} className="cursor-grab touch-none p-2 -ml-2">
        <GripVertical className="text-gray-400" />
      </button>
      <div className='ml-2'>
        <p className="font-semibold">{session.topic}</p>
        <p className="text-sm text-gray-500">{session.time}</p>
      </div>
    </div>
  );
}

// Main Scheduler Page
export default function SchedulerPage() {
  const [sessions, setSessions] = useState(allSessionsData);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  
  const dailySessions = useMemo(
    () => sessions.filter(s => isSameDay(s.date, selectedDate)),
    [sessions, selectedDate]
  );
  
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setSessions((currentSessions) => {
        const activeDaySessions = currentSessions.filter(s => isSameDay(s.date, selectedDate));
        const otherDaySessions = currentSessions.filter(s => !isSameDay(s.date, selectedDate));
        
        const oldIndex = activeDaySessions.findIndex(s => s.id === active.id);
        const newIndex = activeDaySessions.findIndex(s => s.id === over.id);
        
        const reorderedDaySessions = arrayMove(activeDaySessions, oldIndex, newIndex);
        return [...otherDaySessions, ...reorderedDaySessions];
      });
    }
  }
  
  const handleAddSession = (topic: string, time: string) => {
    const newSession: StudySession = {
      id: `${Date.now()}`,
      date: selectedDate,
      topic,
      time,
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
                <CardDescription>Drag and drop to reorder your sessions for the day.</CardDescription>
              </div>
              <AddSessionDialog onAddSession={handleAddSession} />
            </CardHeader>
            <CardContent>
              <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={dailySessions.map(s => s.id)} strategy={verticalListSortingStrategy}>
                  <div className="space-y-3">
                    {dailySessions.length > 0 ? (
                      dailySessions.map((session) => (
                        <SortableSessionItem key={session.id} session={session} />
                      ))
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
              <CardDescription>Your daily study hours compared to your target of 2 hours.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-26 md:grid-cols-52 gap-1 justify-center p-2 rounded-lg bg-gray-50">
                {studyPerformance.map(({ date, studiedHours, targetHours }, i) => (
                  <div key={i} className="w-3 h-3 rounded-sm" title={`${format(date, 'MMM d')}: Studied ${studiedHours.toFixed(1)}h / Target ${targetHours}h`}>
                     <div className={`w-full h-full ${getHeatmapColor(studiedHours, targetHours)}`}></div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card className="overflow-hidden">
             <DayPicker
              mode="single"
              selected={selectedDate}
              onSelect={(day) => day && setSelectedDate(day)}
              className="p-4"
            />
          </Card>
        </div>
      </div>
    </div>
  );
}
