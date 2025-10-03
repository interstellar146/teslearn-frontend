'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  BarChart3,
  Trophy,
  User,
  Settings,
  GraduationCap
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Navigation items for the sidebar
const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/study/plan', label: 'Study Plan', icon: BarChart3 },
  { href: '/rewards', label: 'Rewards', icon: Trophy },
  { href: '/profile', label: 'Profile', icon: User },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex w-64 flex-col p-4 border-r bg-white shadow-sm">
      {/* Logo */}
      <div className="flex items-center gap-2 text-2xl font-bold text-primary mb-10 px-2">
        <GraduationCap className="w-8 h-8"/>
        TesLearn
      </div>

      {/* Main Navigation */}
      <nav className="flex flex-col space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-gray-600 transition-all hover:bg-gray-100 hover:text-gray-900 font-medium",
              pathname === item.href && "bg-blue-100 text-blue-600"
            )}
          >
            <item.icon className="h-5 w-5" />
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Footer/Settings Link */}
      <div className="mt-auto">
         <Link
            href="/settings" // Assuming a settings page will be created
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-gray-600 transition-all hover:bg-gray-100 hover:text-gray-900 font-medium",
               pathname === '/settings' && "bg-blue-100 text-blue-600"
            )}
          >
            <Settings className="h-5 w-5" />
            Settings
          </Link>
      </div>
    </aside>
  );
}

