import React from 'react'; // Import React to avoid the test error
import { render, screen } from '@testing-library/react';
import Header from '@/components/Header';

describe('Header', () => {
  it('renders logo or navigation', () => {
    render(<Header />);
    // Adjust depending on what is in Header
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });
});
