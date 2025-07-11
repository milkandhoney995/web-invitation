import { Locator, Page } from "playwright/test";
import { Helper } from "../mix-in/helper";
import { CommonUtil } from "@/tests/utils/common";

class PageBase {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page
  }

  async open() {
    await this.page.goto('/');
  }
}

export const TopPage = Helper(PageBase)
