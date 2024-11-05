import Link from 'next/link';

const ArticleCard = (props: any) => {
	const { article } = props;
	return article ? (
		<Link className='unstyled' href={`/articles/${article.slug}`}>
			<div className="articleCard">
				<h3>{article.title}</h3>
				<p>{article.date}</p>
				<p>{article.bio}</p>
			</div>
		</Link>
	) : null;
};

export default ArticleCard;
