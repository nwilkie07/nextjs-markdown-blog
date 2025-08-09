'use client';
import React, { use } from 'react';
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
import rehypeRaw from 'rehype-raw';
import { R2File } from '@/app/api/r2/files/imageSearch';

interface MarkdownProps {
	children: string;
	images: Promise<R2File[]>;
}

const renderInlineCode = ({ children, ...props }: any) => {
	const serverPromise: R2File[] = use(props.images);
	const serverImages = serverPromise.reduce((acc, file) => {
		// Use both file.name and file.key for matching flexibility
		acc[file.name] = file;
		acc[file.key] = file;
		// Also try just the filename without path
		const filename = file.key.split('/').pop();
		if (filename) {
			acc[filename] = file;
		}
		return acc;
	}, {} as Record<string, R2File>);
	const selectedImages: string[] = children.toString().split('\n').filter((img: string) => img.trim());


	return (
		<CarouselProvider naturalSlideWidth={100} naturalSlideHeight={125} totalSlides={3} visibleSlides={1} isIntrinsicHeight>
			<Slider>
				{selectedImages.map((fileName: string, index: number) => {
					const trimmedFileName = fileName.trim();
					const file = serverImages[trimmedFileName];
					const url = file?.url ?? "";
					
					
					return (
						<Slide className='slide' key={index} index={index} >
							{url ? (
								<ImageNode alt={file?.name || trimmedFileName} src={url} />
							) : (
								<div style={{ padding: '20px', textAlign: 'center', color: '#666' }}>
									Image not found: {trimmedFileName}
								</div>
							)}
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
	span: ({ children, ...props }) => <span style={{color: ' #0b5394'}} {...props}>{children}</span>,
	pre: ({ children, ...props }) => <Preformatted {...props}>{children}</Preformatted>,
	p: ({ children, ...props }) => <Paragraph {...props} {...props}>{children}</Paragraph>,
};

const Markdown: React.FC<MarkdownProps> = ({ children, images }) => {	
	// Create renderers with access to images
	const renderersWithImages: Components = {
		...renderers,
		code: ({ className, children, ...props }) =>
			className ? <CodeBlock className={className}>{children}</CodeBlock> : renderInlineCode({ children, images, ...props }),
	};
	
	return (
		<ReactMarkdown
			components={renderersWithImages}
			remarkPlugins={[[remarkGfm, { singleTilde: false }]]}
			rehypePlugins={[rehypeRaw]}
		>
			{children}
		</ReactMarkdown>
	);
};

export default Markdown;
