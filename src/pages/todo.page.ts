import { expect, type Locator, type Page } from '@playwright/test';

export class TodoPage {
  readonly entry: Locator;
  readonly items: Locator;

  constructor(private readonly page: Page) {
    this.entry = page.getByPlaceholder('What needs to be done?');
    this.items = page.locator('.todo-list li');
  }

  async open(): Promise<void> {
    await this.page.goto('./');
    await expect(this.entry).toBeVisible();
  }

  async add(task: string): Promise<void> {
    await this.entry.fill(task);
    await this.entry.press('Enter');
    await expect(this.items.filter({ hasText: task })).toHaveCount(1);
  }

  item(task: string): Locator {
    return this.items.filter({ has: this.page.getByText(task, { exact: true }) });
  }

  async complete(task: string): Promise<void> {
    const item = this.item(task);
    await item.getByRole('checkbox').check();
    await expect(item).toHaveClass(/completed/);
  }

  async remove(task: string): Promise<void> {
    const item = this.item(task);
    await item.hover();
    await item.locator('button.destroy').click();
    await expect(item).toHaveCount(0);
  }
}
