'use client';

import { useSession } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { styled } from 'styled-components';

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  color: white;
  font-size: 1.2rem;
  background: #c2b8b2 url('https://blogger.googleusercontent.com/img/a/AVvXsEiONnaLBeEo6C4MZqjqqbk-cYZLqE2yhcCtnlSme81wA_XoS4lL7yjxX2CNDFcK1q58jTTb4kJwu-hLIhQlOETCHnTx6Ka5Wo6xABtF7SLcwV9ZXNQGEAWZhkkzF3H0dLMtC-pfaEJKaKG43BPq0shrg5CxvJqhbIU-zhGOFM83EMTiQ9Eg46r-lQYnrAXS=s1600') no-repeat right top;
`;

interface AuthWrapperProps {
  children: React.ReactNode;
}

export default function AuthWrapper({ children }: AuthWrapperProps) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  // List of paths that don't require authentication
  const publicPaths = ['/auth/signin', '/auth/error', '/api/auth'];
  
  // Check if current path is public
  const isPublicPath = publicPaths.some(path => pathname?.startsWith(path));

  useEffect(() => {
    if (status === 'unauthenticated' && !isPublicPath) {
      router.push('/auth/signin');
    }
  }, [status, router, pathname, isPublicPath]);

  // If it's a public path, render children without authentication check
  if (isPublicPath) {
    return <>{children}</>;
  }

  // Show loading while checking authentication
  if (status === 'loading') {
    return (
      <LoadingContainer>
        Loading...
      </LoadingContainer>
    );
  }

  if (!session) {
    return (
      <LoadingContainer>
        Redirecting to sign in...
      </LoadingContainer>
    );
  }

  return <>{children}</>;
}
