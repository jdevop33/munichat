import React, { useRef, useEffect } from 'react';
import { Send, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
  input?: string;
  handleInputChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

function ChatInput({ onSendMessage, isLoading, input = '', handleInputChange }: ChatInputProps) {
  const [localInput, setLocalInput] = React.useState(input);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Update local input when prop changes
  useEffect(() => {
    setLocalInput(input);
  }, [input]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (localInput.trim() && !isLoading) {
      onSendMessage(localInput);
      if (!handleInputChange) {
        setLocalInput('');
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (handleInputChange) {
      handleInputChange(e);
    } else {
      setLocalInput(e.target.value);
    }
  };

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [localInput]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="border-t border-secondary-200 p-4 bg-white shadow-soft"
    >
      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
        <div className="flex items-end gap-2">
          <div className="relative flex-1">
            <textarea
              ref={textareaRef}
              value={handleInputChange ? input : localInput}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              placeholder="Ask about municipal bylaws..."
              className={cn(
                "w-full p-3 pr-10 border border-secondary-200 rounded-xl",
                "focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-300",
                "resize-none min-h-[56px] max-h-[200px] overflow-y-auto",
                "text-secondary-900 placeholder:text-secondary-400",
                "transition-all duration-200"
              )}
              rows={1}
              disabled={isLoading}
            />
          </div>
          <button
            type="submit"
            disabled={!(handleInputChange ? input : localInput).trim() || isLoading}
            className={cn(
              "p-3 rounded-xl transition-all duration-200",
              !(handleInputChange ? input : localInput).trim() || isLoading
                ? "bg-secondary-200 text-secondary-400 cursor-not-allowed"
                : "bg-primary-600 text-white hover:bg-primary-700 shadow-sm hover:shadow"
            )}
          >
            {isLoading ? (
              <Loader2 size={20} className="animate-spin" />
            ) : (
              <Send size={20} />
            )}
          </button>
        </div>
        <div className="mt-2 text-xs text-secondary-500 text-center">
          Ask specific questions about bylaws, amendments, or regulations for the most accurate answers.
        </div>
      </form>
    </motion.div>
  );
}

export default ChatInput;