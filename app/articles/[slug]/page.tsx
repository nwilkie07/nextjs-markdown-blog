import getArticleContent from '@/utils/getArticleContent';
import getArticleMetadata from '@/utils/getArticleMetadata';
import ArticleContent from '@/components/ArticleContent'; // Import the client component

export const generateStaticParams = async () => {
	const articles = getArticleMetadata('articles').map(article => ({ slug: article.slug }));
	return articles;
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
		title: `My Blog ${id.replaceAll('_', '')}`,
	};
};

const ArticlePage = (props: any) => {
	const slug = props.params.slug;
	const article = getArticleContent('articles/', slug);

	console.log("Get article Page")

	// Use ArticleContent for client-side logic
	return (
		<ArticleContent articleContent={article.content} articleTitle={article.data.title} folder='articles' loading={false} slug={slug} />
	);
};

export default ArticlePage;
