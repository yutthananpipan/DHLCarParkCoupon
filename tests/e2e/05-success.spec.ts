import { test, expect } from '@playwright/test';
import { completeVisitorFlow } from './helpers';

test.describe('Success Screen', () => {
  test.beforeEach(async ({ page }) => {
    await completeVisitorFlow(page);
  });

  test('should display success message and receipt', async ({ page }) => {
    await expect(page.getByText('Success!')).toBeVisible();
    await expect(page.getByText('Coupon Receipt')).toBeVisible();
    await expect(page.getByText('โปรดรับคูปองที่เครื่องพิมพ์')).toBeVisible();
  });

  test('should show correct receipt details', async ({ page }) => {
    await expect(page.getByText('Employee')).toBeVisible();
    await expect(page.getByText('Category')).toBeVisible();
    await expect(page.getByText('Test Vendor Co.')).toBeVisible();
    await expect(page.getByText('Vendor', { exact: true })).toBeVisible();
    await expect(page.getByText('Date / Time')).toBeVisible();
  });

  // BUG-01: No console errors — setState should not be called during render
  test('should not produce React setState-during-render console errors', async ({ page }) => {
    const consoleErrors: string[] = [];

    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    await page.waitForTimeout(2000);

    const reactErrors = consoleErrors.filter(
      (e) => e.includes('Cannot update a component') || e.includes('setState')
    );

    expect(reactErrors).toHaveLength(0);
  });

  // UX-02: Countdown should be visible and prominent
  test('should display auto-redirect countdown', async ({ page }) => {
    await expect(page.getByText('กลับหน้าหลักอัตโนมัติใน')).toBeVisible();
  });

  // UX-02: Pause button should stop countdown
  test('should pause countdown when clicking pause button', async ({ page }) => {
    await page.getByTitle('หยุดนับถอยหลัง').click();
    await expect(page.getByText('หยุดนับถอยหลังแล้ว')).toBeVisible();

    // Wait 2 seconds and verify it stayed paused
    await page.waitForTimeout(2000);
    await expect(page.getByText('หยุดนับถอยหลังแล้ว')).toBeVisible();
  });

  test('should countdown and decrement over time', async ({ page }) => {
    const countdownText = await page.getByText('กลับหน้าหลักอัตโนมัติใน').textContent();
    const initialMatch = countdownText?.match(/(\d+)/);
    const initialValue = initialMatch ? Number(initialMatch[1]) : 15;

    await page.waitForTimeout(2100);

    const newText = await page.getByText('กลับหน้าหลักอัตโนมัติใน').textContent();
    const newMatch = newText?.match(/(\d+)/);
    const newValue = newMatch ? Number(newMatch[1]) : 15;

    expect(newValue).toBeLessThan(initialValue);
  });

  test('should navigate to dashboard when clicking back button', async ({ page }) => {
    await page.getByRole('button', { name: /back to dashboard/i }).click();
    await expect(page.getByText('Ready?')).toBeVisible();
  });
});
