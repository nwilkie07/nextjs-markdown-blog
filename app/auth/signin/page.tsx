'use client';

import { signIn, getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';

const SignInContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: #c2b8b2 url('https://blogger.googleusercontent.com/img/a/AVvXsEiONnaLBeEo6C4MZqjqqbk-cYZLqE2yhcCtnlSme81wA_XoS4lL7yjxX2CNDFcK1q58jTTb4kJwu-hLIhQlOETCHnTx6Ka5Wo6xABtF7SLcwV9ZXNQGEAWZhkkzF3H0dLMtC-pfaEJKaKG43BPq0shrg5CxvJqhbIU-zhGOFM83EMTiQ9Eg46r-lQYnrAXS=s1600') no-repeat right top;
`;

const SignInCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 400px;
  width: 90%;
`;

const Title = styled.h1`
  color: #bf4f74;
  margin-bottom: 1rem;
  font-size: 2rem;
`;

const Description = styled.p`
  color: #666;
  margin-bottom: 2rem;
  line-height: 1.5;
`;

const SignInButton = styled.button`
  background: #4285f4;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  transition: background-color 0.2s ease;

  &:hover {
    background: #3367d6;
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const GoogleIcon = styled.span`
  font-size: 18px;
`;

export default function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const session = await getSession();
      if (session) {
        router.push('/');
      } else {
        setIsChecking(false);
      }
    };
    checkSession();
  }, [router]);

  const handleSignIn = async () => {
    setIsLoading(true);
    try {
      await signIn('google', { callbackUrl: '/' });
    } catch (error) {
      console.error('Sign in error:', error);
      setIsLoading(false);
    }
  };

  if (isChecking) {
    return (
      <SignInContainer>
        <SignInCard>
          <Title>Loading...</Title>
        </SignInCard>
      </SignInContainer>
    );
  }

  return (
    <SignInContainer>
      <SignInCard>
        <Title>Welcome to Adventures Abroad</Title>
        <Description>
          Please sign in with your Google account to access the blog.
        </Description>
        <SignInButton onClick={handleSignIn} disabled={isLoading}>
          <GoogleIcon>🔍</GoogleIcon>
          {isLoading ? 'Signing in...' : 'Sign in with Google'}
        </SignInButton>
      </SignInCard>
    </SignInContainer>
  );
}
