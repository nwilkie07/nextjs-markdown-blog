/* eslint-disable @next/next/no-img-element */
import * as React from 'react';

const NextImage = ({ src, alt, onLoad, className, ...props }: any) => {
	React.useEffect(() => {
		if (onLoad) {
			onLoad({} as any); // simulate image load
		}
	}, [onLoad]);

	const filteredProps = { ...props };
	delete filteredProps.unoptimized;

	// Keep only the img — wrapper comes from your real component
	return <img src={src} alt={alt} className={className} {...filteredProps} />;
};

export default NextImage;
