import React from 'react'; // Import React to avoid the test error
import { render, screen } from '@testing-library/react';
import Heading from '@/utils/markdownRenderers/Heading';

describe('Heading component', () => {
	it('renders level 1 heading', () => {
		render(<Heading level={1}>Heading One</Heading>);
		const h1 = screen.getByRole('heading', { level: 1 });
		expect(h1).toHaveTextContent('Heading One');
	});

	it('renders level 3 heading', () => {
		render(<Heading level={3}>Subheading</Heading>);
		const h3 = screen.getByRole('heading', { level: 3 });
		expect(h3).toHaveTextContent('Subheading');
	});

	it('defaults to h1 if level is invalid or missing', () => {
		render(<Heading level={99}>Fallback</Heading>);
		const h1 = screen.getByRole('heading', { level: 1 });
		expect(h1).toHaveTextContent('Fallback');
	});

	it.each([
		[1, 'h1'],
		[2, 'h2'],
		[3, 'h3'],
		[4, 'h4'],
		[5, 'h5'],
		[6, 'h6'],
	])('renders level %i heading correctly', (level, tag) => {
		render(<Heading level={level}>Heading {level}</Heading>);
		const heading = screen.getByRole('heading', { level });
		expect(heading.tagName.toLowerCase()).toBe(tag);
		expect(heading).toHaveTextContent(`Heading ${level}`);
	});
});
