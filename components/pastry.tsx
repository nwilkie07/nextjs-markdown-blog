import styled from 'styled-components';

const Text = styled.span`
	font-size: 28;
	color: rgb(116, 27, 71);
`;

const Title = styled.span`
	font-size: 28;
	color: rgb(116, 27, 71);
	font-weight: 500;
	text-decoration: underline;
`;

const OuterBorder = styled.div`
	box-shadow: 10px 10px rgb(213, 166, 189);
	display: flex;
	flex-direction: column;
	width: 100%;
	background-color: rgb(234, 209, 220);
`;
const InnerContent = styled.div`
	display: flex;
	padding: 16px;
	align-items: start;
	justify-content: space-between;
`;
const TextGrid = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
	padding-right: 48px;
	gap: 8px;
`;

export interface PastryProps {
    name: string;
    seller: string;
    rating: string;
    review: string;
    image: string;
	slug: string;
}

export const Pastry = (props: PastryProps) => {
    const {name, seller, rating, review, image} = props;
	return (
		<div style={{ display: 'flex', gap: '16px', width: '100%' }}>
			<OuterBorder>
				<InnerContent>
					<TextGrid>
						<div>
							<Title>Name:</Title>
							<Text>&nbsp;{name}</Text>
						</div>
						<div>
							<Title>Seller:</Title>
							<Text>&nbsp;{seller}</Text>
						</div>
						<div>
							<Title>Rating:</Title>
							<Text>&nbsp;{rating}</Text>
						</div>
						<div>
							<Title>Review:</Title>
							<Text>
								&nbsp;{review}
							</Text>
						</div>
					</TextGrid>
					<a
						href={image}
						style={{border: "2px solid rgb(213, 166, 189)", display: "flex"}}
					>
						<img
							alt=""
                            style={{border: "0"}}
							data-original-height="1130"
							data-original-width="1130"
                            src={image}
							width="320"
						/>
					</a>
				</InnerContent>
			</OuterBorder>
		</div>
	);
};