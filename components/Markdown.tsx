import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import CodeBlock from '@/utils/markdownRenderers/CodeBlock';
import Heading from '@/utils/markdownRenderers/Heading';
import HrNode from '@/utils/markdownRenderers/HrNode';
import ImageNode from '@/utils/markdownRenderers/ImageNode';
import LinkNode from '@/utils/markdownRenderers/LinkNode';
import ListNode from '@/utils/markdownRenderers/ListNode';
import ListItemNode from '@/utils/markdownRenderers/ListItemNode';
import Paragraph from '@/utils/markdownRenderers/Paragraph';
import Preformatted from '@/utils/markdownRenderers/Preformatted';
import { Components } from 'react-markdown';
// Import Swiper React components
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import "/Users/nicholaswilkie/nextjs-markdown-blog/components/Markdown.css"

// Import Swiper styles
import 'swiper/css';

interface MarkdownProps {
	children: string;
}

const renderInlineCode = ({ children, ...props }: any) => {
	const imageArray = children.toString().split('\n');

	return (
		<CarouselProvider naturalSlideWidth={100} naturalSlideHeight={125} totalSlides={3} visibleSlides={1} isIntrinsicHeight>
			<Slider>
				{imageArray.map((pic: string, index: number) => {
					return (
						<Slide className='slide' key={index} index={index} >
							<ImageNode alt={''} src={pic} />
						</Slide>
					);
				})}
			</Slider>
			<ButtonBack>Back</ButtonBack>
			<ButtonNext>Next</ButtonNext>
		</CarouselProvider>
	);
};

const renderHeading = (level: number) => {
	const Component = ({ children, ...props }: any) => {
		return (
			<Heading level={level} {...props}>
				{children}
			</Heading>
		);
	};
	Component.displayName = `HeadingLevel${level}`;
	return Component;
};

const renderers: Components = {
	a: ({ children, ...props }) => <LinkNode {...props}>{children}</LinkNode>,
	code: ({ className, children, ...props }) =>
		className ? <CodeBlock className={className}>{children}</CodeBlock> : renderInlineCode({ children, ...props }),
	h1: renderHeading(1),
	h2: renderHeading(2),
	h3: renderHeading(3),
	h4: renderHeading(4),
	h5: renderHeading(5),
	h6: renderHeading(6),
	hr: () => <HrNode />,
	img: ({ alt, src, ...props }) => {
		const resolvedAlt = alt ? alt : '';
		const resolvedSrc = src ? src : '';
		return <ImageNode alt={resolvedAlt} src={resolvedSrc} {...props} />;
	},
	li: ({ children, ...props }) => <ListItemNode {...props}>{children}</ListItemNode>,
	ol: ({ children, ...props }) => (
		<ListNode ordered={true} {...props}>
			{children}
		</ListNode>
	),
	ul: ({ children, ...props }) => (
		<ListNode ordered={false} {...props}>
			{children}
		</ListNode>
	),
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
