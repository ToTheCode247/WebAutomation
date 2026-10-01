import { test, expect } from '../../src/fixtures/test.fixture';
import { todoData } from '../data/todos';

test.describe('TodoMVC @regression', () => {
  test.beforeEach(async ({ todoPage }) => {
    await todoPage.open();
  });

  test('create and complete a task @smoke', async ({ todoPage }) => {
    await todoPage.add(todoData.smoke);
    await todoPage.complete(todoData.smoke);
    await expect(todoPage.item(todoData.smoke)).toHaveClass(/completed/);
  });

  test('create and delete a task', async ({ todoPage }) => {
    await todoPage.add(todoData.first);
    await todoPage.add(todoData.second);
    await expect(todoPage.items).toHaveCount(2);
    await todoPage.remove(todoData.first);
    await expect(todoPage.item(todoData.second)).toBeVisible();
    await expect(todoPage.items).toHaveCount(1);
  });
});
