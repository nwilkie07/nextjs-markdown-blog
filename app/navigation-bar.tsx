'use client';

import styled from 'styled-components';
import { useSession, signOut } from 'next-auth/react';

const OuterContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 0px;
	width: 100%;
	align-items: space-between;
	margin-top: 24px;
`;

const InnerContainer = styled.div`
	display: flex;
	margin: 0 auto;
    padding: 32px 0;
	gap: 24px;
	align-items: center;
`;

const TopElement = styled.div`
	display: flex;
	color: #c2c2c2;
	font: normal 700 100% Ubuntu;
	line-height: 18px;
	text-transform: uppercase;

	a:link {
		color: #c2c2c2;
		padding: 12px 8px;
		width: fit-content;
	}

	a:visited {
		color: #c2c2c2;
	}

	a:hover {
		font-size: 18px;
		cursor: pointer;
		text-shadow: 2px 2px 6px black;
	}
`;

const SignOutButton = styled.button`
	background: none;
	border: none;
	color: #c2c2c2;
	font: normal 700 100% Ubuntu;
	line-height: 18px;
	text-transform: uppercase;
	padding: 12px 8px;
	cursor: pointer;

	&:hover {
		font-size: 18px;
		text-shadow: 2px 2px 6px black;
	}
`;

const UserInfo = styled.div`
	color: #c2c2c2;
	font-size: 14px;
	margin-left: 16px;
`;

const Title = styled.h1`
	font-size: 1.5em;
	text-align: center;
	color: #bf4f74;
`;

const NavigationBar = () => {
	const { data: session } = useSession();

	const handleSignOut = () => {
		signOut({ callbackUrl: '/auth/signin' });
	};

	return (
		<OuterContainer>
			<h1 style={{ fontSize: '45px', color: 'white' }}>Adventures Abroad</h1>
			<InnerContainer>
				<TopElement>
					<a href="/">Home</a>
				</TopElement>
				<TopElement>
					<a href="/pastries">Tasty Pastries</a>
				</TopElement>
				<TopElement>
					<a href="/subscribe">Subscribe</a>
				</TopElement>
				{session?.user && (
					<>
						<UserInfo>
							Welcome, {session.user.name || session.user.email}
						</UserInfo>
						<SignOutButton onClick={handleSignOut}>
							Sign Out
						</SignOutButton>
					</>
				)}
			</InnerContainer>
		</OuterContainer>
	);
};

export default NavigationBar;
