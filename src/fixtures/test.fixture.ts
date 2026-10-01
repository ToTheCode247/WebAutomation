import { test as base, expect } from '@playwright/test';
import { TodoPage } from '../pages/todo.page';

type AppFixtures = {
  todoPage: TodoPage;
};

export const test = base.extend<AppFixtures>({
  todoPage: async ({ page }, use) => {
    await use(new TodoPage(page));
  }
});

export { expect };
