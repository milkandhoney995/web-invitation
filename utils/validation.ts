import { z } from 'zod';

// 基本スキーマ（全員共通）
export const nameSchema = z.string()
  .min(1, '必須項目です')
  .max(50, '名前は50文字以内で入力してください');

export const kanaSchema = z.string()
  .min(1, '必須項目です')
  .regex(/^[\u3040-\u309F\u30A0-\u30FFー]+$/, '名前かなはひらがなかカタカナで入力してください')
  .max(50, '名前かなは50文字以内で入力してください');

export const postalCodeSchema = z.string()
  .regex(/^\d{3}-\d{4}$/, '郵便番号はXXX-XXXXの形式で入力してください');

export const phoneNumberSchema = z.string()
  .regex(/^0\d{1,4}\d{1,4}\d{4}$/, '電話番号はXXXXXXXXXXXの形式で入力してください');

export const emailSchema = z.string()
  .max(50, 'メールアドレスは50文字以内で入力してください')
  .email('有効なメールアドレスを入力してください');

// すべてのゲストに適用されるベーススキーマ（必須にしない）
const guestSchemaBase = z.object({
  name: nameSchema,
  kana: kanaSchema,
  postalCode: postalCodeSchema.optional(),
  phone: phoneNumberSchema.optional(),
  email: emailSchema.optional(),
  attendingCeremony: z.boolean(),
  attendingReception: z.boolean(),
  useBus: z.boolean(),
  address: z.string().optional(),
  buildingName: z.string().optional(),
  allergies: z.string().optional(),
  hasAllergies: z.boolean().optional(),
  message: z.string().optional(),
});

export const formSchema = z.object({
  guests: z.array(guestSchemaBase).min(1, "1人以上の登録が必要です")
}).superRefine((data, ctx) => {
  const first = data.guests[0];

  if (!first.email || first.email.trim() === '') {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: '必須項目です',
      path: ['guests', 0, 'email'],
    });
  }

  if (!first.phone || first.phone.trim() === '') {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: '必須項目です',
      path: ['guests', 0, 'phone'],
    });
  }

  if (!first.postalCode || first.postalCode.trim() === '') {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: '必須項目です',
      path: ['guests', 0, 'postalCode'],
    });
  }

  // 全ゲストのhasAllergiesがtrueならallergies必須
  data.guests.forEach((guest, index) => {
    // hasAllergiesが未定義またはnullの場合は型エラーになるためここでチェック不要
    if (guest.hasAllergies) {
      if (!guest.allergies || guest.allergies.trim() === '') {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'アレルギーの詳細を入力してください',
          path: ['guests', index, 'allergies'],
        });
      }
    }
  });
});

export type IFormType = z.infer<typeof formSchema>