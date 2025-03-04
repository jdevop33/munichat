import React, { useRef, useEffect } from 'react';
import { Message, Citation } from '../types';
import ChatMessage from './ChatMessage';
import { extractCitations } from '../lib/utils';
import { motion } from 'framer-motion';
import { MessageSquare, Search, FileText, Calendar } from 'lucide-react';

interface ChatHistoryProps {
  messages: Message[];
}

function ChatHistory({ messages }: ChatHistoryProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Example questions for the empty state
  const exampleQuestions = [
    {
      text: "What are the current utility rates for residential properties?",
      description: "Find out about water, sewer, and waste collection fees",
      icon: <Search size={18} className="text-primary-500 mt-0.5" />
    },
    {
      text: "What are the zoning restrictions for commercial buildings downtown?",
      description: "Learn about height limits, setbacks, and permitted uses",
      icon: <FileText size={18} className="text-primary-500 mt-0.5" />
    },
    {
      text: "When was the noise ordinance last amended and what changed?",
      description: "Get details on recent updates to noise regulations",
      icon: <Calendar size={18} className="text-primary-500 mt-0.5" />
    }
  ];

  return (
    <div className="flex-1 overflow-y-auto">
      {messages.length === 0 || (messages.length === 1 && messages[0].role === 'system') ? (
        <div className="h-full flex flex-col items-center justify-center p-6 text-center">
          <div className="max-w-md">
            <div className="w-16 h-16 rounded-2xl bg-primary-100 flex items-center justify-center mx-auto mb-6">
              <MessageSquare size={28} className="text-primary-600" />
            </div>
            <h2 className="text-xl font-semibold text-secondary-900 mb-3">
              Ask about municipal bylaws
            </h2>
            <p className="text-secondary-600 mb-8 text-sm">
              Get accurate answers with citations to specific sections of bylaws, regulations, and amendments.
            </p>
            
            <div className="space-y-3">
              {exampleQuestions.map((question, index) => (
                <motion.div 
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white shadow-soft p-4 rounded-xl text-sm text-secondary-800 cursor-pointer hover:shadow-medium transition-all"
                >
                  <div className="flex items-start gap-3">
                    {question.icon}
                    <div>
                      <p className="font-medium mb-1">{question.text}</p>
                      <p className="text-xs text-secondary-500">{question.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div>
          {messages.map((message, index) => {
            // Skip system messages
            if (message.role === 'system') return null;
            
            // Extract citations from assistant messages
            let citations: Citation[] = [];
            if (message.role === 'assistant') {
              const { citations: extractedCitations } = extractCitations(message.content);
              citations = extractedCitations;
            }
            
            return (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <ChatMessage 
                  message={message} 
                  citations={citations}
                />
              </motion.div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>
      )}
    </div>
  );
}

export default ChatHistory;