import { expect, type APIRequestContext, type APIResponse } from '@playwright/test';
import { env } from '../config/env';

export type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export class PostsClient {
  constructor(private readonly request: APIRequestContext) {}

  async getPost(id: number): Promise<APIResponse> {
    return this.request.get(new URL(`posts/${id}`, env.apiBaseUrl).toString());
  }

  async getExistingPost(id: number): Promise<Post> {
    const response = await this.getPost(id);
    expect(response.ok()).toBeTruthy();
    return (await response.json()) as Post;
  }
}
