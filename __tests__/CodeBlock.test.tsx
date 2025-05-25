import React from 'react';
import { render, screen } from '@testing-library/react';
import CodeBlock from '@/utils/markdownRenderers/CodeBlock';

describe('CodeBlock', () => {
	it('renders code with language from className', () => {
		render(<CodeBlock className="language-js">console.log(&quot;Hello&quot;);</CodeBlock>);

		// Match using substring or function due to span splits
		expect(screen.getByText(content => content.includes('console'))).toBeInTheDocument();
		expect(screen.getByText(content => content.includes('log'))).toBeInTheDocument();
		expect(screen.getByText(content => content.includes('"Hello"'))).toBeInTheDocument();
	});

	it('handles missing className gracefully', () => {
		render(<CodeBlock>no className</CodeBlock>);
		expect(screen.getByText(/no className/)).toBeInTheDocument();
	});

	it('handles React elements as children', () => {
		render(
			<CodeBlock>
				<span>{'React Element'}</span>
			</CodeBlock>,
		);
		expect(screen.getByText('React Element')).toBeInTheDocument();
	});

	it('joins multiple child strings correctly', () => {
		render(<CodeBlock>{['line1\n', 'line2']}</CodeBlock>);
		expect(screen.getByText(text => text.includes('line1'))).toBeInTheDocument();
		expect(screen.getByText(text => text.includes('line2'))).toBeInTheDocument();
	});

	it('renders code with no language when className is missing', () => {
		render(<CodeBlock>{`console.log('no lang');`}</CodeBlock>);
		expect(screen.getByText("console.log('no lang');")).toBeInTheDocument();
	});

	it('handles unsupported child types gracefully', () => {
		const { container } = render(<CodeBlock>{123 as unknown as React.ReactNode}</CodeBlock>);

		// Check that it renders a <code> element with no actual content
		const codeElement = container.querySelector('code');
		expect(codeElement).toBeInTheDocument();
		expect(codeElement?.textContent).toBe('');
	});
});
