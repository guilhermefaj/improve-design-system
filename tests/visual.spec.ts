import { expect, test } from '@playwright/test';
import axe from 'axe-core';

for (const theme of ['light', 'dark'] as const) {
  test(`Improve specimen preserves the ${theme} visual foundation`, async ({ page }) => {
    await page.goto('/');
    await page.getByRole('heading', { level: 1, name: 'Improve' }).waitFor();
    await page.evaluate(() => document.fonts.ready);
    if (theme === 'dark') await page.getByRole('button', { name: 'Ativar tema escuro' }).click();
    await expect(page).toHaveScreenshot(`improve-catalog-${theme}.png`, {
      animations: 'disabled',
      caret: 'hide',
      fullPage: false,
      maxDiffPixelRatio: 0.02,
      timeout: 15_000,
    });
  });
}

test('theme control lives in the sidebar and persists the preference', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => window.localStorage.removeItem('ibs-theme'));
  await page.reload();
  const toggle = page.locator('.showcase-sidebar').getByRole('button', { name: 'Ativar tema escuro' });
  await expect(toggle).toBeVisible();
  await expect(toggle).toHaveAttribute('aria-pressed', 'false');
  await toggle.click();
  await expect(page.locator('#root > [data-ibs-theme]')).toHaveAttribute('data-ibs-theme', 'dark');
  await page.reload();
  await expect(page.locator('#root > [data-ibs-theme]')).toHaveAttribute('data-ibs-theme', 'dark');
  await expect(page.locator('.showcase-sidebar').getByRole('button', { name: 'Ativar tema claro' })).toHaveAttribute(
    'aria-pressed',
    'true',
  );
});

test('catalog stream follows sidebar order and syncs the active item', async ({ page }, testInfo) => {
  await page.goto('/');
  const sidebar = page.locator('.showcase-sidebar');
  const agentStatusLink = sidebar.getByRole('link', { name: 'AgentStatus', exact: true });
  if (testInfo.project.name === 'mobile') {
    await sidebar.locator('nav').evaluate((element) => {
      element.scrollLeft = element.scrollWidth;
    });
  }
  await agentStatusLink.evaluate((element) => (element as HTMLAnchorElement).click());
  await expect(page.locator('#agent-status')).toBeInViewport();
  if (testInfo.project.name === 'desktop') {
    await expect(agentStatusLink).toHaveAttribute('aria-current', 'location', { timeout: 10_000 });
  }

  const streamOrder = await page.locator('.showcase-catalog-content > .showcase-panel').evaluateAll((panels) =>
    panels.map((panel) => panel.id),
  );
  const sidebarOrder = await sidebar.locator('nav a').evaluateAll((links) =>
    links.map((link) => (link as HTMLAnchorElement).hash.replace('#', '')),
  );
  expect(streamOrder).toEqual(sidebarOrder);

  if (testInfo.project.name === 'desktop') {
    const columns = await page.locator('.showcase-app').evaluate((element) => getComputedStyle(element).gridTemplateColumns);
    expect(columns.split(' ').length).toBeGreaterThan(1);
  } else {
    const overflow = await sidebar.locator('nav').evaluate((element) => ({
      scrollWidth: element.scrollWidth,
      clientWidth: element.clientWidth,
    }));
    expect(overflow.scrollWidth).toBeGreaterThan(overflow.clientWidth);
  }
});

test('light and dark specimens have no serious accessibility violations outside the documented CTA exception', async ({
  page,
}) => {
  await page.goto('/');
  await page.getByRole('heading', { level: 1, name: 'Improve' }).waitFor();
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
