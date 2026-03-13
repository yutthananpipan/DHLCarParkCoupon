import { test, expect } from '@playwright/test';

test.describe('Login Screen', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
    await page.reload();
    await expect(page.getByText('Sign In')).toBeVisible({ timeout: 10000 });
  });

  test('should display login form', async ({ page }) => {
    await expect(page.getByText('Sign In')).toBeVisible();
    await expect(page.locator('#employeeId')).toBeVisible();
  });

  test('should disable login button when input is empty', async ({ page }) => {
    const loginBtn = page.locator('button[type="submit"]');
    await expect(loginBtn).toBeDisabled();
  });

  test('should login successfully with valid employee ID', async ({ page }) => {
    await page.locator('#employeeId').fill('12345');
    await page.locator('button[type="submit"]').click();
    await expect(page.getByText('Ready?')).toBeVisible({ timeout: 10000 });
  });

  test('should persist login across page reload', async ({ page }) => {
    await page.locator('#employeeId').fill('12345');
    await page.locator('button[type="submit"]').click();
    await expect(page.getByText('Ready?')).toBeVisible({ timeout: 10000 });

    await page.reload();
    await expect(page.getByText('Ready?')).toBeVisible({ timeout: 10000 });
  });

  // BUG-02: Brand panel visible on mobile
  test('should show brand header on mobile viewport', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'Mobile-only test');
    // The mobile-only header div should be visible
    const mobileBrand = page.locator('.md\\:hidden').first();
    await expect(mobileBrand).toBeVisible();
  });

  // BUG-03: No browser spinner arrows on number input
  test('should use text input with numeric inputMode (no spinners)', async ({ page }) => {
    const input = page.locator('#employeeId');
    await expect(input).toHaveAttribute('type', 'text');
    await expect(input).toHaveAttribute('inputmode', 'numeric');
  });

  // BUG-03: Only accepts numeric input
  test('should filter non-numeric characters', async ({ page }) => {
    const input = page.locator('#employeeId');
    await input.pressSequentially('abc123def456');
    await expect(input).toHaveValue('123456');
  });
});
