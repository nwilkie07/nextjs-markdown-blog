'use client';
import React, { Suspense, use, useEffect } from 'react';
import Markdown from '@/components/Markdown';
import styles from './ArticleContent.module.css';
import styled from 'styled-components';
import getImagesFromR2 from '@/app/api/r2/files/imageSearch';

interface ArticleContentProps {
	articleContent: string | null;
	articleTitle: string;
	folder: string;
	loading: boolean;
	slug: string;
	key: string;
}

const Article = styled.div`
	display: flex;
	flex-direction: column;
	background: white;
	padding: 16px;
	border-radius: 16px;
	border: 2px solid white;
`;

const ArticleContent: React.FC<ArticleContentProps> = ({
	articleContent,
	articleTitle,
	folder,
	loading,
	slug,
	key,
}) => {
	const images = getImagesFromR2();

	return (
		<main>
			<Suspense
				fallback={
					<div className={styles.loaderWrapper}>
						<div className={styles.spinner} data-testid="spinner"></div>
					</div>
				}
			>
				<Article>
					{articleContent ? (
						<Markdown
							images={images}
						>
							{articleContent}
						</Markdown>
					) : (
						<p>Article not found.</p>
					)}
				</Article>
			</Suspense>
		</main>
	);
};

export default ArticleContent;
