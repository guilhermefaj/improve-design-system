import { expect, test } from '@playwright/test';
import axe from 'axe-core';

for (const theme of ['light', 'dark'] as const) {
  test(`Improve specimen preserves the ${theme} visual foundation`, async ({ page }) => {
    await page.goto('/');
    await page.getByRole('heading', { level: 1 }).waitFor();
    await page.evaluate(() => document.fonts.ready);
    if (theme === 'dark') await page.getByRole('button', { name: 'Ativar tema escuro' }).click();
    const catalogHead = page.locator('#catalogo .showcase-catalog__head');
    await catalogHead.scrollIntoViewIfNeeded();
    await expect(catalogHead).toHaveScreenshot(`improve-catalog-${theme}.png`, {
      animations: 'disabled',
      caret: 'hide',
      maxDiffPixelRatio: 0.02,
      timeout: 15_000,
    });
  });
}

test('theme control lives in the header and persists the preference', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => window.localStorage.removeItem('ibs-theme'));
  await page.reload();
  const toggle = page.locator('.ibs-header').getByRole('button', { name: 'Ativar tema escuro' });
  await expect(toggle).toBeVisible();
  await expect(toggle).toHaveAttribute('aria-pressed', 'false');
  await toggle.click();
  await expect(page.locator('#root > [data-ibs-theme]')).toHaveAttribute('data-ibs-theme', 'dark');
  await page.reload();
  await expect(page.locator('#root > [data-ibs-theme]')).toHaveAttribute('data-ibs-theme', 'dark');
  await expect(page.locator('.ibs-header').getByRole('button', { name: 'Ativar tema claro' })).toHaveAttribute(
    'aria-pressed',
    'true',
  );
});

test('catalog index stays below the header and adapts to the viewport', async ({ page }, testInfo) => {
  await page.goto('/');
  const header = page.locator('.ibs-header');
  const index = page.locator('.showcase-catalog-index');
  const agenticLink = index.getByRole('link', { name: /Agentic/ });
  await page.locator('#catalogo').scrollIntoViewIfNeeded();
  if (testInfo.project.name === 'mobile') {
    await index.evaluate((element) => {
      element.scrollLeft = element.scrollWidth;
    });
  }
  await agenticLink.evaluate((element) => (element as HTMLAnchorElement).click());
  if (testInfo.project.name === 'desktop') {
    await expect(agenticLink).toHaveAttribute('aria-current', 'location');
  }
  await expect(page.locator('#agentic')).toBeInViewport();

  const headerBox = await header.boundingBox();
  const indexBox = await index.boundingBox();
  expect(headerBox).not.toBeNull();
  expect(indexBox).not.toBeNull();
  expect(indexBox!.y).toBeGreaterThanOrEqual(headerBox!.y + headerBox!.height - 2);

  if (testInfo.project.name === 'desktop') {
    const columns = await page
      .locator('.showcase-catalog-layout')
      .evaluate((element) => getComputedStyle(element).gridTemplateColumns);
    expect(columns.split(' ').length).toBeGreaterThan(1);
  } else {
    const overflow = await index.locator('nav').evaluate((element) => ({
      scrollWidth: element.scrollWidth,
      clientWidth: element.parentElement?.clientWidth ?? 0,
    }));
    expect(overflow.scrollWidth).toBeGreaterThan(overflow.clientWidth);
  }
});

test('light and dark specimens have no serious accessibility violations outside the documented CTA exception', async ({
  page,
}) => {
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
