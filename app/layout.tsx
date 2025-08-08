'use client';
import { Inter } from 'next/font/google';
import './globals.css';

import { styled } from 'styled-components';
import React, { useState } from 'react';
import Header from '@/components/Header';
import { metadata } from './metadata';
import NavigationBar from './navigation-bar';
import { Sidebar } from './sidebar';
import { TopBar } from './top-bar';
import TastyPasteries from '@/components/tasty-pastries';
import SessionProvider from '@/components/SessionProvider';
import AuthWrapper from '@/components/AuthWrapper';

const inter = Inter({ subsets: ['latin'] });

const FooterContainer = styled.footer`
	padding: 20px;
	background-color: none;
	text-align: center;
	font-size: 14px;
	margin-top: 40px;
`;
const BlogOuter = styled.div`
	background: #c2b8b2
		url('https://blogger.googleusercontent.com/img/a/AVvXsEiONnaLBeEo6C4MZqjqqbk-cYZLqE2yhcCtnlSme81wA_XoS4lL7yjxX2CNDFcK1q58jTTb4kJwu-hLIhQlOETCHnTx6Ka5Wo6xABtF7SLcwV9ZXNQGEAWZhkkzF3H0dLMtC-pfaEJKaKG43BPq0shrg5CxvJqhbIU-zhGOFM83EMTiQ9Eg46r-lQYnrAXS=s1600')
		no-repeat right top;
`;

const Footer = () => {
	const currentYear = new Date().getFullYear();
	return (
		<FooterContainer>
			<p>&copy; {currentYear} Made by Jenna and Nick. All rights reserved.</p>
		</FooterContainer>
	);
};

const MainLayout = ({ children }: { children: React.ReactNode }) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	return (
		<html lang="en">
			<head>
				{metadata.title && <title>{metadata.title as string}</title>}
				{metadata.description && <meta name="description" content={metadata.description as string} />}
			</head>
			<body style={{padding: "0"}}>
				<BlogOuter>
					<TopBar setIsOpen={setIsOpen} />
					<NavigationBar />
					<Sidebar setIsOpen={setIsOpen} isOpen={isOpen} />
					{children}
					<Footer />
				</BlogOuter>
			</body>
		</html>
	);
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<SessionProvider>
			<AuthWrapper>
				<MainLayout>
					{children}
				</MainLayout>
			</AuthWrapper>
		</SessionProvider>
	);
}
