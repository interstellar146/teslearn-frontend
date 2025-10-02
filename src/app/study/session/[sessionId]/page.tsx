'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from '@/components/ui/label';
import { ChevronLeft, ChevronRight, Video, FileText, Bot, Sparkles, Flame, Trophy } from 'lucide-react';
import type { StudySession } from '@/types';

// MOCK DATA: In a real app, you would fetch this data using the `sessionId` from the URL
const sessionData = {
  id: '3',
  title: 'Machine Learning Basics',
  courseProgress: 60,
  videoUrl: 'https://www.youtube.com/embed/KNAWp2S3w94', // Example video
  notes: `
    <h3 class="font-bold text-lg mb-2">Key Concepts</h3>
    <ul class="list-disc pl-5 space-y-1">
      <li><strong>Supervised Learning:</strong> Learning from labeled data (e.g., spam detection).</li>
      <li><strong>Unsupervised Learning:</strong> Finding patterns in unlabeled data (e.g., customer segmentation).</li>
      <li><strong>Model Training:</strong> The process of feeding an algorithm data to learn from.</li>
      <li><strong>Evaluation Metrics:</strong> Accuracy, Precision, and Recall are used to measure model performance.</li>
    </ul>
    <p class="mt-4">This session covers the fundamental concepts of machine learning, including supervised and unsupervised learning, model training, and evaluation metrics. Understanding these basics is crucial for building your first machine learning model.</p>
  `,
  flashcards: [
    { id: 1, front: 'What is Supervised Learning?', back: 'A type of machine learning where the model learns from data that has been manually labeled with the correct output.' },
    { id: 2, front: 'What is Unsupervised Learning?', back: 'A type of machine learning that looks for previously undetected patterns in a data set with no pre-existing labels.' },
    { id: 3, front: 'What is a common use case for Unsupervised Learning?', back: 'Customer segmentation in marketing data to find distinct groups of buyers.' },
  ],
  quiz: {
    questions: [
      { id: 1, text: 'Which of the following is an example of a classification task?', options: ['Predicting house prices', 'Identifying spam emails', 'Grouping customers by purchasing habits'], answer: 'Identifying spam emails' },
      { id: 2, text: 'What does "model training" fundamentally involve?', options: ['Writing the initial Python code', 'Deploying the model to a server', 'Feeding labeled data to an algorithm so it can learn patterns'], answer: 'Feeding labeled data to an algorithm so it can learn patterns' },
    ],
  },
};

// --- Sub-components for interactive tabs ---

function Flashcard({ card }: { card: typeof sessionData.flashcards[0] }) {
  const [isFlipped, setIsFlipped] = useState(false);
  return (
    <div
      className="w-full h-64 perspective-1000 cursor-pointer"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div
        className={`relative w-full h-full transform-style-3d transition-transform duration-500 ${isFlipped ? 'rotate-y-180' : ''}`}
      >
        <div className="absolute w-full h-full backface-hidden flex items-center justify-center p-6 bg-white border rounded-lg shadow">
          <p className="text-xl font-semibold text-center">{card.front}</p>
        </div>
        <div className="absolute w-full h-full backface-hidden rotate-y-180 flex items-center justify-center p-6 bg-blue-50 border-blue-200 rounded-lg shadow">
          <p className="text-lg text-center text-gray-700">{card.back}</p>
        </div>
      </div>
    </div>
  );
}

function Quiz({ quiz }: { quiz: typeof sessionData.quiz }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const question = quiz.questions[currentQuestionIndex];

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-muted-foreground">Mastery Progress</p>
        <Progress value={((currentQuestionIndex) / quiz.questions.length) * 100} className="w-full mt-1" />
      </div>
      <div>
        <h4 className="font-bold text-xl mb-1">Question {currentQuestionIndex + 1} of {quiz.questions.length}</h4>
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
  );
}


// --- Main Study Session Page ---

export default function StudySessionPage({ params }: { params: { sessionId: string } }) {
  // In a real app, you would use `params.sessionId` to fetch this session's data
  // const { data: sessionData, isLoading } = useQuery(['session', params.sessionId], fetchSessionData);

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">{sessionData.title}</h1>
          <p className="text-gray-500">Let's dive in and master this topic together. 🚀</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Main Content Area */}
          <div className="lg:col-span-2">
            <Card>
              <Tabs defaultValue="video" className="w-full">
                <TabsList className="grid w-full grid-cols-4 rounded-t-lg rounded-b-none p-0 h-14">
                  <TabsTrigger value="video" className="rounded-tl-lg h-full"><Video className="w-4 h-4 mr-2"/>Video</TabsTrigger>
                  <TabsTrigger value="notes" className="h-full"><FileText className="w-4 h-4 mr-2"/>Notes</TabsTrigger>
                  <TabsTrigger value="flashcards" className="h-full"><Sparkles className="w-4 h-4 mr-2"/>Flashcards</TabsTrigger>
                  <TabsTrigger value="quiz" className="rounded-tr-lg h-full"><Bot className="w-4 h-4 mr-2"/>Quiz</TabsTrigger>
                </TabsList>

                <div className="p-6">
                  <TabsContent value="video">
                    <div className="aspect-video bg-black rounded-lg overflow-hidden border">
                      <iframe width="100%" height="100%" src={sessionData.videoUrl} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                    </div>
                  </TabsContent>
                  <TabsContent value="notes">
                     <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: sessionData.notes }} />
                  </TabsContent>
                  <TabsContent value="flashcards">
                    <Flashcard card={sessionData.flashcards[0]} />
                     <p className="text-center text-sm text-muted-foreground mt-4">Click card to flip. Use arrows to navigate.</p>
                  </TabsContent>
                  <TabsContent value="quiz">
                    <Quiz quiz={sessionData.quiz} />
                  </TabsContent>
                </div>
              </Tabs>
            </Card>

            <div className="flex justify-between items-center mt-6">
              <Button variant="outline"><ChevronLeft className="w-4 h-4 mr-2"/> Previous Topic</Button>
              <Button>Mark as Complete</Button>
              <Button variant="outline">Next Topic <ChevronRight className="w-4 h-4 ml-2"/></Button>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Course Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <Progress value={sessionData.courseProgress} />
                <p className="text-center text-sm mt-2 text-gray-600">{sessionData.courseProgress}% Complete</p>
              </CardContent>
            </Card>
             <Card>
              <CardHeader>
                <CardTitle>Gamification</CardTitle>
              </CardHeader>
              <CardContent className="flex justify-around text-center">
                 <div>
                    <p className="text-3xl font-bold flex items-center justify-center gap-1"><Flame className="text-orange-500" /> 5</p>
                    <p className="text-sm text-gray-500">Day Streak</p>
                 </div>
                 <div>
                    <p className="text-3xl font-bold flex items-center justify-center gap-1"><Trophy className="text-yellow-500" /> 2</p>
                    <p className="text-sm text-gray-500">Scratch Cards</p>
                 </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
