'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusCircle } from 'lucide-react';

interface AddSessionDialogProps {
  onAddSession: (topic: string, time: string) => void;
}

export function AddSessionDialog({ onAddSession }: AddSessionDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [topic, setTopic] = useState('');
  const [time, setTime] = useState('');

  const handleSubmit = () => {
    if (topic && time) {
      onAddSession(topic, time);
      setIsOpen(false);
      setTopic('');
      setTime('');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline"><PlusCircle className="mr-2 h-4 w-4" /> Add Session</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Study Session</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="topic" className="text-right">Topic</Label>
            <Input
              id="topic"
              value={topic}
              onChange={e => setTopic(e.target.value)}
              placeholder="e.g., Quantum Physics"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="time" className="text-right">Time</Label>
            <Input
              id="time"
              value={time}
              onChange={e => setTime(e.target.value)}
              placeholder="e.g., 2:00 PM - 4:00 PM"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">Cancel</Button>
          </DialogClose>
          <Button type="submit" onClick={handleSubmit}>Add to Schedule</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
