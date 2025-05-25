import React from 'react'; // Import React to avoid the test error
import { render, screen } from '@testing-library/react';
import ListNode from '@/utils/markdownRenderers/ListNode';

describe('ListNode', () => {
  it('renders unordered list when ordered is false', () => {
    render(
      <ListNode ordered={false}>
        <li>Item A</li>
        <li>Item B</li>
      </ListNode>
    );
    const list = screen.getByRole('list');
    expect(list.tagName).toBe('UL');
  });

  it('renders ordered list when ordered is true', () => {
    render(
      <ListNode ordered={true}>
        <li>First</li>
        <li>Second</li>
      </ListNode>
    );
    const list = screen.getByRole('list');
    expect(list.tagName).toBe('OL');
  });

  it('renders children inside the list', () => {
    render(
      <ListNode ordered={false}>
        <li>Only item</li>
      </ListNode>
    );
    expect(screen.getByText('Only item')).toBeInTheDocument();
  });
});
