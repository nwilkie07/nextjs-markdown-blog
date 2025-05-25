import React from 'react'; // Import React to avoid the test error
import { render, screen } from '@testing-library/react';
import Markdown from '@/components/Markdown';

describe('Markdown behavior', () => {
  it('renders paragraph and heading nodes', () => {
    render(<Markdown>{`# Title\n\nA paragraph`}</Markdown>);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Title');
    expect(screen.getByText('A paragraph')).toBeInTheDocument();
  });

  it('renders image node correctly', () => {
    render(<Markdown>{`![alt text](/images/test.jpg)`}</Markdown>);
    expect(screen.getByAltText('alt text')).toHaveAttribute('src', expect.stringContaining('/images/test.jpg'));
  });

  it('renders link node correctly', () => {
    render(<Markdown>{`[Google](https://google.com)`}</Markdown>);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', 'https://google.com');
    expect(link).toHaveTextContent('Google');
  });
});
