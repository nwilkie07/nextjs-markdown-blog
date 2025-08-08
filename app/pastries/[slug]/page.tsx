import { getPastryMetadata } from '@/utils/getPastryMetadata';
import Link from 'next/link';
import styled from 'styled-components';

const PastryContainer = styled.div`
	max-width: 800px;
	margin: 0 auto;
	padding: 2rem;
`;

const StyledLink = styled(Link)`
	color: #bf4f74;
	text-decoration: none;
	font-weight: bold;
	margin-bottom: 2rem;
	display: inline-block;
`;

const StyledImg = styled.img`
	width: 100%;
	max-height: 400px;
	object-fit: cover;
	border-radius: 12px;
	margin-bottom: 2rem;
`;

const StyledH1 = styled.h1`
	color: #bf4f74;
	font-size: 2.5rem;
	margin-bottom: 1rem;
	text-align: center;
`;

const StyledH2 = styled.h2`
	color: #666;
	font-size: 1.5rem;
	margin-bottom: 1rem;
	text-align: center;
`;

const PastryRating = styled.div`
	color: #bf4f74;
	font-weight: bold;
	font-size: 1.25rem;
	margin-bottom: 2rem;
	text-align: center;
`;

const PastryReview = styled.p`
	color: #333;
	font-size: 1.1rem;
	line-height: 1.6;
	text-align: justify;
`;

export const generateStaticParams = async () => {
	const pastries = getPastryMetadata('pasteries').map(pastry => ({ slug: pastry.slug }));
	return pastries;
};

interface Params {
	slug?: string;
}

interface SearchParams {
	[key: string]: string | string[];
}

export const generateMetadata = async ({
	params,
	searchParams,
}: {
	params: Params;
	searchParams: SearchParams;
}) => {
	const id = params?.slug ? ' - ' + params?.slug : '';
	return {
		title: `Pastry Review ${id.replaceAll('_', '')}`,
	};
};

const PastryPage = (props: any) => {
	const slug = props.params.slug;
	const pastries = getPastryMetadata('pasteries');
	const pastry = pastries.find(p => p.slug === slug);

	if (!pastry) {
		return (
			<div style={{
				maxWidth: '800px',
				margin: '0 auto',
				padding: '2rem'
			}}>
				<h1>Pastry not found</h1>
			</div>
		);
	}

	return (
		<PastryContainer>
			<StyledLink href="/pastries">
				← Back to Pastries
			</StyledLink>
			{pastry.image && (
				<StyledImg 
					src={pastry.image} 
					alt={pastry.name}
				/>
			)}
			<StyledH1>{pastry.name}</StyledH1>
			<StyledH2>{pastry.seller}</StyledH2>
			<PastryRating>{pastry.rating}</PastryRating>
			<PastryReview>{pastry.review}</PastryReview>
		</PastryContainer>
	);
};

export default PastryPage;
