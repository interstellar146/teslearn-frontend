import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-8">
      <h1 className="text-5xl font-bold">Welcome to TesLearn</h1>
      <p className="text-xl text-gray-600 mt-4 max-w-2xl">
        The AI-powered platform designed to optimize your learning, schedule your studies, and help you master any subject.
      </p>
      <div className="mt-8">
        <Button asChild size="lg">
          <Link href="/dashboard">Go to Dashboard</Link>
        </Button>
      </div>
    </div>
  );
}