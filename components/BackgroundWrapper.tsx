'use client';

import React, { useState, useEffect } from 'react';
import { styled } from 'styled-components';

const BlogOuter = styled.div<{ $backgroundUrl?: string }>`
	background: #c2b8b2 ${props => props.$backgroundUrl ? `url(${props.$backgroundUrl})` : ''} no-repeat right top;
	background-size: contain;
	background-position: right top;
	min-height: 100vh;
`;

interface BackgroundWrapperProps {
	children: React.ReactNode;
}

export default function BackgroundWrapper({ children }: BackgroundWrapperProps) {
	const [backgroundUrl, setBackgroundUrl] = useState<string>('');

	useEffect(() => {
		const fetchBackgroundUrl = async () => {
			try {
				const response = await fetch('/api/r2/presigned?key=blog_background_half.jpg');
				const data = await response.json();
				if (data.success && data.url) {
					setBackgroundUrl(data.url);
				}
			} catch (error) {
				console.error('Error fetching background URL:', error);
			}
		};

		fetchBackgroundUrl();
	}, []);

	return (
		<BlogOuter $backgroundUrl={backgroundUrl}>
			{children}
		</BlogOuter>
	);
}
