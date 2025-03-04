import { ModelConfig } from '../types';
import { BylawChunk } from '../types';
import { generateText, streamText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { anthropic } from '@ai-sdk/anthropic';
import { z } from 'zod';

/**
 * Generate a response from the AI model
 * @param model The selected AI model configuration
 * @param messages The conversation history
 * @param relevantChunks Relevant bylaw chunks for context
 * @returns The AI-generated response
 */
export async function generateAIResponse(
  model: ModelConfig,
  messages: { role: string; content: string }[],
  relevantChunks: BylawChunk[]
): Promise<string> {
  try {
    // Create a context from the relevant chunks
    let context = '';
    if (relevantChunks.length > 0) {
      context = 'Here are some relevant bylaw sections that may help answer the question:\n\n';
      relevantChunks.forEach((chunk, index) => {
        context += `Source ${index + 1}: ${chunk.metadata.title}, ${chunk.metadata.section}\n`;
        context += `Content: ${chunk.content}\n`;
        context += `Date: ${chunk.metadata.date}`;
        if (chunk.metadata.lastAmended) {
          context += `, Last Amended: ${chunk.metadata.lastAmended}`;
        }
        context += '\n\n';
      });
    }
    
    // Create a system message with instructions and context
    const systemMessage = {
      role: 'system',
      content: `You are a helpful municipal bylaw assistant. Your purpose is to provide accurate information about municipal bylaws, regulations, and amendments.

Always cite your sources using the format [citation: {"text": "exact text from bylaw", "source": "bylaw name", "section": "section number or name"}].

If you're unsure about something, acknowledge the uncertainty rather than making up information.

Focus on providing factual, up-to-date information based on the most recent amendments.

${context}`
    };
    
    // Prepare messages for the AI, including the system message with context
    const aiMessages = [
      systemMessage,
      ...messages.filter(m => m.role !== 'system')
    ];
    
    // Select the appropriate AI provider based on the model configuration
    let aiModel;
    switch (model.provider) {
      case 'anthropic':
        aiModel = anthropic(model.model);
        break;
      case 'openai':
      default:
        aiModel = openai(model.model);
        break;
    }
    
    // Generate the response
    const result = await generateText({
      model: aiModel,
      messages: aiMessages.map(m => ({ role: m.role as any, content: m.content })),
      temperature: model.temperature,
      maxTokens: model.maxTokens,
    });
    
    return result.text;
    
  } catch (error) {
    console.error('Error generating AI response:', error);
    throw error;
  }
}

/**
 * Stream a response from the AI model
 * @param model The selected AI model configuration
 * @param messages The conversation history
 * @param relevantChunks Relevant bylaw chunks for context
 * @returns A streaming response
 */
export async function streamAIResponse(
  model: ModelConfig,
  messages: { role: string; content: string }[],
  relevantChunks: BylawChunk[]
) {
  try {
    // Create a context from the relevant chunks
    let context = '';
    if (relevantChunks.length > 0) {
      context = 'Here are some relevant bylaw sections that may help answer the question:\n\n';
      relevantChunks.forEach((chunk, index) => {
        context += `Source ${index + 1}: ${chunk.metadata.title}, ${chunk.metadata.section}\n`;
        context += `Content: ${chunk.content}\n`;
        context += `Date: ${chunk.metadata.date}`;
        if (chunk.metadata.lastAmended) {
          context += `, Last Amended: ${chunk.metadata.lastAmended}`;
        }
        context += '\n\n';
      });
    }
    
    // Create a system message with instructions and context
    const systemMessage = {
      role: 'system',
      content: `You are a helpful municipal bylaw assistant. Your purpose is to provide accurate information about municipal bylaws, regulations, and amendments.

Always cite your sources using the format [citation: {"text": "exact text from bylaw", "source": "bylaw name", "section": "section number or name"}].

If you're unsure about something, acknowledge the uncertainty rather than making up information.

Focus on providing factual, up-to-date information based on the most recent amendments.

${context}`
    };
    
    // Prepare messages for the AI, including the system message with context
    const aiMessages = [
      systemMessage,
      ...messages.filter(m => m.role !== 'system')
    ];
    
    // Select the appropriate AI provider based on the model configuration
    let aiModel;
    switch (model.provider) {
      case 'anthropic':
        aiModel = anthropic(model.model);
        break;
      case 'openai':
      default:
        aiModel = openai(model.model);
        break;
    }
    
    // Stream the response
    return streamText({
      model: aiModel,
      messages: aiMessages.map(m => ({ role: m.role as any, content: m.content })),
      temperature: model.temperature,
      maxTokens: model.maxTokens,
    });
    
  } catch (error) {
    console.error('Error streaming AI response:', error);
    throw error;
  }
}