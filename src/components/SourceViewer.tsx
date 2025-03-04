import React from 'react';
import { BylawChunk } from '../types';
import { FileText, Calendar, Tag, ExternalLink, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';

interface SourceViewerProps {
  chunks: BylawChunk[];
}

function SourceViewer({ chunks }: SourceViewerProps) {
  if (chunks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6 text-center">
        <div className="w-12 h-12 rounded-full bg-secondary-100 flex items-center justify-center mb-4">
          <Info size={24} className="text-secondary-400" />
        </div>
        <h3 className="text-sm font-medium text-secondary-700 mb-2">No Sources Available</h3>
        <p className="text-xs text-secondary-500 max-w-xs">
          Ask a question about municipal bylaws to see relevant source documents here.
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 h-full overflow-y-auto">
      <div className="sticky top-0 bg-white pb-2 z-10">
        <h3 className="text-sm font-medium text-secondary-900 mb-1">Source Documents</h3>
        <p className="text-xs text-secondary-500">
          Showing {chunks.length} relevant document{chunks.length !== 1 ? 's' : ''}
        </p>
      </div>
      
      <div className="space-y-3 mt-3">
        {chunks.map((chunk, index) => (
          <motion.div 
            key={chunk.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-white p-4 rounded-xl shadow-soft border border-secondary-100"
          >
            <div className="flex items-start gap-3">
              <div className={cn(
                "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0",
                chunk.metadata.documentType === 'bylaw' ? 'bg-primary-100 text-primary-700' :
                chunk.metadata.documentType === 'budget' ? 'bg-success-100 text-success-700' :
                'bg-secondary-100 text-secondary-700'
              )}>
                <FileText size={16} />
              </div>
              
              <div className="flex-1">
                <div className="font-medium text-secondary-900">{chunk.metadata.title}</div>
                <div className="text-sm text-secondary-600">{chunk.metadata.section}</div>
                
                <div className="mt-3 text-sm text-secondary-800 bg-secondary-50 p-3 rounded-lg border border-secondary-100 whitespace-pre-line">
                  {chunk.content}
                </div>
                
                <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-secondary-500">
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    <span>Date: {chunk.metadata.date}</span>
                  </div>
                  
                  {chunk.metadata.lastAmended && (
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      <span>Last Amended: {chunk.metadata.lastAmended}</span>
                    </div>
                  )}
                </div>
                
                {chunk.metadata.tags && chunk.metadata.tags.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {chunk.metadata.tags.slice(0, 5).map((tag, i) => (
                      <span 
                        key={i} 
                        className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-secondary-100 text-secondary-700"
                      >
                        <Tag size={10} className="mr-1" />
                        {tag}
                      </span>
                    ))}
                    {chunk.metadata.tags.length > 5 && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-secondary-100 text-secondary-700">
                        +{chunk.metadata.tags.length - 5} more
                      </span>
                    )}
                  </div>
                )}
                
                {chunk.metadata.url && (
                  <a 
                    href={chunk.metadata.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1 text-xs text-primary-600 hover:text-primary-800"
                  >
                    <span>View original document</span>
                    <ExternalLink size={12} />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default SourceViewer;