# Municipal Bylaw Chatbot

An AI-powered chatbot for answering questions about municipal bylaws with accurate citations.

## Features

- **Intelligent Crawling**: Automatically crawls municipal websites to extract bylaw information
- **Vector Database**: Uses Pinecone to store and retrieve relevant bylaw chunks
- **Multiple AI Models**: Support for various AI models including Claude 3 Sonnet, GPT-4.5, and Grok 3
- **Citation System**: Provides answers with proper citations to specific bylaw sections
- **Modern UI/UX**: Clean, professional interface with chat history and source viewing

## Getting Started

### Prerequisites

- Node.js 18+
- Pinecone account
- OpenAI API key (for embeddings)
- Access to AI model APIs (OpenAI, Anthropic, etc.)

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Copy `.env.example` to `.env` and fill in your API keys
4. Run the development server:
   ```
   npm run dev
   ```

### Data Ingestion

To ingest municipal bylaw data:

1. Set the `MUNICIPAL_WEBSITE_URL` in your `.env` file
2. Run the ingestion script:
   ```
   npm run ingest
   ```

This will:
- Crawl the municipal website for bylaw documents
- Process and chunk the documents
- Generate embeddings and store them in Pinecone

## Architecture

### Data Flow

1. **Ingestion Pipeline**:
   - Web crawler extracts documents from municipal websites
   - Document processor chunks text into manageable sections
   - Vectorizer generates embeddings and stores in Pinecone

2. **Query Pipeline**:
   - User question is embedded and used to query Pinecone
   - Relevant bylaw chunks are retrieved
   - AI model generates a response with proper citations

### Components

- **Crawler**: Intelligently navigates municipal websites to find bylaw documents
- **Processor**: Splits documents into logical chunks based on sections and content
- **Vectorizer**: Generates embeddings and manages Pinecone database
- **Retriever**: Finds relevant bylaw chunks for a given query
- **AI Interface**: Communicates with various AI models to generate responses

## Deployment

This application is designed to be deployed on Vercel, with optional GCP integration for additional services.

## License

This project is licensed under the MIT License - see the LICENSE file for details.