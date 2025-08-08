import styled from 'styled-components';

const TopBarOuter = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 16px;
	background-color: #8a716a;
`;

const IconButton = styled.button`
	background: none;
	border: none;
	color: white;
	font-size: 24px;
	cursor: pointer;
	padding: 8px;
	border-radius: 4px;
	transition: background-color 0.2s ease;

	&:hover {
		background-color: rgba(255, 255, 255, 0.1);
	}
`;

interface Props {
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const TopBar = (props: Props) => {
	const { setIsOpen } = props;
	return (
		<TopBarOuter>
			<div>
				<IconButton onClick={() => setIsOpen(true)}>
					☰
				</IconButton>
			</div>
			<div>
				<IconButton>
					🔍
				</IconButton>
			</div>
		</TopBarOuter>
	);
};
