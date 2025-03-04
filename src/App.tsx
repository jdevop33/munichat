import React, { useState } from 'react';
import { useChat } from './hooks/useChat';
import ChatHistory from './components/ChatHistory';
import ChatInput from './components/ChatInput';
import ModelSelector from './components/ModelSelector';
import SourceViewer from './components/SourceViewer';
import { Bot, RefreshCw, Database, Menu, X, ChevronRight, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from './lib/utils';

function App() {
  const { 
    messages, 
    isLoading, 
    selectedModel, 
    relevantChunks,
    sendMessage, 
    changeModel,
    resetChat,
    input,
    handleInputChange
  } = useChat();

  const [showSourceViewer, setShowSourceViewer] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen bg-secondary-50">
      {/* Header */}
      <header className="bg-white shadow-soft py-3 px-4 sm:px-6 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center">
              <Bot size={22} className="text-primary-600" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-secondary-900">Municipal Bylaw Assistant</h1>
              <p className="text-xs text-secondary-500 hidden sm:block">Get accurate bylaw information with citations</p>
            </div>
          </div>
          
          {/* Desktop Controls */}
          <div className="hidden md:flex items-center gap-3">
            <button 
              onClick={() => setShowSourceViewer(!showSourceViewer)}
              className={cn(
                "flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg transition-colors",
                showSourceViewer 
                  ? "bg-primary-100 text-primary-700" 
                  : "text-secondary-600 hover:bg-secondary-100"
              )}
            >
              <Database size={16} />
              <span>Sources</span>
              {showSourceViewer ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
            </button>
            <button 
              onClick={resetChat}
              className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg text-secondary-600 hover:bg-secondary-100 transition-colors"
            >
              <RefreshCw size={16} />
              <span>New Chat</span>
            </button>
            <ModelSelector 
              selectedModel={selectedModel} 
              onModelChange={changeModel} 
            />
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg hover:bg-secondary-100"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        
        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-3 border-t border-secondary-200 pt-3 space-y-2"
            >
              <button 
                onClick={() => {
                  setShowSourceViewer(!showSourceViewer);
                  setMobileMenuOpen(false);
                }}
                className={cn(
                  "flex items-center justify-between w-full text-sm px-3 py-2 rounded-lg transition-colors",
                  showSourceViewer 
                    ? "bg-primary-100 text-primary-700" 
                    : "text-secondary-600 hover:bg-secondary-100"
                )}
              >
                <div className="flex items-center gap-1.5">
                  <Database size={16} />
                  <span>Sources</span>
                </div>
                {showSourceViewer ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
              </button>
              <button 
                onClick={() => {
                  resetChat();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center justify-between w-full text-sm px-3 py-2 rounded-lg text-secondary-600 hover:bg-secondary-100 transition-colors"
              >
                <div className="flex items-center gap-1.5">
                  <RefreshCw size={16} />
                  <span>New Chat</span>
                </div>
              </button>
              <div className="px-3 py-2">
                <ModelSelector 
                  selectedModel={selectedModel} 
                  onModelChange={(model) => {
                    changeModel(model);
                    setMobileMenuOpen(false);
                  }}
                  isMobile={true}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
      
      {/* Main content */}
      <main className="flex-1 overflow-hidden max-w-6xl w-full mx-auto flex flex-col">
        <div className="flex-1 flex overflow-hidden">
          {/* Chat area */}
          <div className={cn(
            "flex-1 flex flex-col overflow-hidden",
            showSourceViewer ? 'border-r border-secondary-200' : ''
          )}>
            <ChatHistory messages={messages} />
            <ChatInput 
              onSendMessage={sendMessage} 
              isLoading={isLoading} 
              input={input}
              handleInputChange={handleInputChange}
            />
          </div>
          
          {/* Source viewer */}
          <AnimatePresence>
            {showSourceViewer && (
              <motion.div 
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: '33.333333%', opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-y-auto border-l border-secondary-200 bg-white"
              >
                <SourceViewer chunks={relevantChunks} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-white border-t border-secondary-200 py-3 px-4 text-center text-xs text-secondary-500">
        <p>This is an AI assistant for municipal bylaws. Information may not be accurate or up-to-date.</p>
      </footer>
    </div>
  );
}

export default App;