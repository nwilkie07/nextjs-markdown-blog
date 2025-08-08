'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import styled from 'styled-components';

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: #c2b8b2 url('https://blogger.googleusercontent.com/img/a/AVvXsEiONnaLBeEo6C4MZqjqqbk-cYZLqE2yhcCtnlSme81wA_XoS4lL7yjxX2CNDFcK1q58jTTb4kJwu-hLIhQlOETCHnTx6Ka5Wo6xABtF7SLcwV9ZXNQGEAWZhkkzF3H0dLMtC-pfaEJKaKG43BPq0shrg5CxvJqhbIU-zhGOFM83EMTiQ9Eg46r-lQYnrAXS=s1600') no-repeat right top;
`;

const ErrorCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 500px;
  width: 90%;
`;

const Title = styled.h1`
  color: #bf4f74;
  margin-bottom: 1rem;
  font-size: 2rem;
`;

const ErrorMessage = styled.p`
  color: #666;
  margin-bottom: 2rem;
  line-height: 1.5;
`;

const BackButton = styled(Link)`
  background: #bf4f74;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  text-decoration: none;
  display: inline-block;
  transition: background-color 0.2s ease;

  &:hover {
    background: #a03d5f;
  }
`;

export default function AuthError() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  const getErrorMessage = (error: string | null) => {
    switch (error) {
      case 'Configuration':
        return 'There is a problem with the server configuration. Please check your environment variables.';
      case 'AccessDenied':
        return 'You do not have permission to sign in.';
      case 'Verification':
        return 'The verification token has expired or has already been used.';
      default:
        return 'An error occurred during authentication. Please try again.';
    }
  };

  return (
    <ErrorContainer>
      <ErrorCard>
        <Title>Authentication Error</Title>
        <ErrorMessage>
          {getErrorMessage(error)}
        </ErrorMessage>
        <BackButton href="/auth/signin">
          Try Again
        </BackButton>
      </ErrorCard>
    </ErrorContainer>
  );
}
