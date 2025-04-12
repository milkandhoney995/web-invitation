import { z } from 'zod';

// ゲスト情報のバリデーションスキーマ
export const nameSchema = z.string()
  .min(1, '必須項目です')
  .max(50, '名前は50文字以内で入力してください');

export const kanaSchema = z.string()
  .regex(/^[\u3040-\u309F\u30A0-\u30FFー]+$/, '名前かなはひらがなかカタカナで入力してください')
  .min(1, '必須項目です')
  .max(50, '名前かなは50文字以内で入力してください');

export const postalCodeSchema = z.string()
  .min(1, '必須項目です')
  .regex(/^\d{3}-\d{4}$/, '郵便番号はXXX-XXXXの形式で入力してください');

export const phoneNumberSchema = z.string()
  .min(1, '必須項目です')
  .regex(/^0\d{1,4}\d{1,4}\d{4}$/, '電話番号はXXXXXXXXXXXの形式で入力してください');

export const emailSchema = z.string()
  .min(1, '必須項目です')
  .max(50, 'メールアドレスは50文字以内で入力してください')
  .email('有効なメールアドレスを入力してください');

// ゲスト情報（配列）のバリデーション
export const guestSchema = z.object({
  name: nameSchema,
  kana: kanaSchema,
  postalCode: postalCodeSchema,
  phone: phoneNumberSchema,
  email: emailSchema,
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
  guests: z.array(guestSchema),
});

// formSchemaの型を型定義としてエクスポート
export type IFormType = z.infer<typeof formSchema>