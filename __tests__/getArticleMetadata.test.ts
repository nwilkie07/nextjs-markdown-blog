import mock from 'mock-fs';
import getArticleMetadata from '@/utils/getArticleMetadata';

describe('getArticleMetadata', () => {
  beforeEach(() => {
    mock({
      notes: {
        'entry-1.md': '---\ntitle: Entry 1\n---\nHello!',
        'entry-2.md': '---\ntitle: Entry 2\n---\nWorld!',
      },
    });
  });

  afterEach(() => mock.restore());

  it('should extract frontmatter metadata from all markdown files', () => {
    const metadata = getArticleMetadata('notes');
    expect(metadata).toHaveLength(2);
    expect(metadata[0]).toHaveProperty('title');
    expect(metadata[0]).toHaveProperty('slug');
  });
});
