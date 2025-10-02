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
  topic: string;
  subject: string;
  date: Date;
  time: string;
  isCompleted: boolean;
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

