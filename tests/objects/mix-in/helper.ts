import { Locator, Page, TestInfo } from "playwright/test";

type Constructor<T = {}> = new (...args: any[]) => T;
type hasPage = { page: Page}

export function Helper<TBase extends Constructor<hasPage>>(Base: TBase) {
  return class extends Base {
    
  }
}