import { readFileSync } from 'fs';
import { createReadStream } from 'fs';
import { createInterface } from 'readline';

/**
 * Script para importar artículos en lotes a D1 via Worker
 * 
 * Uso:
 * npx tsx scripts/bulk-import-articles.ts <archivo.jsonl> <api-endpoint> <api-key>
 */

const BATCH_SIZE = 1000; // Procesar 1000 artículos por lote
const WORKER_URL = process.argv[3] || 'https://linguafly.dev/api/articles/batch';
const API_KEY = process.argv[4] || '';

interface Article {
  slug: string;
  title: string;
  description?: string;
  content: string;
  category: string;
  level: string;
  tags?: string[];
}

async function importArticlesBatch(articles: Article[], batchNumber: number) {
  try {
    const response = await fetch(WORKER_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY
      },
      body: JSON.stringify({
        articles,
        batchNumber
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${await response.text()}`);
    }

    const result = await response.json();
    console.log(`✅ Batch ${batchNumber} completed: ${result.count} articles`);
    return result;
  } catch (error) {
    console.error(`❌ Batch ${batchNumber} failed:`, error);
    throw error;
  }
}

async function processJSONLFile(filePath: string) {
  const fileStream = createReadStream(filePath);
  const rl = createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let batch: Article[] = [];
  let batchNumber = 1;
  let totalProcessed = 0;
  let errors = 0;

  console.log(`📁 Starting import from: ${filePath}`);
  console.log(`🔗 Worker URL: ${WORKER_URL}`);
  console.log(`📦 Batch size: ${BATCH_SIZE}`);
  console.log('');

  for await (const line of rl) {
    if (!line.trim()) continue;

    try {
      const article: Article = JSON.parse(line);

      // Validar campos requeridos
      if (!article.slug || !article.title || !article.content || !article.category) {
        console.warn(`⚠️  Skipped invalid article: missing required fields`);
        errors++;
        continue;
      }

      batch.push(article);

      // Cuando llegamos al tamaño de lote, enviar
      if (batch.length >= BATCH_SIZE) {
        await importArticlesBatch(batch, batchNumber);
        totalProcessed += batch.length;
        batch = [];
        batchNumber++;

        // Log progress
        console.log(`📊 Progress: ${totalProcessed} articles imported`);
      }
    } catch (error) {
      console.warn(`⚠️  Skipped invalid JSON line: ${error}`);
      errors++;
    }
  }

  // Enviar último lote si hay
  if (batch.length > 0) {
    await importArticlesBatch(batch, batchNumber);
    totalProcessed += batch.length;
  }

  console.log('');
  console.log('✅ Import completed!');
  console.log(`📈 Total articles imported: ${totalProcessed}`);
  console.log(`❌ Errors/Skipped: ${errors}`);
}

// Validar argumentos
if (!process.argv[2]) {
  console.error('Usage: npx tsx scripts/bulk-import-articles.ts <file.jsonl> [worker-url] [api-key]');
  console.error('');
  console.error('Example:');
  console.error('  npx tsx scripts/bulk-import-articles.ts articles.jsonl');
  console.error('  npx tsx scripts/bulk-import-articles.ts articles.jsonl https://linguafly.dev/api/articles/batch secret-key');
  process.exit(1);
}

processJSONLFile(process.argv[2]).catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});