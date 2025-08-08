'use client'; // Mark this component as client-side

import React from 'react';
import Markdown from '@/components/Markdown';
import styles from './ArticleContent.module.css';
import styled from 'styled-components';

interface ArticleContentProps {
	articleContent: string | null;
	articleTitle: string;
	folder: string;
	loading: boolean;
	slug: string;
}

const Article = styled.div`
	display: flex;
	flex-direction: column;
	background: white;
	padding: 16px;
	border-radius: 16px;
	border: 2px solid white;
`;

const ArticleContent: React.FC<ArticleContentProps> = ({ articleContent, articleTitle, folder, loading, slug }) => {
	return (
		<main>
			{loading ? (
				<div className={styles.loaderWrapper}>
					<div className={styles.spinner} data-testid="spinner"></div>
				</div>
			) : (
				<Article>{articleContent ? <Markdown>{articleContent}</Markdown> : <p>Article not found.</p>}</Article>
			)}
		</main>
	);
};

export default ArticleContent;
