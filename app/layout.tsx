'use client';
import { Inter } from 'next/font/google';
import './globals.css';

import { styled } from 'styled-components';
import React from 'react';
import Header from '@/components/Header';
import { metadata } from './metadata';

const inter = Inter({ subsets: ['latin'] });

const FooterContainer = styled.footer`
	padding: 20px;
	background-color: #f8f9fa;
	text-align: center;
	font-size: 14px;
	color: #6c757d;
	margin-top: 40px;
`;

const Footer = () => {
	const currentYear = new Date().getFullYear();
	return (
		<FooterContainer>
			<p>&copy; {currentYear} My Blog. All rights reserved.</p>
		</FooterContainer>
	);
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<head>
				{metadata.title && <title>{metadata.title as string}</title>}
				{metadata.description && <meta name="description" content={metadata.description as string} />}
			</head>
			<body className={inter.className}>
				<Header />
				{children}
				<Footer />
			</body>
		</html>
	);
}
