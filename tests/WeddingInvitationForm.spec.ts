import { test, expect } from '@playwright/test';
import { mockGuestFormData } from './constants/testFormData';
import { labelData } from '@/constants/labelData';

test('招待フォームを送信してAPIが呼び出されること', async ({ page }) => {
  // APIモック：実際の外部送信を止める
  let postData: any = null;
  await page.route('https://invite-project.onrender.com/submit', async (route, request) => {
    postData = await request.postDataJSON();
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ status: 'ok' }),
    });
  });

  // ページに移動（トップページなどにフォームがある想定）
  await page.goto('/');

  const guest = mockGuestFormData.guests[0];
  // フォームに値を入力（1人目のみ）
  await page.getByLabel(labelData.name).fill(guest.name);
  await page.getByLabel(labelData.kana).fill(guest.kana);
  await page.getByLabel(labelData.postalCode).fill(guest.postalCode);
  await page.getByLabel(labelData.address).fill(guest.address);
  await page.getByLabel(labelData.buildingName).fill(guest.buildingName);
  await page.getByLabel(labelData.phone).fill(guest.phone);
  await page.getByLabel(labelData.email).fill(guest.email);
  await page.getByLabel(labelData.allergies).fill(guest.allergies);
  await page.getByLabel(labelData.message).fill(guest.message);

  // 送信ボタンをクリック
  await page.getByRole('button', { name: '送信' }).click();

  // 完了ページへ遷移することを確認
  await expect(page).toHaveURL(/\/completed/);

  // APIに送信されたデータを検証
  expect(postData).not.toBeNull();
  expect(postData.guests[0].name).toBe(guest.name);
  expect(postData.guests[0].email).toBe(guest.email);
});

test('複数ゲスト（2人）を送信するテスト', async ({ page }) => {
  let postData: any = null;

  // APIリクエストをキャプチャして、送信されたデータを確認
  await page.route('https://invite-project.onrender.com/submit', async (route, request) => {
    postData = await request.postDataJSON();
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ status: 'ok' }),
    });
  });

  await page.goto('/');

  // 1人目のゲスト情報を入力
  const guest1 = mockGuestFormData.guests[0];
  await page.getByLabel(labelData.name).fill(guest1.name);
  await page.getByLabel(labelData.kana).fill(guest1.kana);
  await page.getByLabel(labelData.postalCode).fill(guest1.postalCode);
  await page.getByLabel(labelData.address).fill(guest1.address);
  await page.getByLabel(labelData.buildingName).fill(guest1.buildingName);
  await page.getByLabel(labelData.phone).fill(guest1.phone);
  await page.getByLabel(labelData.email).fill(guest1.email);
  await page.getByLabel(labelData.allergies).fill(guest1.allergies);
  await page.getByLabel(labelData.message).fill(guest1.message);

  // 2人目のゲスト情報を追加
  await page.locator('[data-testid="add-guest-button"]').click();

  const guest2 = mockGuestFormData.guests[1];
  await page.locator('input[name="guests.1.name"]').fill(guest2.name);
  await page.locator('input[name="guests.1.kana"]').fill(guest2.kana);
  await page.locator('textarea[name="guests.1.allergies"]').fill(guest2.allergies);
  await page.locator('textarea[name="guests.1.message"]').fill(guest2.message);

  // 送信ボタンをクリック
  await page.getByRole('button', { name: '送信' }).click();

  // 完了ページへ遷移することを確認
  await expect(page).toHaveURL(/\/completed/);

  // APIへ送信されたデータを確認
  expect(postData.guests.length).toBe(2);
  expect(postData.guests[0].name).toBe(guest1.name);
  expect(postData.guests[1].name).toBe(guest2.name);
});