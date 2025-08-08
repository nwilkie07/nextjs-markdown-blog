import { getPastryMetadata } from '@/utils/getPastryMetadata';
import Link from 'next/link';
import styled from 'styled-components';

const PastriesContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
	gap: 2rem;
	padding: 2rem;
`;

const PastryCard = styled.div`
	background: white;
	border-radius: 12px;
	padding: 1.5rem;
	box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
	transition: transform 0.2s ease;
	cursor: pointer;
`;

const StyledLink = styled(Link)`
	text-decoration: none;
	color: inherit;
`;

const StyledImg = styled.img`
	width: 100%;
	height: 200px;
	object-fit: cover;
	border-radius: 8px;
	margin-bottom: 1rem;
`;

const StyledH1 = styled.h1`
	color: #bf4f74;
	font-size: 2.5rem;
	margin-bottom: 1rem;
	text-align: center;
`;

const StyledH3 = styled.h3`
	color: #bf4f74;
	font-size: 1.5rem;
	margin-bottom: 1rem;
	text-align: center;
`;

const StyledP = styled.p`
	color: #666;
	font-size: 0.9rem;
	margin-bottom: 0.5rem;
`;

const StyledRating = styled.p`
	color: #bf4f74;
	font-weight: bold;
	margin-bottom: 0.5rem;
`;

const StyledReview = styled.p`
	color: #333;
	font-size: 0.9rem;
	line-height: 1.4;
`;

export default function PastriesPage() {
  const pastries = getPastryMetadata('pasteries'); // Note: using the existing directory name

  return (
    <div>
      <StyledH1>
        Tasty Pastries
      </StyledH1>
      <PastriesContainer>
        {pastries.map((pastry, index) => (
          <StyledLink href={`/pastries/${pastry.slug}`} key={index}>
            <PastryCard>
              {pastry.image && (
                <StyledImg 
                  src={pastry.image} 
                  alt={pastry.name}
                />
              )}
              <StyledH3>{pastry.name}</StyledH3>
              <StyledP>{pastry.seller}</StyledP>
              <StyledRating>{pastry.rating}</StyledRating>
              <StyledReview>{pastry.review}</StyledReview>
            </PastryCard>
          </StyledLink>
        ))}
      </PastriesContainer>
    </div>
  );
}
