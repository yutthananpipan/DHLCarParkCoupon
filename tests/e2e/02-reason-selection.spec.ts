import { test, expect } from '@playwright/test';
import { login, goToReasons } from './helpers';

test.describe('Reason Selection (Step 1)', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
    await goToReasons(page);
  });

  test('should display all 6 reason cards', async ({ page }) => {
    await expect(page.getByText('Step 01')).toBeVisible();

    const reasonCards = page.locator('.grid button');
    await expect(reasonCards).toHaveCount(6);
  });

  test('should display number badges on each card', async ({ page }) => {
    for (let i = 1; i <= 6; i++) {
      const badge = page.locator(`.grid button:nth-child(${i}) .absolute.top-3.left-3`);
      await expect(badge).toContainText(String(i));
    }
  });

  test('should navigate to detail input when selecting VISITORS', async ({ page }) => {
    await page.getByRole('button', { name: /visitors/i }).click();
    await expect(page.getByText('Please Specify Name of Vendor')).toBeVisible();
  });

  test('should navigate to detail input when selecting TRAINING', async ({ page }) => {
    await page.getByRole('button', { name: /training/i }).click();
    await expect(page.getByText('Please Specify Training Subject')).toBeVisible();
  });

  test('should navigate to quantity when selecting OUTING', async ({ page }) => {
    await page.getByRole('button', { name: /outing/i }).click();
    await expect(page.getByText('Quantity of Coupons')).toBeVisible();
  });

  test('should navigate to GMNC confirm screen', async ({ page }) => {
    await page.getByRole('button', { name: /gmnc/i }).click();
    await expect(page.getByRole('heading', { name: 'GMNC Team' })).toBeVisible();
  });

  // BUG-08: Selected reason card should retain highlight on back navigation
  test('should highlight selected reason when navigating back from Step 2', async ({ page }) => {
    await page.getByRole('button', { name: /visitors/i }).click();
    await expect(page.getByText('Please Specify Name of Vendor')).toBeVisible();

    // Navigate back to Step 1 via the ArrowLeft button in the header area
    await page.locator('button:has(svg.lucide-arrow-left)').first().click();
    await expect(page.getByText('Select Reason')).toBeVisible();

    // The VISITORS card should have active border
    const visitorsCard = page.getByRole('button', { name: /visitors/i });
    await expect(visitorsCard).toHaveClass(/border-\[#D40511\]/);
  });

  test('should navigate back to welcome screen', async ({ page }) => {
    // Click the ArrowLeft button (first one in the header)
    await page.locator('button:has(svg.lucide-arrow-left)').first().click();
    await expect(page.getByText('Ready?')).toBeVisible({ timeout: 5000 });
  });
});
