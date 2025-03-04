import React from 'react';
import { Message, Citation } from '../types';
import { formatDate } from '../lib/utils';
import { Bot, User, FileText, ExternalLink } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { cn } from '../lib/utils';

interface ChatMessageProps {
  message: Message;
  citations?: Citation[];
}

function ChatMessage({ message, citations = [] }: ChatMessageProps) {
  const isUser = message.role === 'user';

  return (
    <div className={cn(
      "py-6 px-4 sm:px-6",
      isUser ? 'bg-white' : 'bg-secondary-50'
    )}>
      <div className="max-w-3xl mx-auto flex gap-4">
        <div className="flex-shrink-0">
          <div className={cn(
            "w-8 h-8 rounded-lg flex items-center justify-center",
            isUser 
              ? "bg-secondary-100 text-secondary-700" 
              : "bg-primary-100 text-primary-700"
          )}>
            {isUser ? <User size={16} /> : <Bot size={16} />}
          </div>
        </div>
        
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2">
            <span className="font-medium text-sm text-secondary-900">
              {isUser ? 'You' : 'Bylaw Assistant'}
            </span>
            {message.createdAt && (
              <span className="text-xs text-secondary-500">{formatDate(message.createdAt)}</span>
            )}
          </div>
          
          <div className="prose prose-sm max-w-none text-secondary-800">
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
              components={{
                a: ({ node, ...props }) => (
                  <a 
                    {...props} 
                    className="text-primary-600 hover:text-primary-800 underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                ),
                p: ({ node, ...props }) => (
                  <p {...props} className="mb-3 leading-relaxed" />
                ),
                ul: ({ node, ...props }) => (
                  <ul {...props} className="mb-3 pl-6 list-disc" />
                ),
                ol: ({ node, ...props }) => (
                  <ol {...props} className="mb-3 pl-6 list-decimal" />
                ),
                li: ({ node, ...props }) => (
                  <li {...props} className="mb-1" />
                ),
                h1: ({ node, ...props }) => (
                  <h1 {...props} className="text-xl font-semibold mb-3 mt-5" />
                ),
                h2: ({ node, ...props }) => (
                  <h2 {...props} className="text-lg font-semibold mb-3 mt-4" />
                ),
                h3: ({ node, ...props }) => (
                  <h3 {...props} className="text-base font-semibold mb-2 mt-4" />
                ),
                code: ({ node, ...props }) => (
                  <code {...props} className="bg-secondary-100 px-1 py-0.5 rounded text-secondary-800 text-sm" />
                ),
                pre: ({ node, ...props }) => (
                  <pre {...props} className="bg-secondary-100 p-3 rounded-lg overflow-x-auto text-sm mb-4" />
                ),
              }}
            >
              {message.content}
            </ReactMarkdown>
          </div>
          
          {citations.length > 0 && (
            <div className="mt-4 border-t border-secondary-200 pt-3">
              <h4 className="text-sm font-medium text-secondary-700 mb-2">Citations</h4>
              <div className="space-y-3">
                {citations.map((citation, index) => (
                  <div key={index} className="bg-white p-3 rounded-lg shadow-soft text-sm border border-secondary-200">
                    <div className="flex items-start gap-2">
                      <FileText size={16} className="text-primary-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-medium text-secondary-900">{citation.source}</div>
                        <div className="text-secondary-600 text-xs">{citation.section}</div>
                        <div className="mt-1.5 text-secondary-800 text-sm">{citation.text}</div>
                        {citation.url && (
                          <a 
                            href={citation.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="mt-2 inline-flex items-center gap-1 text-xs text-primary-600 hover:text-primary-800"
                          >
                            <span>View source</span>
                            <ExternalLink size={12} />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ChatMessage;