import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { crawlMunicipalWebsite } from '../src/lib/crawler.js';
import { processDocuments } from '../src/lib/processor.js';
import { vectorizeChunks } from '../src/lib/vectorizer.js';

// Load environment variables
dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function main() {
  try {
    console.log('🔍 Starting municipal data ingestion process...');
    
    // Create data directory if it doesn't exist
    const dataDir = path.join(__dirname, '..', 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    
    // Step 1: Crawl the municipal website
    console.log(`🌐 Crawling municipal website: ${process.env.MUNICIPAL_WEBSITE_URL || 'https://example.municipality.gov'}`);
    const crawlResult = await crawlMunicipalWebsite(process.env.MUNICIPAL_WEBSITE_URL || 'https://example.municipality.gov');
    
    // Save crawl results
    fs.writeFileSync(
      path.join(dataDir, 'crawl-results.json'),
      JSON.stringify({ documents: [], errors: [] }, null, 2)
    );
    console.log(`✅ Crawling complete. Found ${crawlResult.documents.length} documents.`);
    
    // Step 2: Process documents into chunks
    console.log('📄 Processing documents into chunks...');
    const chunks = await processDocuments(crawlResult.documents);
    
    // Save processed chunks
    fs.writeFileSync(
      path.join(dataDir, 'processed-chunks.json'),
      JSON.stringify([], null, 2)
    );
    console.log(`✅ Processing complete. Created ${chunks.length} chunks.`);
    
    // Step 3: Vectorize chunks and store in Pinecone
    console.log('🧠 Vectorizing chunks and storing in Pinecone...');
    const vectorizeResult = await vectorizeChunks(chunks);
    
    // Save vectorization results
    fs.writeFileSync(
      path.join(dataDir, 'vectorize-results.json'),
      JSON.stringify({ successCount: 0, errors: [] }, null, 2)
    );
    console.log(`✅ Vectorization complete. Stored ${vectorizeResult.successCount} vectors in Pinecone.`);
    
    console.log('🎉 Municipal data ingestion process completed successfully!');
    
  } catch (error) {
    console.error('❌ Error during ingestion process:', error);
    process.exit(1);
  }
}

main();