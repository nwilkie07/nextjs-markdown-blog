import React from 'react'; // Import React to avoid the test error
import Image from 'next/image';
import Link from 'next/link';
import styles from './Header.module.css';

const StyledImage = ({ src, alt, ...props }: { src: string; alt: string }) => {
	const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
	return (
		<span className={styles.imageWrapper}>
			<Image className="customImg" src={`${basePath}${src}`} alt={alt} width={40} height={56} unoptimized {...props} />
		</span>
	)
};

const Header = () => {
	return (
		<header className={styles.headerStyles}>
			<Link href={'/'}>
				<StyledImage src="/logo-blog.png" alt="The Tech Pulse" />
				<h1 className={styles.title}>My Blog</h1>
			</Link>
			<nav className={styles.navStyles}>
				<Link href="/">Home</Link>
				<Link href="/about">About</Link>
			</nav>
		</header>
	);
};

export default Header;
