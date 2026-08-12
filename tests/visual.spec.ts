import { expect, test } from '@playwright/test';

test('Improve specimen preserves the visual foundation', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('heading', { level: 1 }).waitFor();
  await expect(page).toHaveScreenshot('improve-specimen.png', {
    fullPage: true,
    animations: 'disabled',
    caret: 'hide',
    maxDiffPixelRatio: 0.01,
  });
});
