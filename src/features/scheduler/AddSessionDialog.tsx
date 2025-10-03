'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusCircle } from 'lucide-react';

// Define the type for the props, now expecting a function that accepts all three arguments.
type AddSessionDialogProps = {
  onAddSession: (subject: string, topic: string, time: string) => void;
};

export function AddSessionDialog({ onAddSession }: AddSessionDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [topic, setTopic] = useState('');
  const [subject, setSubject] = useState(''); // Add state for the subject
  const [time, setTime] = useState('');

  const handleSubmit = () => {
    // Ensure all three fields are filled before submitting
    if (topic && time && subject) {
      onAddSession(subject, topic, time); // Pass all three arguments
      setIsOpen(false);
      // Reset all fields
      setTopic('');
      setSubject('');
      setTime('');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> Add Session
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Study Session</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          {/* Add an Input field for the subject */}
          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="e.g., Math"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="topic">Topic</Label>
            <Input
              id="topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g., Calculus Review"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="time">Time</Label>
            <Input
              id="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              placeholder="e.g., 10:00 AM - 12:00 PM"
            />
          </div>
        </div>
        <Button onClick={handleSubmit}>Add to Schedule</Button>
      </DialogContent>
    </Dialog>
  );
}

