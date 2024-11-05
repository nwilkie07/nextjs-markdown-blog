import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import styles from './CodeBlock.module.css';

export interface CodeBlockProps {
    className?: string;
    children: React.ReactNode;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ className, children }) => {
    const language = className?.replace('language-', '') || ''; // Extract language from className
    const codeString =
        React.Children.map(children, child =>
            typeof child === 'string' ? child : React.isValidElement(child) ? child.props.children : '',
        )?.join('') ?? '';

    return (
        <div className={styles.customCode}>
            <SyntaxHighlighter language={language} style={oneDark}>
                {codeString}
            </SyntaxHighlighter>
        </div>
    );
};

export default CodeBlock;
