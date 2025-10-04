'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft, ChevronRight, PlayCircle, Circle, Flame, Trophy, Mic, MessageSquare, Volume2, FileQuestion } from 'lucide-react';
import NextImage from 'next/image';
import { cn } from '@/lib/utils';
import { studySetData, StudySetContent, Flashcard, QuizQuestion } from '@/lib/mock-data';
import Link from 'next/link';

// --- View Components for Tabs ---

const VideoView = ({ video }: { video: StudySetContent['video'] }) => (
  <div>
    <div className="aspect-video rounded-lg overflow-hidden relative group border">
       <iframe width="100%" height="100%" src={video.url} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
    </div>
    <div className="mt-4">
      <h3 className="text-lg font-bold">Video Description</h3>
      <p className="text-slate-600 mt-2 text-sm leading-relaxed">{video.description}</p>
    </div>
  </div>
);

const NotesView = ({ notes }: { notes: StudySetContent['notes'] }) => <Card className="p-6 min-h-[400px]"><div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: notes }} /></Card>;

function FlashcardsView({ flashcards }: { flashcards: Flashcard[] }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const card = flashcards[currentIndex];
    const [isFlipped, setIsFlipped] = useState(false);

    useEffect(() => { setIsFlipped(false); }, [currentIndex]);

    const goToNext = () => setCurrentIndex((prev) => (prev + 1) % flashcards.length);
    const goToPrev = () => setCurrentIndex((prev) => (prev - 1 + flashcards.length) % flashcards.length);

    return (
        <Card className="p-6 min-h-[400px] flex flex-col justify-between">
            <div className="w-full h-64 perspective-1000 cursor-pointer" onClick={() => setIsFlipped(!isFlipped)}>
                <div className={`relative w-full h-full transform-style-3d transition-transform duration-500 ${isFlipped ? 'rotate-y-180' : ''}`}>
                    <div className="absolute w-full h-full backface-hidden flex items-center justify-center p-6 bg-white border rounded-lg shadow"><p className="text-xl font-semibold text-center">{card.front}</p></div>
                    <div className="absolute w-full h-full backface-hidden rotate-y-180 flex items-center justify-center p-6 bg-blue-50 border-blue-200 rounded-lg shadow"><p className="text-lg text-center text-gray-700">{card.back}</p></div>
                </div>
            </div>
            <div className="flex items-center justify-center mt-4 gap-4">
                <Button variant="outline" onClick={goToPrev}><ChevronLeft className="w-4 h-4 mr-2"/> Prev</Button>
                <p className="text-sm text-gray-500">{currentIndex + 1} / {flashcards.length}</p>
                <Button variant="outline" onClick={goToNext}>Next <ChevronRight className="w-4 h-4 ml-2"/></Button>
            </div>
        </Card>
    );
}

const LabView = ({ lab }: { lab: StudySetContent['virtualLab'] }) => (
    <Card className="p-8 min-h-[400px]">
        <h3 className="text-xl font-bold">{lab.title}</h3>
        <p className="text-gray-600 mt-2">{lab.description}</p>
        <div className="mt-4 p-4 bg-gray-100 rounded">
            <p className="font-mono text-sm">{lab.task}</p>
        </div>
    </Card>
);

function QuizView({ quiz }: { quiz: { questions: QuizQuestion[] } }) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const question = quiz.questions[currentQuestionIndex];

    return (
        <Card className="p-8">
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
        </Card>
    );
}

const PodcastView = ({ podcast }: { podcast: StudySetContent['podcast'] }) => (
    <Card className="p-8 min-h-[400px]">
        <div className="flex flex-col items-center text-center">
            <div className="p-4 bg-primary/10 rounded-full mb-4">
                <Volume2 className="w-10 h-10 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Audio Recap</h3>
            <p className="text-gray-600 mt-2 max-w-md">{podcast.summary}</p>
            <div className="w-full max-w-md mt-6 p-4 border rounded-lg">
                <p className="text-sm text-gray-500">Audio player placeholder</p>
            </div>
        </div>
    </Card>
);

const VivaView = ({ viva }: { viva: StudySetContent['viva'] }) => (
    <Card className="p-8 min-h-[400px]">
        <h3 className="text-xl font-bold mb-4">AI Viva Practice Questions</h3>
        <ul className="space-y-3 list-decimal pl-5">
            {viva.questions.map((question, index) => (
                <li key={index} className="text-gray-700">{question}</li>
            ))}
        </ul>
        <Button className="mt-6"><Mic className="mr-2 h-4 w-4" /> Start Practice Session</Button>
    </Card>
);

const MindmapView = ({ mindmap }: { mindmap: StudySetContent['mindmap'] }) => (
     <Card className="p-8 min-h-[400px] flex items-center justify-center">
        <p className="text-lg text-gray-500">Mindmap visualization will be implemented here.</p>
    </Card>
);


// --- Main Study Hub Page ---
export default function StudySetPage() {
  const searchParams = useSearchParams();
  const params = useParams();
  
  const sessionId = params.sessionId as string;
  const sessionContent = studySetData.get(sessionId);

  const initialView = searchParams.get('view') || 'video';
  const [activeTab, setActiveTab] = useState(initialView);

  useEffect(() => { setActiveTab(initialView); }, [initialView]);

  if (!sessionContent) {
    return (
        <main className="flex-grow w-full max-w-screen-2xl mx-auto grid place-items-center p-6">
            <div className="text-center">
                <h2 className="text-2xl font-bold">Study Set Not Found</h2>
                <p className="text-gray-500 mt-2">Could not find materials for ID: "{sessionId}"</p>
                <Button asChild className="mt-4"><Link href="/dashboard">Go to Dashboard</Link></Button>
            </div>
        </main>
    );
  }

  const TABS = [
    { value: "video", label: "Video" },
    { value: "notes", label: "Notes" },
    { value: "mindmap", label: "Mindmap" },
    { value: "flashcards", label: "Flashcards" },
    { value: "quiz", label: "Quiz" },
    { value: "audio", label: "Podcast" },
    { value: "viva", label: "Viva" },
    { value: "lab", label: "Virtual Lab" },
  ];

  // --- FIX APPLIED HERE ---
  // Placeholder data for the right sidebar now has the correct structure.
  const sidebarData = {
      courseProgress: 60,
      tableOfContents: [
        { title: 'Introduction', status: 'completed' },
        { title: 'Core Concepts', status: 'active' },
        { title: 'Advanced Topics', status: 'incomplete' },
      ],
      gamification: { streak: 5, scratchCards: 2 }
  }

  return (
    <main className="flex-grow w-full max-w-screen-2xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
      <div className="lg:col-span-2 flex flex-col gap-6">
        <Card>
          <CardHeader className="p-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">{sessionId === 'dsa-arrays' ? 'Data Structures & Algorithms' : 'Maths - Calculus'}</h2>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-8 h-auto">
                {TABS.map(tab => ( <TabsTrigger key={tab.value} value={tab.value}>{tab.label}</TabsTrigger> ))}
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent className="p-6">
             <Tabs value={activeTab}>
                <TabsContent value="video"><VideoView video={sessionContent.video} /></TabsContent>
                <TabsContent value="notes"><NotesView notes={sessionContent.notes} /></TabsContent>
                <TabsContent value="mindmap"><MindmapView mindmap={sessionContent.mindmap} /></TabsContent>
                <TabsContent value="flashcards"><FlashcardsView flashcards={sessionContent.flashcards} /></TabsContent>
                <TabsContent value="quiz"><QuizView quiz={sessionContent.quiz} /></TabsContent>
                <TabsContent value="audio"><PodcastView podcast={sessionContent.podcast} /></TabsContent>
                <TabsContent value="viva"><VivaView viva={sessionContent.viva} /></TabsContent>
                <TabsContent value="lab"><LabView lab={sessionContent.virtualLab} /></TabsContent>
             </Tabs>
          </CardContent>
        </Card>
        
        <footer className="flex items-center justify-between bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center gap-4"><Button>Mark as Complete</Button><Button variant="outline">Reschedule</Button></div>
            <div className="flex items-center gap-2"><Button variant="outline" size="icon"><ChevronLeft className="w-4 h-4" /></Button><Button variant="outline" size="icon"><ChevronRight className="w-4 h-4" /></Button></div>
        </footer>
      </div>

      <aside className="flex flex-col gap-6">
        <Card>
            <CardHeader><h3 className="text-lg font-bold">Course Progress</h3></CardHeader>
            <CardContent>
                <div className="flex justify-between items-center mb-1"><span className="text-sm font-medium">Overall Progress</span><span className="text-sm font-bold text-primary">{sidebarData.courseProgress}%</span></div>
                <Progress value={sidebarData.courseProgress} />
            </CardContent>
        </Card>
        <Card>
            <CardHeader><h3 className="text-lg font-bold">Table of Contents</h3></CardHeader>
            <CardContent>
                <ul className="space-y-2">
                    {sidebarData.tableOfContents.map(item => (
                        <li key={item.title}>
                            <a href="#" className={cn("flex items-center gap-3 p-2 rounded-md hover:bg-primary/10 group", item.status === 'active' && 'bg-primary/10')}>
                                {item.status === 'completed' || item.status === 'active' ? <PlayCircle className="text-primary text-xl" /> : <Circle className="text-slate-400 group-hover:text-primary text-xl" />}
                                <span className={cn("text-sm font-medium text-slate-700 group-hover:text-primary", item.status === 'active' && 'font-bold text-primary')}>{item.title}</span>
                            </a>
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
        <Card>
            <CardHeader><h3 className="text-lg font-bold">Gamification</h3></CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
                <div className="flex flex-col items-center justify-center p-4 bg-primary/10 rounded-lg text-center"><Flame className="text-primary text-3xl" /><span className="text-2xl font-bold mt-1">{sidebarData.gamification.streak}</span><span className="text-xs text-slate-500">Day Streak</span></div>
                <div className="flex flex-col items-center justify-center p-4 bg-primary/10 rounded-lg text-center"><Trophy className="text-primary text-3xl" /><span className="text-2xl font-bold mt-1">{sidebarData.gamification.scratchCards}</span><span className="text-xs text-slate-500">Scratch Cards</span></div>
            </CardContent>
        </Card>
      </aside>
    </main>
  );
}

