import fs from 'fs';
import matter from 'gray-matter';

export const getPastryMetadata = (basePath: string) => {
    const folder = basePath + '/';
    const files = fs.readdirSync(folder);
    const markdownArticles = files.filter(file => file.endsWith('.md'));

    const articles = markdownArticles.map((filename: string)=>{
        const articleContent = fs.readFileSync(`${basePath}/${filename}`, 'utf8');
        const matterResult = matter(articleContent);
        return {
            name: matterResult.data.name,
            seller: matterResult.data.seller,
            rating: matterResult.data.rating,
            review: matterResult.data.review,
            image: matterResult.data.image,
            slug: filename.replace('.md', ''),
        }
    })
    return articles;
};

