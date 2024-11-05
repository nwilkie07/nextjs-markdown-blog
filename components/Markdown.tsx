import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import CodeBlock from '@/utils/markdownRenderers/CodeBlock';
import Heading from '@/utils/markdownRenderers/Heading';
import ImageNode from '@/utils/markdownRenderers/ImageNode'
import LinkNode from '@/utils/markdownRenderers/LinkNode';
import ListNode from '@/utils/markdownRenderers/ListNode';
import ListItemNode from '@/utils/markdownRenderers/ListItemNode';
import Paragraph from '@/utils/markdownRenderers/Paragraph';
import Preformatted from '@/utils/markdownRenderers/Preformatted';
import { Components } from 'react-markdown';

interface MarkdownProps {
	children: string;
}

const renderers: Components = {
	a: ({ children, ...props }) => <LinkNode {...props}>{children}</LinkNode>,
	code: ({ className, children, ...props }) => {
		// Block-level code: if `className` is present, it's a fenced code block
		if (className) {
			return <CodeBlock className={className}>{children}</CodeBlock>;
		}
		// Inline code: render without breaking the paragraph
		return <code style={{
			backgroundColor: '#f0f0f0',
			padding: '2px 4px',
			borderRadius: '4px',
			fontFamily: 'monospace',
			fontSize: '0.875rem',
		}} {...props}>{children}</code>;
	},
	h1: ({ children, ...props }) => <Heading level={1} {...props}>{children}</Heading>,
	h2: ({ children, ...props }) => <Heading level={2} {...props}>{children}</Heading>,
	h3: ({ children, ...props }) => <Heading level={3} {...props}>{children}</Heading>,
	h4: ({ children, ...props }) => <Heading level={4} {...props}>{children}</Heading>,
	h5: ({ children, ...props }) => <Heading level={5} {...props}>{children}</Heading>,
	h6: ({ children, ...props }) => <Heading level={6} {...props}>{children}</Heading>,
	img: ({ alt, src, ...props }) => <ImageNode alt={alt ?? ''} src={src ?? ''} {...props} />,
	li: ({ children, ...props }) => <ListItemNode {...props}>{children}</ListItemNode>,
	ol: ({ children, ...props }) => <ListNode ordered={true} {...props}>{children}</ListNode>,
	ul: ({ children, ...props }) => <ListNode ordered={false} {...props}>{children}</ListNode>,
	p: ({ children, ...props }) => <Paragraph {...props}>{children}</Paragraph>,
	pre: ({ children, ...props }) => <Preformatted {...props}>{children}</Preformatted>,
};

const Markdown: React.FC<MarkdownProps> = ({ children }) => {
	return (
		<ReactMarkdown components={renderers} remarkPlugins={[[remarkGfm, { singleTilde: false }]]}>
			{children}
		</ReactMarkdown>
	);
};

export default Markdown;
