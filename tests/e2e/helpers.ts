import { Page, expect } from '@playwright/test';

/**
 * Helper: Login with an employee ID
 */
export async function login(page: Page, employeeId = '12345') {
  // Navigate first, then clear session
  await page.goto('/');
  await page.evaluate(() => localStorage.clear());
  await page.reload();
  await expect(page.getByText('Sign In')).toBeVisible({ timeout: 10000 });

  const input = page.locator('#employeeId');
  await input.fill(employeeId);
  await page.locator('button[type="submit"]').click();

  // Wait for welcome screen to load
  await expect(page.getByText('Ready?')).toBeVisible({ timeout: 10000 });
}

/**
 * Helper: Navigate from welcome to reason selection
 */
export async function goToReasons(page: Page) {
  await page.getByRole('button', { name: /get coupon/i }).click();
  await expect(page.getByText('Select Reason')).toBeVisible();
}

/**
 * Helper: Select a reason by label text
 */
export async function selectReason(page: Page, reasonLabel: string) {
  await page.getByRole('button', { name: new RegExp(reasonLabel, 'i') }).click();
}

/**
 * Helper: Complete full flow up to success screen
 */
export async function completeVisitorFlow(page: Page, employeeId = '12345') {
  await login(page, employeeId);
  await goToReasons(page);
  await selectReason(page, 'visitors');

  // Step 2: Enter vendor name
  const vendorInput = page.locator('input[type="text"]');
  await vendorInput.fill('Test Vendor Co.');
  await page.getByRole('button', { name: /next/i }).click();

  // Step 3: Select quantity (default 1) and confirm
  await expect(page.getByText('Select Quantity')).toBeVisible();
  await page.getByRole('button', { name: /confirm & print/i }).click();

  // Wait for loading to complete and success screen
  await expect(page.getByText('Success!')).toBeVisible({ timeout: 15000 });
}
