import type { StudySession } from '@/types';

// Define more specific types for our content
export interface Flashcard {
  id: number;
  front: string;
  back: string;
}

export interface QuizQuestion {
  id: number;
  text: string;
  options: string[];
  answer: string;
}

export interface MindmapNode {
    id: string;
    content: string;
    children?: MindmapNode[];
}

// This is the structure for the content of a single study set
export interface StudySetContent {
    video: {
        url: string;
        description: string;
    };
    podcast: {
        url: string; // In a real app, this would be an audio file URL
        summary: string;
    };
    notes: string; // HTML content
    mindmap: MindmapNode;
    flashcards: Flashcard[];
    quiz: {
        questions: QuizQuestion[];
    };
    viva: {
        questions: string[]; // AI Tutor questions
    };
    virtualLab: {
        title: string;
        description: string;
        task: string;
    };
}

// --- MOCK DATABASE ---
// A Map to hold the content for different study sessions, keyed by session ID.
export const studySetData = new Map<string, StudySetContent>();

// --- DATA FOR: Data Structures & Algorithms (DSA) ---
studySetData.set('dsa-arrays', {
    video: {
        url: 'https://www.youtube.com/embed/videoseries?list=PL2_aWCzGMAwI3W_JlcBbtYTwiQSsOTa6P',
        description: 'A comprehensive video tutorial covering the fundamentals of arrays and strings, including operations like insertion, deletion, and traversal.'
    },
    podcast: {
        url: '#',
        summary: 'Listen to a quick 5-minute audio recap on the time complexity of common array operations and why choosing the right data structure is critical for performance.'
    },
    notes: `
        <h3 class="font-bold text-lg mb-2">Arrays & Strings</h3>
        <p>Arrays are a fundamental data structure, storing elements of the same type in contiguous memory locations.</p>
        <ul class="list-disc pl-5 mt-2 space-y-1">
            <li><strong>Time Complexity:</strong> Accessing an element by index is O(1). Searching, inserting, or deleting an element is typically O(n).</li>
            <li><strong>Dynamic Arrays:</strong> In languages like Python and JavaScript, arrays are dynamic and can resize themselves, though this can be a costly operation.</li>
        </ul>
    `,
    mindmap: {
        id: 'root',
        content: 'Arrays & Strings',
        children: [
            { id: '1', content: 'Properties', children: [{id: '1a', content: 'Contiguous Memory'}, {id: '1b', content: 'Fixed/Dynamic Size'}] },
            { id: '2', content: 'Operations', children: [{id: '2a', content: 'Access (O(1))'}, {id: '2b', content: 'Search (O(n))'}, {id: '2c', content: 'Insertion (O(n))'}] },
            { id: '3', content: 'String Manipulations', children: [{id: '3a', content: 'Concatenation'}, {id: '3b', content: 'Substring'}] }
        ]
    },
    flashcards: [
        { id: 1, front: 'What is the time complexity of accessing an array element by its index?', back: 'O(1) - Constant time.' },
        { id: 2, front: 'What is a major disadvantage of inserting an element at the beginning of a static array?', back: 'All subsequent elements must be shifted, resulting in O(n) time complexity.' }
    ],
    quiz: {
        questions: [
            { id: 1, text: 'Which operation is fastest on a standard array?', options: ['Access by index', 'Insert at start', 'Search for value'], answer: 'Access by index' },
            { id: 2, text: 'A "String" is conceptually often implemented as an array of what?', options: ['Integers', 'Characters', 'Booleans'], answer: 'Characters' }
        ]
    },
    viva: {
        questions: [
            "Explain the difference between a static and a dynamic array.",
            "Describe a scenario where a linked list might be a better choice than an array.",
            "How would you reverse a string in-place?"
        ]
    },
    virtualLab: {
        title: 'Array Reversal Algorithm',
        description: 'Implement an algorithm to reverse an array in-place. Your function should take an array as input and modify it directly without creating a new array.',
        task: 'Write a function `reverseArray(arr)` that reverses the elements of `arr`.'
    }
});


// --- DATA FOR: Maths (Calculus) ---
studySetData.set('maths-limits', {
    video: {
        url: 'https://www.youtube.com/embed/videoseries?list=PLDesaqWTN6ESsmw2oFk_2_vA_g_sX_rMh',
        description: 'An introductory video on the concept of limits in calculus. Understand what it means for a function to approach a certain value.'
    },
    podcast: {
        url: '#',
        summary: 'This 5-minute audio explains the intuitive idea behind limits and introduces the concept of one-sided limits and continuity.'
    },
    notes: `
        <h3 class="font-bold text-lg mb-2">Introduction to Limits</h3>
        <p>A limit is the value that a function "approaches" as the input "approaches" some value.</p>
        <ul class="list-disc pl-5 mt-2 space-y-1">
            <li><strong>Notation:</strong> lim (x->c) f(x) = L</li>
            <li><strong>Continuity:</strong> A function is continuous at a point 'c' if the limit as x approaches c exists, f(c) exists, and they are equal.</li>
        </ul>
    `,
    mindmap: {
        id: 'root',
        content: 'Limits',
        children: [
            { id: '1', content: 'Definition', children: [{id: '1a', content: 'Approaching a value'}, {id: '1b', content: 'L'}] },
            { id: '2', content: 'Properties', children: [{id: '2a', content: 'Sum Rule'}, {id: '2b', content: 'Product Rule'}] },
            { id: '3', content: 'Continuity', children: [{id: '3a', content: 'Limit = f(c)'}] }
        ]
    },
    flashcards: [
        { id: 1, front: 'What does lim (x->2) of x^2 equal?', back: '4' },
        { id: 2, front: 'What is a condition for a function to be continuous at a point c?', back: 'The limit of the function as x approaches c must exist and be equal to f(c).' }
    ],
    quiz: {
        questions: [
            { id: 1, text: 'What is the limit of f(x) = 5 as x approaches 3?', options: ['3', '5', '0'], answer: '5' },
            { id: 2, text: 'If a function has a "jump" at x=c, it is said to be...', options: ['Continuous', 'Discontinuous', 'Differentiable'], answer: 'Discontinuous' }
        ]
    },
    viva: {
        questions: [
            "Explain in your own words what a limit is.",
            "What is the difference between a limit and the function's value at a point?",
            "Provide an example of a function that is not continuous."
        ]
    },
    virtualLab: {
        title: 'Limit Visualizer',
        description: 'Explore the concept of a limit by plugging in values closer and closer to a target point. Observe how the function\'s output behaves.',
        task: 'For the function f(x) = (x^2 - 4) / (x - 2), what value does f(x) approach as x approaches 2?'
    }
});
