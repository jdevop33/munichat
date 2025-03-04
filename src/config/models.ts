import { ModelConfig } from '../types';

export const models: ModelConfig[] = [
  {
    id: 'claude-3-sonnet',
    name: 'Claude 3 Sonnet',
    provider: 'anthropic',
    model: 'claude-3-sonnet-20240229',
    description: 'Balanced performance and intelligence',
    maxTokens: 4096,
    temperature: 0.7
  },
  {
    id: 'gpt-4-turbo',
    name: 'GPT-4 Turbo',
    provider: 'openai',
    model: 'gpt-4-turbo-preview',
    description: 'Most capable OpenAI model',
    maxTokens: 4096,
    temperature: 0.7
  },
  {
    id: 'gpt-4-5-turbo',
    name: 'GPT-4.5 Turbo',
    provider: 'openai',
    model: 'gpt-4-0125-preview',
    description: 'Latest OpenAI model with enhanced reasoning',
    maxTokens: 4096,
    temperature: 0.7
  },
  {
    id: 'grok-3',
    name: 'Grok 3',
    provider: 'xai',
    model: 'grok-3',
    description: 'Advanced reasoning with creative problem-solving',
    maxTokens: 4096,
    temperature: 0.7
  }
];

export const defaultModel = models[0];