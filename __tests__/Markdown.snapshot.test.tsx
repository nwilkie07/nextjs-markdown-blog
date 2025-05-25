import React from 'react';
import { render } from '@testing-library/react';
import Markdown from '@/components/Markdown';

describe('Markdown snapshot', () => {
  it('renders markdown with headings and text', () => {
    const md = `# Hello\n\nThis is a test of **Markdown**.`;
    const { container } = render(<Markdown>{md}</Markdown>);
    expect(container).toMatchSnapshot();
  });
});
