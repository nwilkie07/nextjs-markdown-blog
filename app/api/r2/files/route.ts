import { NextRequest, NextResponse } from 'next/server';
import { listFiles, getPublicUrl } from '@/utils/r2Client';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const prefix = searchParams.get('prefix') || undefined;
    const includeUrls = searchParams.get('includeUrls') === 'true';

    const files = await listFiles(prefix);

    if (includeUrls) {
      const filesWithUrls = files.map(file => ({
        ...file,
        url: getPublicUrl(file.key)
      }));
      return NextResponse.json(filesWithUrls);
    }

    return NextResponse.json(files);
  } catch (error) {
    console.error('List files error:', error);
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
