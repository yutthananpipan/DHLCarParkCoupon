import { test, expect } from '@playwright/test';
import { login, goToReasons, selectReason } from './helpers';

test.describe('Detail Input (Step 2)', () => {
  test.describe('Text Input (Visitors)', () => {
    test.beforeEach(async ({ page }) => {
      await login(page);
      await goToReasons(page);
      await selectReason(page, 'visitors');
    });

    test('should display vendor name input', async ({ page }) => {
      await expect(page.getByText('Step 02')).toBeVisible();
      await expect(page.getByText('Please Specify Name of Vendor')).toBeVisible();
      await expect(page.locator('input[type="text"]')).toBeVisible();
    });

    test('should navigate to quantity after entering vendor name', async ({ page }) => {
      await page.locator('input[type="text"]').fill('Test Vendor');
      await page.getByRole('button', { name: /next/i }).click();
      await expect(page.getByText('Quantity of Coupons')).toBeVisible();
    });

    // BUG-04: Whitespace-only should fail validation
    test('should reject whitespace-only input', async ({ page }) => {
      const input = page.locator('input[type="text"]');
      await input.fill('   ');
      await page.getByRole('button', { name: /next/i }).click();

      // Should show error message and NOT navigate away
      await expect(page.getByText('กรุณากรอกข้อมูลก่อนดำเนินการต่อ')).toBeVisible();
      await expect(page.getByText('Please Specify Name of Vendor')).toBeVisible();
    });

    test('should show error for empty input', async ({ page }) => {
      await page.getByRole('button', { name: /next/i }).click();
      await expect(page.getByText('กรุณากรอกข้อมูลก่อนดำเนินการต่อ')).toBeVisible();
    });

    // BUG-05: NEXT button should NOT turn black on validation error
    test('should keep NEXT button red after validation error', async ({ page }) => {
      await page.getByRole('button', { name: /next/i }).click();

      // Button should still have red background, not black
      const nextBtn = page.getByRole('button', { name: /next/i });
      await expect(nextBtn).toHaveClass(/bg-\[#D40511\]/);
      await expect(nextBtn).not.toHaveClass(/bg-black/);
    });

    // BUG-07: Error state should not persist when navigating back
    test('should not show red error border when navigating back from Step 3', async ({ page }) => {
      // Fill valid input and go to next
      await page.locator('input[type="text"]').fill('Valid Vendor');
      await page.getByRole('button', { name: /next/i }).click();

      // Should be on Step 3
      await expect(page.getByText('Quantity of Coupons')).toBeVisible();

      // Navigate back to Step 2
      await page.getByRole('button', { name: /back/i }).first().click();

      // Input should NOT have error red border (border-[#D40511])
      // It should have transparent or gray border
      const input = page.locator('input[type="text"]');
      await expect(input).toHaveClass(/border-transparent/);
    });

    // UX-03: Text input should have autoCapitalize
    test('should have autoCapitalize attribute for mobile keyboards', async ({ page }) => {
      const input = page.locator('input[type="text"]');
      await expect(input).toHaveAttribute('autocapitalize', 'words');
    });
  });

  test.describe('Dropdown Select (Training)', () => {
    test.beforeEach(async ({ page }) => {
      await login(page);
      await goToReasons(page);
      await selectReason(page, 'training');
    });

    test('should display custom dropdown with training options', async ({ page }) => {
      await expect(page.getByText('Please Specify Training Subject')).toBeVisible();
      // Default value should be CIS (first option)
      await expect(page.getByRole('button', { name: 'CIS' })).toBeVisible();
    });

    test('should open dropdown and show all options', async ({ page }) => {
      // Click the dropdown trigger
      await page.getByRole('button', { name: 'CIS' }).click();

      // All 4 options should be visible
      await expect(page.getByRole('button', { name: 'CIS' }).nth(1)).toBeVisible();
      await expect(page.getByRole('button', { name: 'CIM' })).toBeVisible();
      await expect(page.getByRole('button', { name: 'AMAZON' })).toBeVisible();
      await expect(page.getByRole('button', { name: 'OTHERS' })).toBeVisible();
    });

    test('should select option and close dropdown', async ({ page }) => {
      // Open dropdown
      await page.getByRole('button', { name: 'CIS' }).click();

      // Select AMAZON
      await page.getByRole('button', { name: 'AMAZON' }).click();

      // Dropdown should close and show selected value
      const trigger = page.locator(
        'button:has-text("AMAZON"):not(:has-text("CIS")):not(:has-text("CIM")):not(:has-text("OTHERS"))'
      );
      await expect(trigger.first()).toBeVisible();
    });

    test('should proceed to quantity screen after selecting option', async ({ page }) => {
      await page.getByRole('button', { name: /next/i }).click();
      await expect(page.getByText('Quantity of Coupons')).toBeVisible();
    });
  });
});
