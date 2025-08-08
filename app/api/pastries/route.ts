import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export async function GET() {
  try {
    const basePath = 'pasteries';
    const folder = path.join(process.cwd(), basePath);
    
    // Check if directory exists
    if (!fs.existsSync(folder)) {
      console.warn(`Directory ${folder} does not exist`);
      return NextResponse.json([]);
    }

    const files = fs.readdirSync(folder);
    const markdownArticles = files.filter(file => file.endsWith('.md'));

    const articles = markdownArticles.map((filename: string) => {
      try {
        const filePath = path.join(folder, filename);
        const articleContent = fs.readFileSync(filePath, 'utf8');
        const matterResult = matter(articleContent);
        
        return {
          name: matterResult.data.name || 'Untitled Pastry',
          seller: matterResult.data.seller || 'Unknown Seller',
          rating: matterResult.data.rating || 'No Rating',
          review: matterResult.data.review || 'No review available',
          image: matterResult.data.image || null,
          slug: filename.replace('.md', ''),
        };
      } catch (error) {
        console.error(`Error reading file ${filename}:`, error);
        return {
          name: 'Error Reading Pastry',
          seller: 'Unknown',
          rating: 'N/A',
          review: 'Error reading pastry data',
          image: null,
          slug: filename.replace('.md', ''),
        };
      }
    });

    return NextResponse.json(articles);
  } catch (error) {
    console.error('Error in pastry metadata API:', error);
    return NextResponse.json({ error: 'Failed to fetch pastry metadata' }, { status: 500 });
  }
}
