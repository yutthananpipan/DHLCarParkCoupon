import { test, expect } from '@playwright/test';
import { login } from './helpers';

test.describe('Contact Modal (แจ้งแก้ไขข้อมูล)', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
    // Open the contact modal from welcome screen
    await page.getByRole('button', { name: /แจ้งแก้ไขข้อมูล/i }).click();
    await expect(page.getByText('Request Data Correction')).toBeVisible();
  });

  test('should display employee info (read-only)', async ({ page }) => {
    await expect(page.getByText('Employee Name')).toBeVisible();
    await expect(page.getByText('Employee ID')).toBeVisible();
  });

  test('should display form fields', async ({ page }) => {
    await expect(page.getByText('ข้อมูลที่ต้องการแก้ไข')).toBeVisible();
    await expect(page.getByText('เหตุผลในการแก้ไข')).toBeVisible();
  });

  // BUG-06: Should NOT use HTML5 required (no English browser tooltips)
  test('should not use HTML5 required attribute', async ({ page }) => {
    const textarea1 = page.locator('#dataToCorrect');
    const textarea2 = page.locator('#reason');

    await expect(textarea1).not.toHaveAttribute('required', '');
    await expect(textarea2).not.toHaveAttribute('required', '');
  });

  // BUG-06: Should use noValidate on form
  test('should use noValidate on form element', async ({ page }) => {
    const form = page.locator('form');
    await expect(form).toHaveAttribute('novalidate', '');
  });

  // BUG-06: Custom Thai validation messages
  test('should show Thai error messages on empty submit', async ({ page }) => {
    // Click submit without filling fields
    await page.getByRole('button', { name: /ส่งคำขอแก้ไข/i }).click();

    // Should show Thai error messages (not browser English tooltips)
    await expect(page.getByText('กรุณาระบุข้อมูลที่ต้องการแก้ไข')).toBeVisible();
    await expect(page.getByText('กรุณาระบุเหตุผลในการแก้ไข')).toBeVisible();
  });

  // BUG-06: Error border should be red (#D40511), not yellow/orange
  test('should show red error border on invalid textareas', async ({ page }) => {
    await page.getByRole('button', { name: /ส่งคำขอแก้ไข/i }).click();

    const textarea1 = page.locator('#dataToCorrect');
    await expect(textarea1).toHaveClass(/border-\[#D40511\]/);
  });

  // BUG-06: Error should clear when user starts typing
  test('should clear error when user starts typing', async ({ page }) => {
    // Trigger errors
    await page.getByRole('button', { name: /ส่งคำขอแก้ไข/i }).click();
    await expect(page.getByText('กรุณาระบุข้อมูลที่ต้องการแก้ไข')).toBeVisible();

    // Start typing in first field
    await page.locator('#dataToCorrect').fill('Some data');

    // First error should clear
    await expect(page.getByText('กรุณาระบุข้อมูลที่ต้องการแก้ไข')).not.toBeVisible();
  });

  test('should submit successfully and show confirmation', async ({ page }) => {
    await page.locator('#dataToCorrect').fill('ชื่อ-นามสกุลผิด');
    await page.locator('#reason').fill('พิมพ์ผิด');
    await page.getByRole('button', { name: /ส่งคำขอแก้ไข/i }).click();

    await expect(page.getByText('ส่งคำขอสำเร็จ!')).toBeVisible();
    await expect(page.getByText('ชื่อ-นามสกุลผิด')).toBeVisible();
  });

  test('should close modal and reset form', async ({ page }) => {
    // Close with X button
    await page.locator('button:has(svg.lucide-x)').click();

    // Modal should be gone
    await expect(page.getByText('Request Data Correction')).not.toBeVisible();

    // Reopen — form should be empty
    await page.getByRole('button', { name: /แจ้งแก้ไขข้อมูล/i }).click();
    const textarea1 = page.locator('#dataToCorrect');
    await expect(textarea1).toHaveValue('');
  });

  // UX-03: autoCapitalize for mobile
  test('should have autoCapitalize for mobile keyboards', async ({ page }) => {
    const textarea1 = page.locator('#dataToCorrect');
    await expect(textarea1).toHaveAttribute('autocapitalize', 'sentences');
  });
});
