'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Rocket, Calendar, Sparkles, Award, ArrowRight } from 'lucide-react';
import Link from 'next/link';

// Sub-component for the choice cards
const PathCard = ({
  icon,
  badgeText,
  badgeIcon,
  title,
  description,
  progressValue,
  progressColor,
  buttonText,
  href,
}: {
  icon: React.ReactNode;
  badgeText: string;
  badgeIcon: React.ReactNode;
  title: string;
  description: string;
  progressValue: number;
  progressColor: string;
  buttonText: string;
  href: string;
}) => {
  const router = useRouter();

  const handleClick = () => {
    
    // Set the flag to indicate onboarding is complete
    localStorage.setItem('hasCompletedOnboarding', 'true');
    // Navigate to the chosen path
    router.push(href);
  };

  return (
    <div className="group relative bg-white dark:bg-background-dark/50 border border-gray-200 dark:border-gray-700/50 rounded-lg p-8 flex flex-col items-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
      <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 flex items-center gap-1">
        {badgeIcon} {badgeText}
      </div>
      <div className="bg-primary/10 p-4 rounded-full mb-6 relative">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300 mb-6 text-center flex-grow">
        {description}
      </p>
      <Progress value={progressValue} className={`h-2.5 ${progressColor}`} />
      <Button onClick={handleClick} className="mt-6 w-full font-bold py-3 px-6 relative overflow-hidden">
        {buttonText}
        <ArrowRight className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 group-hover:right-2 transition-all duration-300" />
      </Button>
    </div>
  );
};

export default function OnboardingStep2() {
  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark">
      <header className="bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm sticky top-0 z-10">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Sparkles className="text-primary size-8" />
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">Teslearn</h1>
          </div>
        </nav>
      </header>

      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Embark on Your Learning Quest!</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-12">
            Choose your adventure! Will you master a specific topic or forge a grand study schedule?
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            <PathCard
              icon={<Rocket className="text-primary text-4xl" />}
              badgeText="New Quest!"
              badgeIcon={<Sparkles className="text-sm" />}
              title="Master a Topic"
              description="Embark on a focused mission to conquer a single subject. Unlock achievements quickly!"
              progressValue={45}
              progressColor="bg-green-400"
              buttonText="Start Your Adventure"
              href="/upload"
            />
            <PathCard
              icon={<Calendar className="text-primary text-4xl" />}
              badgeText="Epic Quest!"
              badgeIcon={<Award className="text-sm" />}
              title="Follow your Schedule"
              description="Carry out the detailed plan for your learning journey. Earn consistent progress rewards!"
              progressValue={70}
              progressColor="bg-blue-400"
              buttonText="Follow Your Campaign"
              href="/study/plan"
            />
          </div>
        </div>
      </main>
    </div>
  );
}

