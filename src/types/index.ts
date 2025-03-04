export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  createdAt?: Date;
}

export interface Citation {
  text: string;
  source: string;
  section: string;
  url?: string;
}

export interface BylawChunk {
  id: string;
  content: string;
  metadata: {
    title: string;
    section: string;
    date: string;
    lastAmended?: string;
    tags: string[];
    url?: string;
    department?: string;
    documentType?: 'bylaw' | 'budget' | 'report' | 'other';
    fileType?: 'pdf' | 'html' | 'doc' | 'other';
    vectorId?: string;
  };
}

export interface ModelConfig {
  id: string;
  name: string;
  provider: 'anthropic' | 'openai' | 'google' | 'xai';
  model: string;
  description: string;
  maxTokens: number;
  temperature: number;
}

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
  selectedModel: ModelConfig;
}

export interface MunicipalDocument {
  id: string;
  title: string;
  url: string;
  department?: string;
  documentType: 'bylaw' | 'budget' | 'report' | 'other';
  fileType: 'pdf' | 'html' | 'doc' | 'other';
  date?: string;
  lastAmended?: string;
  content?: string;
  chunks?: BylawChunk[];
}

export interface CrawlResult {
  documents: MunicipalDocument[];
  errors: {
    url: string;
    error: string;
  }[];
}

export interface VectorizedChunk {
  id: string;
  content: string;
  metadata: {
    title: string;
    section: string;
    date: string;
    lastAmended?: string;
    tags: string[];
    url?: string;
    department?: string;
    documentType?: 'bylaw' | 'budget' | 'report' | 'other';
    fileType?: 'pdf' | 'html' | 'doc' | 'other';
    chunkIndex: number;
    documentId: string;
  };
  embedding?: number[];
}