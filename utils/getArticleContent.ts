import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';

const getArticleContent = (folder: string, slug: string) => {
	const file = path.join(folder, `${slug}.md`);
	const content = fs.readFileSync(file, 'utf8');
	const matterResult = matter(content);
	return matterResult;
};

export default getArticleContent;