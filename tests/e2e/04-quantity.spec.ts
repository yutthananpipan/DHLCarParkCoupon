import { test, expect } from '@playwright/test';
import { login, goToReasons, selectReason } from './helpers';

test.describe('Quantity Selection (Step 3)', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
    await goToReasons(page);
    await selectReason(page, 'outing');
  });

  test('should display quantity grid with 10 buttons', async ({ page }) => {
    await expect(page.getByText('Quantity of Coupons')).toBeVisible();

    const gridButtons = page.locator('.grid.grid-cols-5 button');
    await expect(gridButtons).toHaveCount(10);
  });

  test('should default to quantity 1 selected', async ({ page }) => {
    // Button "1" should have the selected (red) style
    const btn1 = page.locator('.grid.grid-cols-5 button').first();
    await expect(btn1).toHaveClass(/bg-\[#D40511\]/);
    await expect(page.getByText('1 coupon')).toBeVisible();
  });

  test('should update selection when clicking a different number', async ({ page }) => {
    // Click button "5"
    const btn5 = page.locator('.grid.grid-cols-5 button:nth-child(5)');
    await btn5.click();

    // Button 5 should be selected (red)
    await expect(btn5).toHaveClass(/bg-\[#D40511\]/);
    await expect(page.getByText('5 coupons')).toBeVisible();

    // Button 1 should no longer be selected
    const btn1 = page.locator('.grid.grid-cols-5 button').first();
    await expect(btn1).toHaveClass(/bg-white/);
  });

  test('should show correct plural text', async ({ page }) => {
    // 1 coupon (singular)
    await expect(page.getByText('1 coupon')).toBeVisible();

    // Click 3 → "3 coupons" (plural)
    await page.locator('.grid.grid-cols-5 button:nth-child(3)').click();
    await expect(page.getByText('3 coupons')).toBeVisible();
  });

  // BUG-09: No stuck hover state on any cell
  test('should have consistent white background on unselected cells', async ({ page }) => {
    // All non-selected buttons should have bg-white class
    const unselectedBtns = page.locator('.grid.grid-cols-5 button:not(:first-child)');
    const count = await unselectedBtns.count();

    for (let i = 0; i < count; i++) {
      const btn = unselectedBtns.nth(i);
      await expect(btn).toHaveClass(/bg-white/);
    }
  });

  // BUG-09: Focus should not leave yellow background
  test('should not have yellow background on focused unselected cells', async ({ page }) => {
    const btn9 = page.locator('.grid.grid-cols-5 button:nth-child(9)');
    await btn9.focus();
    await expect(btn9).toHaveClass(/focus:bg-white/);
  });

  // BUG-10: Confirm button text should not wrap on mobile
  test('should not wrap CONFIRM & PRINT button text', async ({ page }) => {
    const confirmBtn = page.getByRole('button', { name: /confirm & print/i });
    await expect(confirmBtn).toHaveClass(/whitespace-nowrap/);
  });

  test('should navigate back correctly', async ({ page }) => {
    // OUTING goes directly to quantity, back should go to reasons
    await page.getByRole('button', { name: /back/i }).first().click();
    await expect(page.getByText('Select Reason')).toBeVisible();
  });
});
