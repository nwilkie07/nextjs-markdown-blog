import React from 'react';
import { render, screen } from '@testing-library/react';
import Markdown from '@/components/Markdown';

describe('Markdown rich content rendering', () => {
	it('renders image', () => {
		const md = `![Alt text](/images/test.png)`;
		const { getByAltText } = render(<Markdown>{md}</Markdown>);
		const img = getByAltText('Alt text');
		expect(img).toBeInTheDocument();
		expect(img.getAttribute('src')).toContain('/images/test.png');
	});

	it('renders image with no alt or src', () => {
		render(<Markdown>{`![]()`}</Markdown>);
		const img = screen.getByRole('img');
		expect(img).toBeInTheDocument();
		expect(img).toHaveAttribute('alt', 'Image');
		expect(img).toHaveAttribute('src', '/default-image.jpg');
	});

	it('renders image with defined src and missing alt', () => {
		render(<Markdown>{`![](/images/defined-src.png)`}</Markdown>);
		const img = screen.getByRole('img');
		expect(img).toBeInTheDocument();
		expect(img).toHaveAttribute('alt', 'Image'); // fallback still triggered
		expect(img).toHaveAttribute('src', '/images/defined-src.png'); // defined src
	});

	it('renders image with defined alt and missing src', () => {
		render(<Markdown>{`![Alt text]()`}</Markdown>); // no src
		const img = screen.getByAltText('Alt text');
		expect(img).toBeInTheDocument();
		expect(img).toHaveAttribute('src', '/default-image.jpg'); // or '', depending on ImageNode fallback
	});

	it('renders code block', () => {
		const md = '```ts\nconst x: number = 42;\n```';
		const { container } = render(<Markdown>{md}</Markdown>);
		expect(container).toMatchSnapshot();
	});

	it('renders unordered list', () => {
		render(<Markdown>{`- Item 1\n- Item 2`}</Markdown>);
		expect(screen.getByText('Item 1')).toBeInTheDocument();
		expect(screen.getByText('Item 2')).toBeInTheDocument();
	});

	it('renders blockquote', () => {
		render(<Markdown>{'> This is a quote'}</Markdown>);
		expect(screen.getByText('This is a quote')).toBeInTheDocument();
	});

	it('renders inline code', () => {
		render(<Markdown>{'Text with `inline code`.'}</Markdown>);
		expect(screen.getByText('inline code')).toBeInTheDocument();
	});

	it('renders styled inline code', () => {
		const md = 'Some `code` inline.';
		const { container } = render(<Markdown>{md}</Markdown>);
		const codeEl = container.querySelector('code');

		expect(codeEl).toBeInTheDocument();
		expect(codeEl?.textContent).toBe('code');

		// Validate inline styles — trigger execution of every key in line 43
		expect(codeEl).toHaveStyle({
			backgroundColor: '#f0f0f0',
			padding: '2px 4px',
			borderRadius: '4px',
			fontFamily: 'monospace',
			fontSize: '0.875rem',
		});
	});

	it('renders headings correctly', () => {
		render(<Markdown>{`# H1\n## H2\n### H3\n#### H4\n##### H5\n###### H6`}</Markdown>);
		expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('H1');
		expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('H2');
		expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('H3');
		expect(screen.getByRole('heading', { level: 4 })).toHaveTextContent('H4');
		expect(screen.getByRole('heading', { level: 5 })).toHaveTextContent('H5');
		expect(screen.getByRole('heading', { level: 6 })).toHaveTextContent('H6');
	});

	it('renders a link correctly', () => {
		render(<Markdown>{`[OpenAI](https://openai.com)`}</Markdown>);
		const link = screen.getByRole('link', { name: 'OpenAI' });
		expect(link).toBeInTheDocument();
		expect(link).toHaveAttribute('href', 'https://openai.com');
	});

	it('renders plain paragraph text', () => {
		render(<Markdown>{`This is just plain text.`}</Markdown>);
		expect(screen.getByText('This is just plain text.')).toBeInTheDocument();
	});

	it('renders fallback for image with missing src', () => {
		render(<Markdown>{`![Alt text]()`}</Markdown>);
		const img = screen.getByAltText('Alt text');
		expect(img).toBeInTheDocument();
	});

	it('renders emojis correctly', () => {
		render(<Markdown>{`Hello 👋 world!`}</Markdown>);
		expect(screen.getByText('Hello 👋 world!')).toBeInTheDocument();
	});

	it('renders inline code when no className is provided', () => {
		const md = 'This has `inlineCode` without class.';
		const { container } = render(<Markdown>{md}</Markdown>);
		const codeEl = container.querySelector('code');
		expect(codeEl).toHaveTextContent('inlineCode');
	});

	it('renders ordered list properly', () => {
		render(<Markdown>{`1. First\n2. Second`}</Markdown>);
		expect(screen.getByText('First')).toBeInTheDocument();
		expect(screen.getByText('Second')).toBeInTheDocument();
	});

	it('renders preformatted block correctly', () => {
		const md = '```\npre block text\n```';
		render(<Markdown>{md}</Markdown>);
		expect(screen.getByText('pre block text')).toBeInTheDocument();
	});

	it('renders inline code using fallback', () => {
		render(<Markdown>{'Text with `inline`.'}</Markdown>);
		expect(screen.getByText('inline')).toBeInTheDocument();
	});

	it('renders inline code using fallback renderer', () => {
		const md = 'This has `fallbackCode`.';
		const { container } = render(<Markdown>{md}</Markdown>);
		const codeEl = container.querySelector('code');

		expect(codeEl).toBeInTheDocument();
		expect(codeEl?.textContent).toBe('fallbackCode');

		// Test the style to trigger coverage on all style lines (line 43 too)
		const style = window.getComputedStyle(codeEl!);
		expect(style.fontFamily).toMatch(/monospace/);
	});

	it('renders inline code with no className', () => {
		const md = 'This has `inlineCode` with no class.';
		const { container } = render(<Markdown>{md}</Markdown>);
		const code = container.querySelector('code');

		expect(code).toBeInTheDocument();
		expect(code?.textContent).toBe('inlineCode');
		expect(code).toHaveStyle({
			backgroundColor: '#f0f0f0',
		});
	});
});
