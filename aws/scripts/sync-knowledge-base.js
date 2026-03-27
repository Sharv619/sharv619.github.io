/**
 * Sync Knowledge Base Script
 * 
 * This script:
 * 1. Reads knowledge-base.json
 * 2. Chunks the content into semantic segments
 * 3. Generates embeddings using Titan
 * 4. Stores embeddings in pgvector
 * 5. Uploads JSON to S3
 * 
 * Usage: node sync-knowledge-base.js
 */

const fs = require('fs');
const path = require('path');
const { BedrockRuntimeClient, InvokeModelCommand } = require('@aws-sdk/client-bedrock-runtime');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { Pool } = require('pg');

const EMBEDDING_MODEL = 'amazon.titan_embed_text_v2:0';
const EMBEDDING_DIMENSION = 1024;

// Initialize clients
const bedrockRuntime = new BedrockRuntimeClient({ region: process.env.AWS_REGION || 'us-east-1' });
const s3 = new S3Client({ region: process.env.AWS_REGION || 'us-east-1' });

const KB_FILE = path.join(__dirname, '../../src/lib/knowledge-base.json');
const S3_BUCKET = process.env.KB_S3_BUCKET || 'sharv619-knowledge-base';

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

/**
 * Chunk the knowledge base into semantic segments
 */
function chunkKnowledgeBase(kb) {
  const chunks = [];
  
  // Personal info chunk
  chunks.push({
    id: 'personal',
    section: 'Personal Info',
    chunk_text: `${kb.personal.name} is a ${kb.personal.title}. ${kb.personal.bio}. Located in ${kb.personal.location}. ${kb.personal.availability}. Contact: ${kb.personal.contact.email}, ${kb.personal.contact.phone}`,
    metadata: { type: 'personal' }
  });
  
  // Each experience
  kb.experience.forEach(exp => {
    const text = `${exp.role} at ${exp.company} (${exp.duration}) in ${exp.location}. ${exp.achievements.join('. ')}. Tech stack: ${exp.techStack.join(', ')}.`;
    chunks.push({
      id: exp.id,
      section: 'Experience',
      chunk_text: text,
      metadata: { type: 'experience', company: exp.company, role: exp.role }
    });
  });
  
  // Each project
  kb.projects.forEach(project => {
    const text = `${project.name}: ${project.tagline}. ${project.detailedDescription || project.description}. Tech stack: ${project.techStack.join(', ')}. Achievements: ${project.achievements.join('. ')}.`;
    chunks.push({
      id: project.id,
      section: 'Projects',
      chunk_text: text,
      metadata: { type: 'project', name: project.name }
    });
  });
  
  // Skills aggregated
  const skillsText = Object.entries(kb.skills).map(([category, skills]) => {
    return `${category}: ${skills.map(s => typeof s === 'object' ? s.name : s).join(', ')}`;
  }).join('. ');
  chunks.push({
    id: 'skills',
    section: 'Skills',
    chunk_text: `Technical Skills: ${skillsText}`,
    metadata: { type: 'skills' }
  });
  
  // Values
  const valuesText = kb.values.map(v => `${v.name}: ${v.description}`).join('. ');
  chunks.push({
    id: 'values',
    section: 'Values',
    chunk_text: `Core Values: ${valuesText}`,
    metadata: { type: 'values' }
  });
  
  // Each education
  kb.education.forEach((edu, idx) => {
    chunks.push({
      id: `education-${idx}`,
      section: 'Education',
      chunk_text: `${edu.degree} from ${edu.institution} in ${edu.location} (${edu.year})`,
      metadata: { type: 'education', institution: edu.institution }
    });
  });
  
  // Chatbot capabilities
  chunks.push({
    id: 'chatbot',
    section: 'Chatbot',
    chunk_text: `Assistant is Himanshu's AI career chatbot. ${kb.chatbot.capabilities.join('. ')}. Sample questions: ${kb.chatbot.sampleQuestions.join(', ')}`,
    metadata: { type: 'chatbot' }
  });
  
  return chunks;
}

/**
 * Generate embedding for text using Titan
 */
async function generateEmbedding(text) {
  const command = new InvokeModelCommand({
    modelId: EMBEDDING_MODEL,
    contentType: 'application/json',
    accept: 'application/json',
    body: JSON.stringify({ inputText: text })
  });
  
  const response = await bedrockRuntime.send(command);
  const result = JSON.parse(new TextDecoder().decode(response.body));
  
  return result.embedding;
}

/**
 * Store chunks in pgvector
 */
async function storeChunks(chunks) {
  console.log('Storing chunks in pgvector...');
  
  // Create table if not exists
  await pool.query(`
    CREATE TABLE IF NOT EXISTS knowledge_chunks (
      id VARCHAR(255) PRIMARY KEY,
      section VARCHAR(255),
      chunk_text TEXT NOT NULL,
      metadata JSONB,
      embedding vector(${EMBEDDING_DIMENSION}),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    
    CREATE INDEX IF NOT EXISTS idx_knowledge_chunks_embedding 
    ON knowledge_chunks 
    USING ivfflat (embedding vector_cosine_ops)
    WITH (lists = 100);
  `);
  
  // Clear existing chunks
  await pool.query('DELETE FROM knowledge_chunks');
  
  // Insert new chunks with embeddings
  for (const chunk of chunks) {
    const embedding = await generateEmbedding(chunk.chunk_text);
    
    await pool.query(
      `INSERT INTO knowledge_chunks (id, section, chunk_text, metadata, embedding)
       VALUES ($1, $2, $3, $4, $5)`,
      [chunk.id, chunk.section, chunk.chunk_text, JSON.stringify(chunk.metadata), embedding]
    );
    
    console.log(`  Stored chunk: ${chunk.id}`);
  }
  
  console.log(`Stored ${chunks.length} chunks`);
}

/**
 * Upload JSON to S3
 */
async function uploadToS3(kb) {
  console.log(`Uploading to S3 bucket: ${S3_BUCKET}...`);
  
  const command = new PutObjectCommand({
    Bucket: S3_BUCKET,
    Key: 'knowledge-base.json',
    Body: JSON.stringify(kb, null, 2),
    ContentType: 'application/json'
  });
  
  await s3.send(command);
  console.log('Uploaded to S3');
}

/**
 * Main sync function
 */
async function sync() {
  console.log('=== Knowledge Base Sync ===\n');
  
  // Load knowledge base
  console.log('Loading knowledge base...');
  const kb = JSON.parse(fs.readFileSync(KB_FILE, 'utf-8'));
  console.log(`Loaded: ${kb.metadata.title} v${kb.version}\n`);
  
  // Chunk content
  console.log('Chunking content...');
  const chunks = chunkKnowledgeBase(kb);
  console.log(`Created ${chunks.length} chunks\n`);
  
  // Store in pgvector
  await storeChunks(chunks);
  
  // Upload to S3
  await uploadToS3(kb);
  
  console.log('\n=== Sync Complete ===');
  
  await pool.end();
}

sync().catch(err => {
  console.error('Sync failed:', err);
  process.exit(1);
});
