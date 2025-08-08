import { NextRequest, NextResponse } from 'next/server';
import { getPresignedUrl } from '@/utils/r2Client';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const key = searchParams.get('key');
    const expiresIn = parseInt(searchParams.get('expiresIn') || '3600');

    if (!key) {
      return NextResponse.json(
        { error: 'Key parameter is required' },
        { status: 400 }
      );
    }

    const presignedUrl = await getPresignedUrl(key, expiresIn);

    if (presignedUrl) {
      return NextResponse.json({
        success: true,
        url: presignedUrl,
        expiresIn
      });
    } else {
      return NextResponse.json(
        { error: 'Failed to generate presigned URL' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Presigned URL error:', error);
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
