import ReactModal from 'react-modal';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import styled from 'styled-components';
import Image from 'next/image';
import CakeRoundedIcon from '@mui/icons-material/CakeRounded';
import PetsRoundedIcon from '@mui/icons-material/PetsRounded';
import WineBarRoundedIcon from '@mui/icons-material/WineBarRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';

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

const Modal = styled(ReactModal)`
	inset: 0;
	height: 100%;
	width: 30%;
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

interface Props {
	isOpen: boolean;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Sidebar = (props: Props) => {
	const { setIsOpen, isOpen } = props;
	return (
		<Modal isOpen={isOpen} shouldCloseOnOverlayClick={true} onRequestClose={() => setIsOpen(false)} closeTimeout={500}>
			<OuterContainer>
				<SidebarTop>
					<BackBar>
						<div onClick={() => setIsOpen(false)}>
							<ArrowBackRoundedIcon />
						</div>
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
							Welcome to Nick and Jenna's Adventure's Abroad Blog! Enjoy posts about our travel adventures, reviews of
							all the pastries we've tried from local patisseries, and more from our year living on the Franco-Swiss
							border;
						</Intro>
					</IntroOuter>
				</SidebarTop>
				<SidebarBottom>
					<NavOuter>
						<NavItem>
							<HomeRoundedIcon />
							<text>Home</text>
						</NavItem>
						<NavItem>
							<CakeRoundedIcon />
							<text>Tasty Pasteries</text>
						</NavItem>
						<NavItem>
							<PetsRoundedIcon />
							<text>Pets</text>
						</NavItem>
						<NavItem>
							<WineBarRoundedIcon />
							<text>Wine</text>
						</NavItem>
						<NavItem>
							<EmailRoundedIcon />
							<text>Subscribe</text>
						</NavItem>
					</NavOuter>
				</SidebarBottom>
			</OuterContainer>
		</Modal>
	);
};
