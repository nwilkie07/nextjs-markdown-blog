'use client';
import './globals.css';

import { styled } from 'styled-components';
import React, { useState } from 'react';
import { metadata } from './metadata';
import NavigationBar from './navigation-bar';
import { Sidebar } from './sidebar';
import { TopBar } from './top-bar';
import SessionProvider from '@/components/SessionProvider';
import AuthWrapper from '@/components/AuthWrapper';
import BackgroundWrapper from '@/components/BackgroundWrapper';

const FooterContainer = styled.footer`
	padding: 20px;
	background-color: none;
	text-align: center;
	font-size: 14px;
	margin-top: 40px;
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
		<BackgroundWrapper>
			<TopBar setIsOpen={setIsOpen} />
			<NavigationBar />
			<Sidebar setIsOpen={setIsOpen} isOpen={isOpen} />
			{children}
			<Footer />
		</BackgroundWrapper>
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
			<body style={{ padding: '0' }}>
				<SessionProvider>
					<AuthWrapper>
						<MainLayout>{children}</MainLayout>
					</AuthWrapper>
				</SessionProvider>
			</body>
		</html>
	);
}
