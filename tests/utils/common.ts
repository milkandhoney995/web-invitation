import { Browser, Page } from "playwright/test";

export class CommonUtil {
  public static async setNewPage(browser: Browser) {
    const context = await browser.newContext({
      locale: 'ja'
    })
    return await context.newPage()
  }
}