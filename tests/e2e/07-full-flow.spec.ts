import { test, expect } from '@playwright/test';
import { login, goToReasons, selectReason } from './helpers';

test.describe('Full E2E Flows', () => {
  test.describe('Visitor Flow (3 steps)', () => {
    test('Login → Reason → Vendor Name → Quantity → Success', async ({ page }) => {
      await login(page, '99001');
      await goToReasons(page);

      // Step 1: Select VISITORS
      await selectReason(page, 'visitors');
      await expect(page.getByText('Step 02')).toBeVisible();

      // Step 2: Enter vendor name
      await page.locator('input[type="text"]').fill('บริษัท ABC จำกัด');
      await page.getByRole('button', { name: /next/i }).click();
      await expect(page.getByText('Step 03')).toBeVisible();

      // Step 3: Select quantity 3
      await page.locator('.grid.grid-cols-5 button:nth-child(3)').click();
      await expect(page.getByText('3 coupons')).toBeVisible();

      // Confirm
      await page.getByRole('button', { name: /confirm & print/i }).click();

      // Success
      await expect(page.getByText('Success!')).toBeVisible({ timeout: 15000 });
      await expect(page.getByText('บริษัท ABC จำกัด')).toBeVisible();
    });
  });

  test.describe('Training Flow (3 steps with dropdown)', () => {
    test('Login → Reason → Select Training Subject → Quantity → Success', async ({ page }) => {
      await login(page, '88001');
      await goToReasons(page);

      // Step 1: Select TRAINING
      await selectReason(page, 'training');
      await expect(page.getByText('Step 02')).toBeVisible();

      // Step 2: Open custom dropdown and select AMAZON
      await page.getByRole('button', { name: 'CIS' }).click();
      await page.getByRole('button', { name: 'AMAZON' }).click();

      // Next
      await page.getByRole('button', { name: /next/i }).click();
      await expect(page.getByText('Step 03')).toBeVisible();

      // Step 3: Keep default quantity 1 → Confirm
      await page.getByRole('button', { name: /confirm & print/i }).click();

      // Success
      await expect(page.getByText('Success!')).toBeVisible({ timeout: 15000 });
      await expect(page.getByText('AMAZON')).toBeVisible();
    });
  });

  test.describe('Outing Flow (2 steps — skips detail)', () => {
    test('Login → Reason → Quantity → Success', async ({ page }) => {
      await login(page, '77001');
      await goToReasons(page);

      // Step 1: Select OUTING → goes directly to quantity
      await selectReason(page, 'outing');
      await expect(page.getByText('Step 02')).toBeVisible();
      await expect(page.getByText('Quantity of Coupons')).toBeVisible();

      // Select quantity 2
      await page.locator('.grid.grid-cols-5 button:nth-child(2)').click();
      await page.getByRole('button', { name: /confirm & print/i }).click();

      // Success
      await expect(page.getByText('Success!')).toBeVisible({ timeout: 15000 });
    });
  });

  test.describe('GMNC Flow (2 steps — confirm only)', () => {
    test('Login → Reason → GMNC Confirm → Success', async ({ page }) => {
      await login(page, '66001');
      await goToReasons(page);

      // Step 1: Select GMNC
      await selectReason(page, 'gmnc');
      await expect(page.getByRole('heading', { name: 'GMNC Team' })).toBeVisible();

      // Confirm
      await page.getByRole('button', { name: /^confirm$/i }).click();

      // Success
      await expect(page.getByText('Success!')).toBeVisible({ timeout: 15000 });
    });
  });

  test.describe('Meeting Flow (3 steps)', () => {
    test('Login → Reason → Meeting Subject → Quantity → Success', async ({ page }) => {
      await login(page, '55001');
      await goToReasons(page);

      // Step 1: Select MEETING
      await selectReason(page, 'meeting');
      await expect(page.getByText('Please Specify Meeting Subject')).toBeVisible();

      // Step 2: Enter meeting subject
      await page.locator('input[type="text"]').fill('Quarterly Review');
      await page.getByRole('button', { name: /next/i }).click();

      // Step 3: Select quantity → Confirm
      await page.getByRole('button', { name: /confirm & print/i }).click();

      // Success
      await expect(page.getByText('Success!')).toBeVisible({ timeout: 15000 });
      await expect(page.getByText('Quarterly Review')).toBeVisible();
    });
  });

  test.describe('Other Reason Flow (3 steps)', () => {
    test('Login → Reason → Enter Reason → Quantity → Success', async ({ page }) => {
      await login(page, '44001');
      await goToReasons(page);

      // Step 1: Select OTHER
      await selectReason(page, 'other');
      await expect(page.getByText('Please Enter Reason for Coupon')).toBeVisible();

      // Step 2: Enter reason
      await page.locator('input[type="text"]').fill('ส่งเอกสารด่วน');
      await page.getByRole('button', { name: /next/i }).click();

      // Step 3: Confirm
      await page.getByRole('button', { name: /confirm & print/i }).click();

      // Success
      await expect(page.getByText('Success!')).toBeVisible({ timeout: 15000 });
      await expect(page.getByText('ส่งเอกสารด่วน')).toBeVisible();
    });
  });

  test.describe('Navigation & Back', () => {
    test('should handle back navigation through entire flow', async ({ page }) => {
      await login(page, '33001');
      await goToReasons(page);

      // Go to detail input
      await selectReason(page, 'visitors');
      await expect(page.getByText('Step 02')).toBeVisible();

      // Back to reasons
      await page.locator('button:has(svg.lucide-arrow-left)').first().click();
      await expect(page.getByText('Select Reason')).toBeVisible();

      // Back to welcome
      await page.locator('button:has(svg.lucide-arrow-left)').first().click();
      await expect(page.getByText('Ready?')).toBeVisible({ timeout: 5000 });
    });

    test('should logout and return to login', async ({ page }) => {
      await login(page, '22001');
      // On mobile, Logout text is hidden — click the button with LogOut icon
      await page.locator('button:has(svg.lucide-log-out)').click();
      await expect(page.getByText('Sign In')).toBeVisible();
    });
  });
});
