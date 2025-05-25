import React from 'react'; // Import React to avoid the test error
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import ArticleContent from '@/components/ArticleContent';

describe('ArticleContent', () => {
	it('renders markdown content', () => {
		const markdown = `# Hello World\n\nThis is a test.`;
		const { getByRole, getByText } = render(<ArticleContent articleContent={markdown} loading={false} />);
		expect(getByRole('heading', { level: 1 })).toHaveTextContent('Hello World');
		expect(getByText('This is a test.')).toBeInTheDocument();
	});
	it('renders markdown when articleContent is provided', () => {
		render(<ArticleContent loading={false} articleContent={'# Hello'} />);
		expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Hello');
	});

	it('renders loader when loading is true', () => {
		const { container } = render(<ArticleContent loading={true} articleContent={'# Hello'} />);
		expect(screen.getByTestId('spinner')).toBeInTheDocument();
	});

	it('renders fallback when articleContent is null', () => {
		render(<ArticleContent loading={false} articleContent={null} />);
		expect(screen.getByText('Article not found.')).toBeInTheDocument();
	});
});
