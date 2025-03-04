import { useState, useCallback, useEffect } from 'react';
import { Message, ModelConfig, BylawChunk } from '../types';
import { createMessage, extractCitations } from '../lib/utils';
import { defaultModel } from '../config/models';
import { retrieveRelevantChunks } from '../lib/retriever';
import { v4 as uuidv4 } from 'uuid';

interface UseChatOptions {
  initialMessages?: Message[];
  initialModel?: ModelConfig;
}

export function useChat({ 
  initialMessages = [], 
  initialModel = defaultModel 
}: UseChatOptions = {}) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState<ModelConfig>(initialModel);
  const [relevantChunks, setRelevantChunks] = useState<BylawChunk[]>([]);
  const [error, setError] = useState<string | null>(null);
  
  // Add system message if not present
  useEffect(() => {
    if (!messages.some(m => m.role === 'system')) {
      setMessages(prev => [
        createMessage('system', `You are a helpful municipal bylaw assistant. 
        Your purpose is to provide accurate information about municipal bylaws, regulations, and amendments.
        Always cite your sources using the format [citation: {"text": "exact text from bylaw", "source": "bylaw name", "section": "section number or name"}].
        If you're unsure about something, acknowledge the uncertainty rather than making up information.
        Focus on providing factual, up-to-date information based on the most recent amendments.`),
        ...prev
      ]);
    }
  }, []);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  }, []);

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim()) return;
    
    // Add user message
    const userMessage = createMessage('user', content);
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Retrieve relevant chunks based on the user's question
      const chunks = await retrieveRelevantChunks(content, 3);
      setRelevantChunks(chunks);
      
      // Prepare the request to the API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          model: selectedModel,
        }),
      });
      
      if (!response.ok) {
        throw new Error(`API responded with status ${response.status}`);
      }
      
      // Check for relevant chunks in the response headers
      const chunksHeader = response.headers.get('x-relevant-chunks');
      if (chunksHeader) {
        try {
          const parsedChunks = JSON.parse(chunksHeader);
          setRelevantChunks(parsedChunks);
        } catch (err) {
          console.error('Error parsing chunks from header:', err);
        }
      }
      
      // Get the response text
      const responseText = await response.text();
      
      // Create assistant message
      const assistantMessage = createMessage('assistant', responseText);
      setMessages(prev => [...prev, assistantMessage]);
      
      // Extract citations from the response
      const { citations } = extractCitations(responseText);
      
      // If we have citations but no chunks, try to retrieve them
      if (citations.length > 0 && relevantChunks.length === 0) {
        try {
          const citationChunks = await retrieveRelevantChunks(
            citations.map(c => c.text).join(' '), 
            citations.length
          );
          setRelevantChunks(citationChunks);
        } catch (err) {
          console.error('Error retrieving chunks for citations:', err);
        }
      }
      
    } catch (error) {
      console.error('Error sending message:', error);
      setError('Failed to send message. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [messages, selectedModel, relevantChunks.length]);

  const changeModel = useCallback((model: ModelConfig) => {
    setSelectedModel(model);
  }, []);

  const resetChat = useCallback(() => {
    setMessages(messages.filter(m => m.role === 'system'));
    setRelevantChunks([]);
    setError(null);
    setInput('');
  }, [messages]);

  return {
    messages,
    input,
    handleInputChange,
    isLoading,
    error,
    selectedModel,
    relevantChunks,
    sendMessage,
    changeModel,
    resetChat
  };
}