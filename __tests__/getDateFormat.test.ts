import React from 'react'; // Import React to avoid the error
import getDateFormat from '@/utils/getDateFormat';

describe('getDateFormat', () => {
  it('formats ISO date correctly', () => {
    const date = '2025-05-08T06:55:47-07:00';
    const formatted = getDateFormat(date);
    expect(formatted).toMatch(/May 8, 2025/);
  });
});
