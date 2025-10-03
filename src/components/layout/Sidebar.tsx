'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  Calendar,
  GraduationCap,
  Video,
  FileText,
  Presentation,
  CheckSquare,
  Lightbulb,
  Headphones,
  Plus,
  ChevronDown,
  ChevronLeft,
  Flame
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

// --- Navigation Links ---
const mainNavItems = [
  { href: '/dashboard', label: 'Home', icon: Home },
  { href: '/study/plan', label: 'Calendar', icon: Calendar },
];
const todaysObjectiveId = 'calculus-review';
const studySetNavItems = [
    { href: `/study/session/${todaysObjectiveId}?view=video`, label: 'Video', icon: Video },
    { href: `/study/session/${todaysObjectiveId}?view=notes`, label: 'Notes', icon: FileText },
    { href: `/study/session/${todaysObjectiveId}?view=flashcards`, label: 'Flashcards', icon: Presentation },
    { href: `/study/session/${todaysObjectiveId}?view=quiz`, label: 'Quiz', icon: CheckSquare },
    { href: `/study/session/${todaysObjectiveId}?view=audio`, label: 'Podcast', icon: Headphones },
    { href: `/study/session/${todaysObjectiveId}?view=viva`, label: 'Viva', icon: Lightbulb },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isObjectiveOpen, setIsObjectiveOpen] = useState(true);
  // --- NEW: State for horizontal collapse ---
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    // --- UPDATED: Dynamic width and relative positioning ---
    <aside className={cn(
      "hidden md:flex flex-col p-4 border-r bg-white shadow-sm transition-all duration-300 relative",
      isCollapsed ? "w-20 items-center" : "w-72"
    )}>
      {/* --- NEW: Collapse Toggle Button --- */}
      <Button
        variant="outline"
        size="icon"
        className="absolute -right-4 top-16 z-10 h-8 w-8 rounded-full bg-white"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <ChevronLeft className={cn("h-4 w-4 transition-transform", isCollapsed && "rotate-180")} />
      </Button>

      <div className={cn("flex items-center mb-8 px-2", isCollapsed ? "justify-center" : "justify-between")}>
        <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-primary">
            <GraduationCap className="h-8 w-8 flex-shrink-0"/>
            <span className={cn(isCollapsed && "hidden")}>TesLearn</span>
        </Link>
        <div className={cn("flex items-center gap-1 font-bold text-orange-500", isCollapsed && "hidden")}>
            <Flame className="h-6 w-6"/>
            <span className='text-lg'>0</span>
        </div>
      </div>

      <nav className="flex flex-col space-y-2">
        {mainNavItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            title={isCollapsed ? item.label : undefined}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-gray-600 transition-all hover:bg-gray-100 font-medium",
              pathname === item.href && "bg-blue-100 text-blue-600",
              isCollapsed && "justify-center"
            )}
          >
            <item.icon className="h-5 w-5 flex-shrink-0" />
            <span className={cn("truncate", isCollapsed && "hidden")}>{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="mt-6">
        <button
          onClick={() => setIsObjectiveOpen(!isObjectiveOpen)}
          className={cn(
            "flex items-center w-full rounded-lg px-3 py-2.5 font-bold transition-colors",
            isCollapsed ? "justify-center" : "justify-between",
            !isCollapsed && "bg-blue-100 text-blue-700 hover:bg-blue-200/60"
          )}
        >
            <div className={cn('flex items-center gap-3', isCollapsed && "hidden")}>
                <div className="w-5 h-5 rounded-full bg-blue-300 flex-shrink-0"></div>
                Today's Objective
            </div>
            {isCollapsed && <div className="w-5 h-5 rounded-full bg-blue-300 flex-shrink-0"></div>}
            <ChevronDown className={cn("h-5 w-5 transition-transform", isObjectiveOpen && "rotate-180", isCollapsed && "hidden")} />
        </button>

        {isObjectiveOpen && (
            <nav className={cn("flex flex-col space-y-1 mt-2", !isCollapsed && "pl-4 border-l-2 ml-4")}>
                 {studySetNavItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    title={isCollapsed ? item.label : undefined}
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-2 text-gray-500 transition-all hover:bg-gray-100 text-sm font-medium",
                      isCollapsed && "justify-center"
                    )}
                  >
                    <item.icon className="h-4 w-4 flex-shrink-0" />
                    <span className={cn(isCollapsed && "hidden")}>{item.label}</span>
                  </Link>
                ))}
            </nav>
        )}
      </div>

      <div className="mt-auto w-full">
         <Button asChild variant="outline" className="w-full">
            <Link href="/upload" className={cn(isCollapsed && "justify-center")}>
                <Plus className={cn("h-4 w-4", !isCollapsed && "mr-2")} />
                <span className={cn(isCollapsed && "hidden")}>Upload</span>
            </Link>
         </Button>
      </div>
    </aside>
  );
}

