'use client';

import { useState, useEffect, useCallback } from 'react';

interface R2File {
  key: string;
  size: number;
  lastModified: Date | string;
  etag: string;
  url?: string;
}

interface SearchParams {
  q: string;
  prefix: string;
  type: string;
  limit: number;
}

export default function StaticImageSearch(searchParams: SearchParams) {
  const [files, setFiles] = useState<R2File[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

 const searchFiles = useCallback(async (params: SearchParams) => {
    setLoading(true);
    setError(null);

    try {
      const urlParams = new URLSearchParams();
      if (params.q) urlParams.append('q', params.q);
      if (params.prefix) urlParams.append('prefix', params.prefix);
      if (params.type) urlParams.append('type', params.type);
      if (params.limit) urlParams.append('limit', params.limit.toString());
      urlParams.append('includeUrls', 'true');

      const response = await fetch(`/api/r2/search?${urlParams}`);
      const data = await response.json();

      if (response.ok) {
        setFiles(data);
      } else {
        setError(data.error || 'Failed to search files');
      }
    } catch (err) {
      setError('Failed to search files');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Initial load
    searchFiles(searchParams);
  }, []);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (date: Date | string): string => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(dateObj);
  };

  const getImageTitle = (key: string): string => {
    const filename = key.split('/').pop() || key;
    return filename.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
  };

  return {files, loading, error, formatDate, getImageTitle, formatFileSize};
}
