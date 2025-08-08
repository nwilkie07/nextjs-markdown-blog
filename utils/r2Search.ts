import { listFiles, getPresignedUrl, R2File } from './r2Client';

export interface SearchOptions {
  query?: string;
  prefix?: string;
  fileType?: string;
  minSize?: number;
  maxSize?: number;
  startDate?: Date;
  endDate?: Date;
  limit?: number;
  includeUrls?: boolean;
}

export interface SearchResult {
  files: R2File[];
  total: number;
  hasMore: boolean;
}

/**
 * Advanced search function for R2 files
 */
export async function searchFiles(options: SearchOptions = {}): Promise<SearchResult> {
  try {
    const {
      query = '',
      prefix = '',
      fileType = '',
      minSize = 0,
      maxSize = Infinity,
      startDate,
      endDate,
      limit = 50,
      includeUrls = false
    } = options;

    // Get all files from the bucket
    const allFiles = await listFiles(prefix);

    // Apply filters
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

      // Filter by file size
      if (file.size < minSize || file.size > maxSize) {
        return false;
      }

      // Filter by date range
      if (startDate || endDate) {
        const fileDate = new Date(file.lastModified);
        
        if (startDate && fileDate < startDate) {
          return false;
        }
        
        if (endDate && fileDate > endDate) {
          return false;
        }
      }

      return true;
    });

    // Sort by last modified date (newest first)
    filteredFiles.sort((a, b) => {
      const dateA = new Date(a.lastModified);
      const dateB = new Date(b.lastModified);
      return dateB.getTime() - dateA.getTime();
    });

    // Apply limit
    const hasMore = filteredFiles.length > limit;
    const limitedFiles = filteredFiles.slice(0, limit);

    // Add presigned URLs if requested
    if (includeUrls) {
      const filesWithUrls = await Promise.all(
        limitedFiles.map(async (file) => {
          const presignedUrl = await getPresignedUrl(file.key);
          return {
            ...file,
            url: presignedUrl
          };
        })
      );
      return {
        files: filesWithUrls,
        total: filteredFiles.length,
        hasMore
      };
    }

    return {
      files: limitedFiles,
      total: filteredFiles.length,
      hasMore
    };
  } catch (error) {
    console.error('Search error:', error);
    throw error;
  }
}

/**
 * Search for images specifically
 */
export async function searchImages(options: Omit<SearchOptions, 'fileType'> = {}): Promise<SearchResult> {
  const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'heic', 'bmp', 'tiff'];
  
  const results = await Promise.all(
    imageExtensions.map(async (ext) => {
      return searchFiles({ ...options, fileType: ext });
    })
  );

  // Combine results
  const allFiles = results.flatMap(result => result.files);
  const total = results.reduce((sum, result) => sum + result.total, 0);

  // Remove duplicates and sort
  const uniqueFiles = allFiles.filter((file, index, self) => 
    index === self.findIndex(f => f.key === file.key)
  );

  uniqueFiles.sort((a, b) => {
    const dateA = new Date(a.lastModified);
    const dateB = new Date(b.lastModified);
    return dateB.getTime() - dateA.getTime();
  });

  const limit = options.limit || 50;
  const hasMore = uniqueFiles.length > limit;

  return {
    files: uniqueFiles.slice(0, limit),
    total: uniqueFiles.length,
    hasMore
  };
}

/**
 * Get file statistics for a bucket or prefix
 */
export async function getFileStats(prefix?: string) {
  try {
    const files = await listFiles(prefix);
    
    const stats = {
      totalFiles: files.length,
      totalSize: files.reduce((sum, file) => sum + file.size, 0),
      fileTypes: {} as Record<string, number>,
      dateRange: {
        earliest: null as Date | null,
        latest: null as Date | null
      }
    };

    files.forEach(file => {
      // Count file types
      const extension = file.key.split('.').pop()?.toLowerCase() || 'unknown';
      stats.fileTypes[extension] = (stats.fileTypes[extension] || 0) + 1;

      // Track date range
      const fileDate = new Date(file.lastModified);
      if (!stats.dateRange.earliest || fileDate < stats.dateRange.earliest) {
        stats.dateRange.earliest = fileDate;
      }
      if (!stats.dateRange.latest || fileDate > stats.dateRange.latest) {
        stats.dateRange.latest = fileDate;
      }
    });

    return stats;
  } catch (error) {
    console.error('Error getting file stats:', error);
    throw error;
  }
}

/**
 * Search files by metadata or tags (if implemented)
 */
export async function searchByMetadata(metadata: Record<string, string>, options: SearchOptions = {}) {
  // This is a placeholder for future metadata search functionality
  // You would need to implement metadata storage and retrieval in your R2 setup
  console.warn('Metadata search not implemented yet');
  return searchFiles(options);
}
