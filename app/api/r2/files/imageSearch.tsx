import { R2File } from "@/components/ImageSearch";

export default async function getImagesFromR2(): Promise<R2File[]> {
  try {
    const urlParams = new URLSearchParams();
    urlParams.append('includeUrls', 'true');
    urlParams.append('limit', '1000');

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/r2/search?${urlParams}`, {
      cache: 'no-store'
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch images: ${response.statusText}`);
    }
    
    const data: R2File[] = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching images from R2:', error);
    return [];
  }
}