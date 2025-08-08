import styled from 'styled-components';
import React from 'react';

const ModalOverlay = styled.div<{ $isOpen: boolean }>`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: rgba(0, 0, 0, 0.5);
	display: ${props => props.$isOpen ? 'flex' : 'none'};
	z-index: 1000;
`;

const ModalContent = styled.div`
	background: white;
	width: 30%;
	height: 100%;
	overflow-y: auto;
`;

const BackBar = styled.div`
	display: flex;
	justify-content: start;
`;

const NavItem = styled.div`
	display: flex;
	justify-content: flex-start;
	gap: 16px;
	padding: 8px;
	align-items: center;
`;

const OuterContainer = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
`;

const ProfileOuter = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-bottom: 16px;
	margin: 0;
	width: 100%;
	gap: 16px;
`;

const SidebarTop = styled.div`
	background-color: #c2b8b2;
	padding: 16px;
	height: fit-content;
`;

const SidebarBottom = styled.div`
	background-color: #8a716a;
	height: 100%;
	padding: 16px;
`;

const NavOuter = styled.div`
	border-top: 1px dashed #c2c2c2;
	padding-top: 8px;
`;

const Intro = styled.p`
	color: #4e4e4e;
	font-size: 14px;
`;

const IntroOuter = styled.div`
	display: flex;
	flex-direction: column;
	padding-top: 16px;
	gap: 8px;
`;

const AboutButton = styled.a`
	border-style: solid;
	border-width: 1px;
	border-radius: 12px;
	cursor: pointer;
	font-size: 12px;
	font-weight: 400;
	padding: 5px 20px;
	display: inline-block;
	line-height: normal;
`;

const CloseButton = styled.button`
	background: none;
	border: none;
	color: #4e4e4e;
	font-size: 24px;
	cursor: pointer;
	padding: 4px;
	border-radius: 4px;
	transition: background-color 0.2s ease;

	&:hover {
		background-color: rgba(0, 0, 0, 0.1);
	}
`;

const IconSpan = styled.span`
	font-size: 20px;
	color: #c2c2c2;
`;

interface Props {
	isOpen: boolean;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Sidebar = (props: Props) => {
	const { setIsOpen, isOpen } = props;
	
	const handleOverlayClick = (e: React.MouseEvent) => {
		if (e.target === e.currentTarget) {
			setIsOpen(false);
		}
	};

	return (
		<ModalOverlay $isOpen={isOpen} onClick={handleOverlayClick}>
			<ModalContent>
				<OuterContainer>
					<SidebarTop>
						<BackBar>
							<CloseButton onClick={() => setIsOpen(false)}>
								✕
							</CloseButton>
						</BackBar>
						<ProfileOuter>
							<a href="https://www.blogger.com/profile/12000485798587223853" rel="nofollow">
								<img
									alt="My photo"
									height="120"
									src="https://mdg.imgix.net/assets/images/san-juan-mountains.jpg?auto=format&fit=clip&q=40&w=1080"
									width="120"
									style={{ borderRadius: '50%' }}
								/>
							</a>
							<h5>NICK + JENNA</h5>
							<AboutButton>About Us</AboutButton>
						</ProfileOuter>
						<IntroOuter>
							<h4>Adventures Abroad</h4>
							<Intro>
								Welcome to Nick and Jenna&apos;s Adventure&apos;s Abroad Blog! Enjoy posts about our travel adventures,
								reviews of all the pastries we&apos;ve tried from local patisseries, and more from our year living on
								the Franco-Swiss border;
							</Intro>
						</IntroOuter>
					</SidebarTop>
					<SidebarBottom>
						<NavOuter>
							<NavItem>
								<IconSpan>🏠</IconSpan>
								<text>Home</text>
							</NavItem>
							<NavItem>
								<IconSpan>🍰</IconSpan>
								<a href="/pastries" style={{ textDecoration: 'none', color: 'inherit' }}>
									<text>Tasty Pastries</text>
								</a>
							</NavItem>
							<NavItem>
								<IconSpan>🐾</IconSpan>
								<text>Pets</text>
							</NavItem>
							<NavItem>
								<IconSpan>🍷</IconSpan>
								<text>Wine</text>
							</NavItem>
							<NavItem>
								<IconSpan>✉️</IconSpan>
								<text>Subscribe</text>
							</NavItem>
						</NavOuter>
					</SidebarBottom>
				</OuterContainer>
			</ModalContent>
		</ModalOverlay>
	);
};
