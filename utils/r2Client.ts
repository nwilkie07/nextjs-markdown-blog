import { S3Client, PutObjectCommand, GetObjectCommand, ListObjectsV2Command, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

// Initialize the S3 client for Cloudflare R2
const r2Client = new S3Client({
  region: 'auto',
  endpoint: process.env.R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});

const BUCKET_NAME = process.env.R2_BUCKET_NAME!;

export interface R2File {
  key: string;
  size: number;
  lastModified: Date;
  etag: string;
}

export interface UploadResult {
  success: boolean;
  key?: string;
  error?: string;
}

/**
 * Upload a file to R2 bucket
 */
export async function uploadFile(
  file: Buffer | string,
  key: string,
  contentType: string = 'application/octet-stream'
): Promise<UploadResult> {
  try {
    const command = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
      Body: file,
      ContentType: contentType,
    });

    await r2Client.send(command);
    return { success: true, key };
  } catch (error) {
    console.error('Error uploading file to R2:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Get a file from R2 bucket
 */
export async function getFile(key: string): Promise<Buffer | null> {
  try {
    const command = new GetObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
    });

    const response = await r2Client.send(command);
    if (response.Body) {
      const chunks: Uint8Array[] = [];
      for await (const chunk of response.Body as any) {
        chunks.push(chunk);
      }
      return Buffer.concat(chunks);
    }
    return null;
  } catch (error) {
    console.error('Error getting file from R2:', error);
    return null;
  }
}

/**
 * Generate a presigned URL for file access
 */
export async function getPresignedUrl(key: string, expiresIn: number = 3600): Promise<string | null> {
  try {
    const command = new GetObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
    });

    return await getSignedUrl(r2Client, command, { expiresIn });
  } catch (error) {
    console.error('Error generating presigned URL:', error);
    return null;
  }
}

/**
 * List files in R2 bucket
 */
export async function listFiles(prefix?: string): Promise<R2File[]> {
  try {
    const command = new ListObjectsV2Command({
      Bucket: BUCKET_NAME,
      Prefix: prefix,
    });

    const response = await r2Client.send(command);
    return (response.Contents || []).map((item) => ({
      key: item.Key!,
      size: item.Size!,
      lastModified: item.LastModified!,
      etag: item.ETag!,
    }));
  } catch (error) {
    console.error('Error listing files from R2:', error);
    return [];
  }
}

/**
 * Delete a file from R2 bucket
 */
export async function deleteFile(key: string): Promise<boolean> {
  try {
    const command = new DeleteObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
    });

    await r2Client.send(command);
    return true;
  } catch (error) {
    console.error('Error deleting file from R2:', error);
    return false;
  }
}

/**
 * Upload an image file with proper content type detection
 */
export async function uploadImage(
  file: Buffer,
  key: string,
  originalName?: string
): Promise<UploadResult> {
  let contentType = 'image/jpeg'; // default
  
  if (originalName) {
    const extension = originalName.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'png':
        contentType = 'image/png';
        break;
      case 'gif':
        contentType = 'image/gif';
        break;
      case 'webp':
        contentType = 'image/webp';
        break;
      case 'svg':
        contentType = 'image/svg+xml';
        break;
      default:
        contentType = 'image/jpeg';
    }
  }

  return uploadFile(file, key, contentType);
}

/**
 * Get the public URL for a file (if bucket is public)
 */
export function getPublicUrl(key: string): string {
  const customDomain = process.env.R2_CUSTOM_DOMAIN;
  if (customDomain) {
    return `https://${customDomain}/${key}`;
  }
  
  // Fallback to R2's default domain
  const accountId = process.env.R2_ACCOUNT_ID;
  return `https://${accountId}.r2.cloudflarestorage.com/${BUCKET_NAME}/${key}`;
}

export default r2Client;
