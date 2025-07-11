import { test, expect } from '@playwright/test';
import { TopPage } from '../objects/pageObjects/top';
import { CommonUtil } from '../utils/common';

test.describe('レイアウト', () => {
  test('レスポンシブ-PC', async ({ page, browser }, testInfo) => {
    const newPage = await CommonUtil.setNewPage(browser)
    const topPage = new TopPage(newPage)

    await topPage.open()
    await page.waitForTimeout(6000)

  })
})