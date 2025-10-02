'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Gift } from 'lucide-react';

interface ScratchCardProps {
  isRare?: boolean;
}

export function ScratchCard({ isRare = false }: ScratchCardProps) {
  const [isScratched, setIsScratched] = useState(false);

  return (
    <div
      className="relative w-48 h-32 rounded-lg cursor-pointer group overflow-hidden shadow-lg"
      onClick={() => setIsScratched(true)}
      title="Click to reveal your reward!"
    >
      {/* Revealed Content */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-300 to-amber-500 flex flex-col items-center justify-center text-center p-2">
        <Gift className="w-8 h-8 text-white" />
        <p className="font-bold text-white mt-2">100 Points!</p>
        <p className="text-xs text-amber-100">Added to your balance</p>
      </div>

      {/* Scratchable Overlay */}
      <div className={cn(
        "absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-900 transition-opacity duration-500 flex items-center justify-center",
        isScratched ? "opacity-0 pointer-events-none" : "opacity-100"
      )}>
        <div className="w-1/2 h-1/2 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.2)_0%,_rgba(255,255,255,0)_70%)]"></div>
        {isRare && <div className="absolute top-1 right-1 bg-sky-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">RARE</div>}
      </div>
    </div>
  );
}
