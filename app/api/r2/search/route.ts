import { NextRequest, NextResponse } from 'next/server';
import { listFiles, getPresignedUrl } from '@/utils/r2Client';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';
    const prefix = searchParams.get('prefix') || '';
    const fileType = searchParams.get('type') || '';
    const limit = parseInt(searchParams.get('limit') || '50');
    const includeUrls = searchParams.get('includeUrls') === 'true';

    // Get all files from the bucket
    const allFiles = await listFiles(prefix);

    // Filter files based on search criteria
    let filteredFiles = allFiles.filter(file => {
      const filename = file.key.toLowerCase();
      const searchQuery = query.toLowerCase();

      // Filter by search query (filename contains the query)
      if (query && !filename.includes(searchQuery)) {
        return false;
      }

      // Filter by file type
      if (fileType) {
        const extension = filename.split('.').pop() || '';
        if (fileType.toLowerCase() !== extension.toLowerCase()) {
          return false;
        }
      }

      return true;
    });

    // Limit results
    filteredFiles = filteredFiles.slice(0, limit);

    // Add presigned URLs if requested
    if (includeUrls) {
      const filesWithUrls = await Promise.all(
        filteredFiles.map(async (file) => {
          const presignedUrl = await getPresignedUrl(file.key);
          return {
            ...file,
            url: presignedUrl
          };
        })
      );
      return NextResponse.json(filesWithUrls);
    }

    return NextResponse.json(filteredFiles);
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}
