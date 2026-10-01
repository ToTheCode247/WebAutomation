import { test, expect } from '@playwright/test';
import { PostsClient } from '../../src/api/posts.client';

test.describe('Posts API @regression', () => {
  test('fetch an existing post @smoke', async ({ request }) => {
    const post = await new PostsClient(request).getExistingPost(1);
    expect(post).toEqual(expect.objectContaining({
      id: 1,
      userId: expect.any(Number),
      title: expect.any(String),
      body: expect.any(String)
    }));
  });

  test('unknown post returns 404', async ({ request }) => {
    const response = await new PostsClient(request).getPost(999999);
    expect(response.status()).toBe(404);
  });
});
