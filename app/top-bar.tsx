import styled from 'styled-components';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';

const TopBarOuter = styled.div`
	display: flex;
	justify-content: space-between;
	padding: 32px 48px;
`;

interface Props {
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const TopBar = (props: Props) => {
	return (
		<TopBarOuter>
			<div onClick={() => props.setIsOpen(true)}>
				<MenuRoundedIcon style={{color: 'white'}}/>
			</div>
			<div onClick={() => console.log('search blogs posts')}>
				<SearchRoundedIcon />
			</div>
		</TopBarOuter>
	);
};
