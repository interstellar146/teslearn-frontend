'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  Calendar,
  GraduationCap,
  Plus,
  ChevronLeft,
  Flame,
  User
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

// --- UPDATED: Simplified Navigation Links ---
const mainNavItems = [
  { href: '/dashboard', label: 'Dashboard', icon: Home },
  { href: '/study/plan', label: 'Calendar', icon: Calendar },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside className={cn(
      "hidden md:flex flex-col p-4 border-r bg-white shadow-sm transition-all duration-300 relative",
      isCollapsed ? "w-20 items-center" : "w-72"
    )}>
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
            <span className={cn(isCollapsed && "hidden")}>Teslearn</span>
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

      {/* "Today's Objective" section has been removed */}

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

