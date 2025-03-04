import React from 'react';
import { models } from '../config/models';
import { ModelConfig } from '../types';
import { Settings, Check, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';

interface ModelSelectorProps {
  selectedModel: ModelConfig;
  onModelChange: (model: ModelConfig) => void;
  isMobile?: boolean;
}

function ModelSelector({ selectedModel, onModelChange, isMobile = false }: ModelSelectorProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const getProviderColor = (provider: string) => {
    switch (provider) {
      case 'anthropic':
        return 'bg-[#f8f1ff] text-[#7c3aed]';
      case 'openai':
        return 'bg-[#e7f7ef] text-[#10a37f]';
      case 'xai':
        return 'bg-[#fff4e5] text-[#ff7a00]';
      default:
        return 'bg-secondary-100 text-secondary-700';
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-2 text-sm rounded-lg transition-colors",
          isMobile 
            ? "w-full justify-between p-2 border border-secondary-200 bg-white" 
            : "px-3 py-1.5 bg-white border border-secondary-200 shadow-sm hover:shadow"
        )}
      >
        <div className="flex items-center gap-2">
          <div className={cn(
            "w-6 h-6 rounded-md flex items-center justify-center",
            getProviderColor(selectedModel.provider)
          )}>
            <Sparkles size={14} />
          </div>
          <span className="font-medium text-secondary-900">{selectedModel.name}</span>
        </div>
        <Settings size={16} className="text-secondary-500" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "absolute z-20 bg-white rounded-xl shadow-medium border border-secondary-200",
              isMobile ? "left-0 right-0 mt-1" : "right-0 mt-1 w-72"
            )}
          >
            <div className="p-2">
              <div className="px-3 py-2">
                <h3 className="text-sm font-medium text-secondary-900 mb-1">Select AI Model</h3>
                <p className="text-xs text-secondary-500">Choose the AI model that powers your assistant</p>
              </div>
              <div className="mt-1 space-y-1">
                {models.map((model) => (
                  <button
                    key={model.id}
                    onClick={() => {
                      onModelChange(model);
                      setIsOpen(false);
                    }}
                    className={cn(
                      "w-full text-left px-3 py-2 text-sm rounded-lg transition-colors",
                      selectedModel.id === model.id
                        ? "bg-primary-50 text-primary-900"
                        : "hover:bg-secondary-50"
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={cn(
                          "w-6 h-6 rounded-md flex items-center justify-center",
                          getProviderColor(model.provider)
                        )}>
                          <Sparkles size={14} />
                        </div>
                        <div>
                          <div className="font-medium text-secondary-900">{model.name}</div>
                          <div className="text-xs text-secondary-500">{model.description}</div>
                        </div>
                      </div>
                      {selectedModel.id === model.id && (
                        <Check size={16} className="text-primary-600" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Backdrop for mobile */}
      {isOpen && isMobile && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-secondary-900/20 z-10"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}

export default ModelSelector;