'use client'; // Mark this component as client-side

import React from 'react';
import Markdown from '@/components/Markdown';
import styles from './ArticleContent.module.css';

interface ArticleContentProps {
    articleContent: string | null;
    loading: boolean;
}

const ArticleContent: React.FC<ArticleContentProps> = ({ articleContent, loading }) => {
    return (
        <main>
            {loading ? (
                <div className={styles.loaderWrapper}>
                    <div className={styles.spinner} data-testid="spinner"></div>
                </div>
            ) : (
                <article>
                    {articleContent ? <Markdown>{articleContent}</Markdown> : <p>Article not found.</p>}
                </article>
            )}
        </main>
    );
};

export default ArticleContent;
