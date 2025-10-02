'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, User, Trophy, BookOpen, GraduationCap, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

// Navigation items for the sidebar
const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/study/plan', label: 'Study Plan', icon: BookOpen },
  { href: '/rewards', label: 'Rewards', icon: Trophy },
  { href: '/profile', label: 'Profile', icon: User },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex w-64 flex-col p-4 border-r bg-background shadow-sm">
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
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-muted-foreground transition-all hover:bg-muted hover:text-foreground font-medium",
              pathname === item.href && "bg-primary/10 text-primary"
            )}
          >
            <item.icon className="h-5 w-5" />
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Footer Links (Upgrade & Settings) */}
      <div className="mt-auto flex flex-col space-y-2">
         <Link
            href="/upgrade"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-muted-foreground transition-all bg-blue-500/10 text-blue-600 hover:bg-blue-500/20 font-semibold"
          >
            ✨ Upgrade Plan
          </Link>
         <Link
            href="/settings" // Assuming a settings page will be created
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-muted-foreground transition-all hover:bg-muted hover:text-foreground font-medium",
               pathname === '/settings' && "bg-muted text-foreground"
            )}
          >
            <Settings className="h-5 w-5" />
            Settings
          </Link>
      </div>
    </aside>
  );
}

