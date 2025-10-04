'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from '@/components/ui/label';
import { Sparkles, Dumbbell, Puzzle, School, Award } from 'lucide-react';
import { cn } from '@/lib/utils';

// Helper component for each question row
const QuestionnaireItem = ({
  icon,
  label,
  placeholder,
  options,
  onValueChange,
  achievementVisible,
}: {
  icon: React.ReactNode;
  label: string;
  placeholder: string;
  options: string[];
  onValueChange: (value: string) => void;
  achievementVisible: boolean;
}) => (
  <div className="relative">
    <Label className="flex items-center text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
      {icon} {label}
    </Label>
    <Select onValueChange={onValueChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map(option => (
          <SelectItem key={option} value={option}>
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
    <Award
      className={cn(
        "absolute top-1/2 right-[-2.5rem] -translate-y-1/2 text-yellow-400 text-4xl transition-transform duration-300 scale-0",
        achievementVisible && "scale-100"
      )}
    />
  </div>
);

export default function OnboardingStep1() {
  const router = useRouter();
  const [strengthsSelected, setStrengthsSelected] = useState(false);
  const [weaknessesSelected, setWeaknessesSelected] = useState(false);
  const [gradesSelected, setGradesSelected] = useState(false);

  const completedCount = [strengthsSelected, weaknessesSelected, gradesSelected].filter(Boolean).length;
  const step = completedCount;
  const progress = (step / 3) * 100;

  const handleFinish = () => {
    localStorage.setItem('completedstep1', 'true');
    router.push('/onboarding/step-2');
  };

  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark">
      <header className="bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm sticky top-0 z-10 border-b border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Sparkles className="h-8 w-8 text-primary" />
              <h1 className="text-xl font-bold text-slate-900 dark:text-white">Teslearn</h1>
            </div>
          </div>
        </div>
      </header>
      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-lg space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Tell us a bit about yourself</h2>
            <p className="mt-2 text-center text-sm text-slate-600 dark:text-slate-400">This will help us personalize your learning journey.</p>
          </div>
          <div className="space-y-6 bg-white dark:bg-background-dark p-8 rounded-lg border border-slate-200 dark:border-slate-800">
            <div>
              <div className="flex justify-between text-sm font-medium text-slate-500 dark:text-slate-400">
                <p>Step {step === 0 ? 0 : step} of 3</p>
                <p>{Math.round(progress > 100 ? 100 : progress)}%</p>
              </div>
              <Progress value={progress} className="mt-1 h-2" />
            </div>
            <div className="space-y-6">
              <QuestionnaireItem
                icon={<Dumbbell className="mr-2 text-primary" />}
                label="What are your academic strengths?"
                placeholder="Select your strengths"
                options={["Mathematics", "Reading Comprehension", "Problem Solving", "Writing"]}
                onValueChange={() => setStrengthsSelected(true)}
                achievementVisible={strengthsSelected}
              />
              <QuestionnaireItem
                icon={<Puzzle className="mr-2 text-primary" />}
                label="What are your academic weaknesses?"
                placeholder="Select your weaknesses"
                options={["Algebra", "Grammar", "Time Management", "Exam Anxiety"]}
                onValueChange={() => setWeaknessesSelected(true)}
                achievementVisible={weaknessesSelected}
              />
              <QuestionnaireItem
                icon={<School className="mr-2 text-primary" />}
                label="What are your current academic grades?"
                placeholder="Select your grade range"
                options={["A (90-100%)", "B (80-89%)", "C (70-79%)", "D (60-69%)", "Below 60%"]}
                onValueChange={() => setGradesSelected(true)}
                achievementVisible={gradesSelected}
              />
            </div>
            <div>
              <Button
                onClick={handleFinish}
                className="w-full"
                disabled={!strengthsSelected || !weaknessesSelected || !gradesSelected}
              >
                Finish &amp; Go to Dashboard
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
