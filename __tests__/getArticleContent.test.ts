import mock from 'mock-fs';
import getArticleContent from '@/utils/getArticleContent';

describe('getArticleContent', () => {
  beforeEach(() => {
    mock({
      articles: {
        'my-article.md': '---\ntitle: My Article\n---\nThis is the content.',
      },
    });
  });

  afterEach(() => mock.restore());

  it('should return data and content from a markdown file', () => {
    const { data, content } = getArticleContent('articles', 'my-article');
    expect(data.title).toBe('My Article');
    expect(content).toContain('This is the content.');
  });
});
