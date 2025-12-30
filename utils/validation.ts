import { z } from 'zod';

// ========================
// スキーマ定義
// ========================

export const nameSchema = z.string()
  .min(1, '必須項目です')
  .max(50, '名前は50文字以内で入力してください');

export const kanaSchema = z.string()
  .min(1, '必須項目です')
  .regex(/^[\u3040-\u309F\u30A0-\u30FFー]+$/, '名前かなはひらがな又はカタカナ、スペース無しで入力してください')
  .max(50, '名前かなは50文字以内で入力してください');

export const postalCodeSchema = z.string()
  .regex(/^\d{7}$/, '郵便番号はXXXXXXXの形式で入力してください');

export const phoneNumberSchema = z.string()
  .regex(/^0\d{1,4}\d{1,4}\d{4}$/, '電話番号はXXXXXXXXXXXの形式で入力してください');

export const emailSchema = z.string()
  .max(50, 'メールアドレスは50文字以内で入力してください')
  .email('有効なメールアドレスを入力してください');

// 2人目以降：空文字または未定義を許容（入力があれば形式チェック）
const optionalPostalCodeSchema = z.string()
  .optional()
  .refine(val => !val || /^\d{7}$/.test(val), {
    message: '郵便番号はXXXXXXXの形式で入力してください',
  });

const optionalPhoneNumberSchema = z.string()
  .optional()
  .refine(val => !val || /^0\d{1,4}\d{1,4}\d{4}$/.test(val), {
    message: '電話番号はXXXXXXXXXXXの形式で入力してください',
  });

const optionalEmailSchema = z
  .string()
  .optional()
  .refine(
    val => !val || z.string().email().safeParse(val).success,
    { message: '有効なメールアドレスを入力してください' }
  );

const guestSchemaFirst = z.object({
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
  hasAllergies: z.boolean().optional(),
  message: z.string().optional(),
});

const guestSchemaOthers = z.object({
  name: nameSchema,
  kana: kanaSchema,
  postalCode: optionalPostalCodeSchema,
  phone: optionalPhoneNumberSchema,
  email: optionalEmailSchema,
  attendingCeremony: z.boolean(),
  attendingReception: z.boolean(),
  useBus: z.boolean(),
  address: z.string().optional(),
  buildingName: z.string().optional(),
  allergies: z.string().optional(),
  hasAllergies: z.boolean().optional(),
  message: z.string().optional(),
});

// ========================
// 動的バリデーション処理
// ========================

export const formSchema = z.object({
  guests: z.array(z.any()).min(1, '1人以上の登録が必要です'),
}).superRefine((data, ctx) => {
  data.guests.forEach((guest, index) => {
    const schema = index === 0 ? guestSchemaFirst : guestSchemaOthers;
    const result = schema.safeParse(guest);

    if (!result.success) {
      result.error.issues.forEach(error => {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: error.message,
          path: ['guests', index, ...error.path],
        });
      });
    }

    // アレルギー詳細必須チェック（共通）
    if (guest.hasAllergies && (!guest.allergies || guest.allergies.trim() === '')) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'アレルギーの詳細を入力してください',
        path: ['guests', index, 'allergies'],
      });
    }
  });
});

// ========================
// 型定義
// ========================

export type IFormType = z.infer<typeof formSchema>