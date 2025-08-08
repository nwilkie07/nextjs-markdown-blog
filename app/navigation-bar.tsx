import styled from 'styled-components';

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

const Title = styled.h1`
	font-size: 1.5em;
	text-align: center;
	color: #bf4f74;
`;

const NavigationBar = () => {
	return (
		<OuterContainer>
			<h1 style={{ fontSize: '45px', color: 'white' }}>Adventures Abroad</h1>
			<InnerContainer>
				<TopElement>
					<a href="/">Home</a>
				</TopElement>
				<TopElement>
					<a href="/pastry-reviews">Tasty Pastries</a>
				</TopElement>
				<TopElement>
					<a href="/subscribe">Subscribe</a>
				</TopElement>
			</InnerContainer>
		</OuterContainer>
	);
};

export default NavigationBar;
