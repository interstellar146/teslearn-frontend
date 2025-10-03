'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { UploadCloud, Link, FileText, Bot } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function UploadPage() {
  const [uploadMethod, setUploadMethod] = useState<'file' | 'url' | 'text'>('file');
  const [file, setFile] = useState<File | null>(null);
  const [url, setUrl] = useState('');
  const [text, setText] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (files: FileList | null) => {
    if (files && files.length > 0) {
      setFile(files[0]);
    }
  };

  const handleDragEnter = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  
  const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };
  
  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    handleFileChange(e.dataTransfer.files);
  };

  const handleGenerate = () => {
    // In a real app, you would trigger the LangGraph agentic flow here.
    // You would send the file, URL, or text to your backend API.
    if (uploadMethod === 'file' && file) {
        console.log("Generating study set from file:", file.name);
    } else if (uploadMethod === 'url' && url) {
        console.log("Generating study set from URL:", url);
    } else if (uploadMethod === 'text' && text) {
        console.log("Generating study set from text content.");
    }
    alert("Generation process started! (Check console for details)");
  };

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <header className="mb-8 max-w-2xl">
        <h1 className="text-4xl font-bold text-gray-800">Create a New Study Set</h1>
        <p className="text-gray-500 mt-2">Upload your materials, and our AI will generate a personalized learning experience for you, including notes, flashcards, quizzes, and more.</p>
      </header>

      <Card className="max-w-2xl">
        <CardHeader>
          <div className="flex border-b">
            <button onClick={() => setUploadMethod('file')} className={cn("flex-1 p-3 font-medium text-center", uploadMethod === 'file' ? 'border-b-2 border-primary text-primary' : 'text-gray-500')}>
                <UploadCloud className="inline-block mr-2 h-5 w-5"/> Upload File
            </button>
            <button onClick={() => setUploadMethod('url')} className={cn("flex-1 p-3 font-medium text-center", uploadMethod === 'url' ? 'border-b-2 border-primary text-primary' : 'text-gray-500')}>
                <Link className="inline-block mr-2 h-5 w-5"/> Import from URL
            </button>
            <button onClick={() => setUploadMethod('text')} className={cn("flex-1 p-3 font-medium text-center", uploadMethod === 'text' ? 'border-b-2 border-primary text-primary' : 'text-gray-500')}>
                <FileText className="inline-block mr-2 h-5 w-5"/> Paste Text
            </button>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          {uploadMethod === 'file' && (
            <div className="space-y-4">
              <Label 
                htmlFor="file-upload" 
                className={cn(
                    "flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100",
                    isDragging && "bg-primary/10 border-primary"
                )}
                onDragEnter={handleDragEnter}
                onDragOver={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <UploadCloud className="w-10 h-10 mb-3 text-gray-400" />
                  <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                  <p className="text-xs text-gray-500">PDF, DOCX, TXT, or image files</p>
                </div>
                <Input id="file-upload" type="file" className="hidden" onChange={(e) => handleFileChange(e.target.files)} />
              </Label>
              {file && <p className="text-sm font-medium text-center text-gray-700">Selected file: {file.name}</p>}
            </div>
          )}
          {uploadMethod === 'url' && (
             <div className="space-y-2">
                <Label htmlFor="url-input">Webpage or YouTube URL</Label>
                <Input id="url-input" type="url" placeholder="https://example.com" value={url} onChange={(e) => setUrl(e.target.value)} />
             </div>
          )}
          {uploadMethod === 'text' && (
            <div className="space-y-2">
                <Label htmlFor="text-input">Paste your content here</Label>
                <Textarea id="text-input" placeholder="Paste your notes, article, or any text content..." className="min-h-[250px]" value={text} onChange={(e) => setText(e.target.value)} />
            </div>
          )}

          <Button onClick={handleGenerate} size="lg" className="w-full mt-6">
            <Bot className="mr-2 h-5 w-5" />
            Generate Study Set
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
