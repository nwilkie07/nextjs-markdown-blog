import React from 'react'; // Import React to avoid the test error
import { render, screen } from '@testing-library/react';
import ArticleCard from '@/components/ArticleCard';

describe('ArticleCard', () => {
  it('renders article title and description', () => {
    render(
      <ArticleCard
        folder="articles"
        article={{
          title: 'Test Article',
          slug: 'test-article',
          date: '2025-01-01',
          bio: 'This is a test description.',
        }}
      />
    );

    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('Test Article');
    expect(screen.getByText('This is a test description.')).toBeInTheDocument();
  });

	it('renders null when article prop is missing', () => {
		const { container } = render(<ArticleCard folder="articles" />);
		expect(container.firstChild).toBeNull(); // ✅ covers the `: null` branch
	});
});
