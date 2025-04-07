// utils/validation.ts
import { z } from 'zod';

// 名前のバリデーション（漢字、ひらがな、カタカナ）
export const nameSchema = z.string()
  .min(1, '名前は必須です')
  .max(50, '名前は50文字以内で入力してください');

// 名前かなのバリデーション（ひらがな、カタカナのみ）
export const kanaSchema = z.string()
  .regex(/^[\u3040-\u309F\u30A0-\u30FFー]+$/, '名前かなはひらがなかカタカナで入力してください')
  .min(1, '名前かなは必須です')
  .max(50, '名前かなは50文字以内で入力してください');

// 郵便番号のバリデーション（日本の郵便番号形式）
export const postalCodeSchema = z.string()
  .regex(/^\d{3}-\d{4}$/, '郵便番号はXXX-XXXXの形式で入力してください');

// 電話番号のバリデーション（日本の電話番号形式）
export const phoneNumberSchema = z.string()
  .regex(/^0\d{1,4}-\d{1,4}-\d{4}$/, '電話番号はXXX-XXXX-XXXXの形式で入力してください');

// メールアドレスのバリデーション
export const emailSchema = z.string()
  .email('有効なメールアドレスを入力してください')
  .min(1, 'メールアドレスは必須です')
  .max(50, 'メールアドレスは50文字以内で入力してください');

// ゲスト情報（配列）のバリデーション
export const guestSchema = z.object({
  name: nameSchema,
  kana: kanaSchema,
  postalCode: postalCodeSchema,
  phone: phoneNumberSchema,
  email: emailSchema,
  // バリデーションなしのフィールド
  attendingCeremony: z.boolean(),
  attendingReception: z.boolean(),
  useBus: z.boolean(),
  address: z.string().optional(),
  buildingName: z.string().optional(),
  allergies: z.string().optional(),
  message: z.string().optional(),
});

// ゲストリスト全体の型
export const formSchema = z.object({
  guests: z.array(guestSchema), // ゲスト配列
});