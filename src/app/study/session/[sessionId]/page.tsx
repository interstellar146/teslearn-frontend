'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { BrainCircuit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from '@/components/ui/label';
import { ChevronLeft, ChevronRight } from 'lucide-react';
// --- FIX APPLIED HERE ---
// We rename the import to avoid a name collision with the browser's default 'Image' object.
import NextImage from 'next/image';

// --- MOCK DATA: Rich data from your new example ---
const sessionData = {
  id: '3',
  title: 'Machine Learning Basics',
  courseProgress: 60,
  videoUrl: 'https://www.youtube.com/embed/KNAWp2S3w94',
  notes: `
    <h3 class="font-bold text-lg mb-2">Key Concepts</h3>
    <ul class="list-disc pl-5 space-y-1">
      <li><strong>Supervised Learning:</strong> Learning from labeled data (e.g., spam detection).</li>
      <li><strong>Unsupervised Learning:</strong> Finding patterns in unlabeled data (e.g., customer segmentation).</li>
      <li><strong>Model Training:</strong> The process of feeding an algorithm data to learn from.</li>
    </ul>
  `,
  flashcards: [
    { id: 1, front: 'What is Supervised Learning?', back: 'A type of machine learning where the model learns from data that has been manually labeled with the correct output.' },
    { id: 2, front: 'What is Unsupervised Learning?', back: 'A type of machine learning that looks for previously undetected patterns in a data set with no pre-existing labels.' },
  ],
  quiz: {
    questions: [
      { id: 1, text: 'Which is an example of a classification task?', options: ['Predicting house prices', 'Identifying spam emails', 'Grouping customers'], answer: 'Identifying spam emails' },
      { id: 2, text: 'What does "model training" involve?', options: ['Writing the code', 'Deploying to a server', 'Feeding data to an algorithm'], answer: 'Feeding data to an algorithm' },
    ],
  },
};


// --- Sub-components for interactive views ---

const VideoView = () => (
    <div className="aspect-video bg-black rounded-lg overflow-hidden border">
        <iframe width="100%" height="100%" src={sessionData.videoUrl} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
    </div>
);

const NotesView = () => (
    <Card className="p-8 h-full">
        <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: sessionData.notes }} />
    </Card>
);

function FlashcardsView() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const card = sessionData.flashcards[currentIndex];
    const [isFlipped, setIsFlipped] = useState(false);

    useEffect(() => {
        setIsFlipped(false);
    }, [currentIndex]);

    const goToNext = () => setCurrentIndex((prev) => (prev + 1) % sessionData.flashcards.length);
    const goToPrev = () => setCurrentIndex((prev) => (prev - 1 + sessionData.flashcards.length) % sessionData.flashcards.length);

    return (
        <div>
            <div className="w-full h-64 perspective-1000 cursor-pointer" onClick={() => setIsFlipped(!isFlipped)}>
                <div className={`relative w-full h-full transform-style-3d transition-transform duration-500 ${isFlipped ? 'rotate-y-180' : ''}`}>
                    <div className="absolute w-full h-full backface-hidden flex items-center justify-center p-6 bg-white border rounded-lg shadow"><p className="text-xl font-semibold text-center">{card.front}</p></div>
                    <div className="absolute w-full h-full backface-hidden rotate-y-180 flex items-center justify-center p-6 bg-blue-50 border-blue-200 rounded-lg shadow"><p className="text-lg text-center text-gray-700">{card.back}</p></div>
                </div>
            </div>
            <div className="flex items-center justify-center mt-4 gap-4">
                <Button variant="outline" onClick={goToPrev}><ChevronLeft className="w-4 h-4 mr-2"/> Prev</Button>
                <p className="text-sm text-gray-500">{currentIndex + 1} / {sessionData.flashcards.length}</p>
                <Button variant="outline" onClick={goToNext}>Next <ChevronRight className="w-4 h-4 ml-2"/></Button>
            </div>
        </div>
    );
}

function QuizView() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const question = sessionData.quiz.questions[currentQuestionIndex];

  return (
    <Card className="p-8">
        <div className="space-y-6">
          <div>
            <p className="text-sm text-muted-foreground">Mastery Progress</p>
            <Progress value={((currentQuestionIndex) / sessionData.quiz.questions.length) * 100} className="w-full mt-1" />
          </div>
          <div>
            <h4 className="font-bold text-xl mb-1">Question {currentQuestionIndex + 1} of {sessionData.quiz.questions.length}</h4>
            <p className="text-lg">{question.text}</p>
          </div>
          <RadioGroup onValueChange={setSelectedAnswer} value={selectedAnswer || ''} className="space-y-3">
            {question.options.map(option => (
              <Label key={option} htmlFor={option} className="flex items-center space-x-3 p-4 border rounded-md has-[:checked]:bg-blue-50 has-[:checked]:border-primary cursor-pointer transition-colors">
                <RadioGroupItem value={option} id={option} />
                <span>{option}</span>
              </Label>
            ))}
          </RadioGroup>
          <Button disabled={!selectedAnswer} className="w-full">Submit Answer</Button>
        </div>
    </Card>
  );
}

const PodcastView = () => <Card className="p-8 h-full flex items-center justify-center text-lg">Podcast / Audio Recap</Card>;
const VivaView = () => <Card className="p-8 h-full flex items-center justify-center text-lg">Viva / Tutor Me</Card>;


// --- UPDATED Loading State Component ---
const LoadingState = () => (
    <div className="flex flex-col items-center justify-center h-[80vh] text-center">
        {/* --- FIX APPLIED HERE: Use the renamed 'NextImage' component --- */}
        <NextImage
          src="/ai-generating.svg" // Assumes your SVG is named this in the 'public' folder
          alt="AI is generating content"
          width={300}
          height={300}
          className="animate-pulse-slow" // A subtle pulsing animation
          priority
        />
        <h2 className="text-3xl font-bold mt-8">Our AI is crafting your lesson...</h2>
        <p className="text-lg text-gray-500 mt-2">Personalizing content just for you. This might take a moment.</p>
        <style jsx>{`
            @keyframes pulse-slow {
                0%, 100% {
                    opacity: 1;
                    transform: scale(1);
                }
                50% {
                    opacity: 0.85;
                    transform: scale(0.98);
                }
            }
            .animate-pulse-slow {
                animation: pulse-slow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
            }
        `}</style>
    </div>
);


export default function StudySetPage() {
  const searchParams = useSearchParams();
  const view = searchParams.get('view') || 'notes';

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, [view]);

  const renderContent = () => {
    if (isLoading) {
      return <LoadingState />;
    }

    switch (view) {
      case 'video': return <VideoView />;
      case 'notes': return <NotesView />;
      case 'flashcards': return <FlashcardsView />;
      case 'quiz': return <QuizView />;
      case 'audio': return <PodcastView />;
      case 'viva': return <VivaView />;
      default: return <NotesView />;
    }
  };

  const getTitle = () => {
    switch (view) {
        case 'video': return "Video Lesson";
        case 'notes': return "Notes & Materials";
        case 'flashcards': return "Flashcards";
        case 'quiz': return "Test & Quiz";
        case 'audio': return "Podcast Recap";
        case 'viva': return "AI Viva Practice";
        default: return "Study Set";
    }
  }

  return (
    <div className="p-4 sm:p-6 md:p-8 h-full flex flex-col">
        <header className="mb-6">
          <p className="text-primary font-semibold">Today's Objective</p>
          <h1 className="text-4xl font-bold text-gray-900">{getTitle()}</h1>
        </header>
        <div className="flex-1">
          {renderContent()}
        </div>
    </div>
  );
}

