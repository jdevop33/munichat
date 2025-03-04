import { v4 as uuidv4 } from 'uuid';
import { Message, Citation } from '../types';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function extractCitations(text: string): { text: string, citations: Citation[] } {
  const citations: Citation[] = [];
  const citationRegex = /\[citation: (.*?)\]/g;
  
  const cleanedText = text.replace(citationRegex, (match, citation) => {
    try {
      const citationData = JSON.parse(citation);
      citations.push(citationData);
      return `[${citations.length}]`;
    } catch (e) {
      return match;
    }
  });
  
  return { text: cleanedText, citations };
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

export function createMessage(role: Message['role'], content: string): Message {
  return {
    id: uuidv4(),
    role,
    content,
    createdAt: new Date(),
  };
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  
  return function(...args: Parameters<T>) {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}