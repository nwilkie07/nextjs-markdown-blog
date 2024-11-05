import fs from 'fs';
import matter from 'gray-matter';

const getArticleMetadata = (basePath: string) => {
	const folder = basePath + '/';
	const files = fs.readdirSync(folder);
	const markdownArticles = files.filter(file => file.endsWith('.md'));

    const articles = markdownArticles.map((filename: string)=>{
        const articleContent = fs.readFileSync(`${basePath}/${filename}`, 'utf8');
        const matterResult = matter(articleContent);
        return {
            title: matterResult.data.title,
            date: matterResult.data.date,
            bio: matterResult.data.description,
            slug: filename.replace('.md', ''),
        }
    })
    return articles;
};

export default getArticleMetadata;