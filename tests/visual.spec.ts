import { expect, test } from '@playwright/test';
import axe from 'axe-core';

for (const theme of ['light', 'dark'] as const) {
  test(`Improve specimen preserves the ${theme} visual foundation`, async ({ page }) => {
    await page.goto('/');
    await page.getByRole('heading', { level: 1 }).waitFor();
    if (theme === 'dark') await page.getByRole('button', { name: 'Ativar tema escuro' }).click();
    await expect(page.locator('#catalogo')).toHaveScreenshot(`improve-catalog-${theme}.png`, {
      animations: 'disabled',
      caret: 'hide',
      maxDiffPixelRatio: 0.01,
    });
  });
}

test('light and dark specimens have no serious accessibility violations outside the documented CTA exception', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('heading', { level: 1 }).waitFor();
  await page.addScriptTag({ content: axe.source });
  for (const theme of ['light', 'dark'] as const) {
    if (theme === 'dark') {
      await page.getByRole('button', { name: 'Ativar tema escuro' }).click();
      await page.waitForTimeout(350);
    }
    const violations = await page.evaluate(async () => {
      const axeApi = (window as typeof window & { axe: typeof axe }).axe;
      const result = await axeApi.run({ exclude: [['.ibs-button--primary'], ['.ibs-button--brand']] });
      return result.violations.filter((item) => item.impact === 'critical' || item.impact === 'serious');
    });
    expect(violations, `${theme} theme accessibility`).toEqual([]);
  }
});
