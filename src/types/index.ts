// In a real application, these types would be more detailed
// and would perfectly match the shape of your backend API responses.

export type User = {
  id: string;
  fullName: string;
  email: string;
  avatarUrl?: string;
};

export type StudySession = {
  id: string;
  date: Date;
  subject: string;
  topic: string;
  time: string;
  isCompleted: boolean;
  iconBg: string;      // For the background color of the icon
  iconColor: string;   // For the color of the icon itself
  content?: {          // Optional: For AI-generated content
    videoUrl?: string;
    notes?: string;
    flashcards?: { id: number; front: string; back: string }[];
    quiz?: {
      questions: { id: number; text: string; options: string[]; answer: string }[];
    };
  };
};


export type QuizQuestion = {
  id: number;
  text: string;
  options: string[];
  answer: string;
};

export type Flashcard = {
  id: number;
  front: string;
  back: string;
};

