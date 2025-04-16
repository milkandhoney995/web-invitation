'use client';

import { useForm, useFieldArray, FieldErrors } from 'react-hook-form';
import { css } from "@emotion/react"
import theme from '@/style/theme';
import RadioGroupController from '@/app/components/RadioGroupController';
import TextFieldController from '@/app/components/TextFieldController';
import Textarea from '@/app/components/Textarea';
import { Button, Box, Typography, Container, Grid, IconButton } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { IFormInput  } from '@/types/FormData';
import { zodResolver } from '@hookform/resolvers/zod';
import { formSchema, IFormType } from '@/utils/validation';
import { useRouter } from 'next/navigation';
import { DynamicGuestField } from '@/types/DynamicGuestField';
import { useEffect, useState } from 'react';
import axios from 'axios'

const style = {
  container: css({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    background: `${theme.validTheme.formBackground}`,
    borderRadius: `${theme.validTheme.formRadius}`,
    "& .MuiTypography-root": {
      textAlign: "center",
    },
  }),
  form: css({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    "& div:not(:last-child)": {
      width: "100%"
    }
  }),
  title: css({
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    "& .MuiButtonBase-root": {
      padding: "0"
    }
  }),
  body: css({
    display: "flex",
    flexDirection: "column",
    marginBottom: "2rem"
  }),
  iconButton: css({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "2rem"
  }),
  button: css({
    color: theme.validTheme.buttonFontColor
  }),
  textareaAutosize: css({
    fontSize: `${theme.validTheme.num16}`,
    lineHeight: '1.5',
    padding: '12px 14px',
    borderRadius: '4px',
    border: '1px solid #ced4da',
    width: '100%',
    transition: 'border-color 0.3s ease',
    '&:focus': {
      borderColor: `${theme.palette.primary.main}`,
    },
  })
}

// 郵便番号検索用の外部API（例：郵便番号検索API）を利用する場合の型（APIの詳細に応じて変更）
const fetchAddressFromPostalCode = async (postalCode: string) => {
  try {
    // 例：郵便番号から住所を取得するAPI
    const response = await fetch(`https://api.zipaddress.net/?zipcode=${postalCode}`);
    const data = await response.json();
    if (data.code === 200) {
      return data.data.address;
    }
    return '';
  } catch (error) {
    console.error('住所の取得に失敗しました', error);
    return '';
  }
};

const WeddingInvitationForm = () => {
  const router = useRouter()
  const [serverError, setServerError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const defaultValues: IFormType = {
    guests: [
      {
        attendingCeremony: true,
        attendingReception: true,
        useBus: true,
        name: '',
        kana: '',
        postalCode: '',
        address: '',
        buildingName: '',
        phone: '',
        email: '',
        allergies: '',
        message: '',
      },
    ],
  };

  const {
    handleSubmit,
    control,
    trigger,
    setValue
  } = useForm<IFormType>({
    mode: 'onBlur',
    defaultValues,
    resolver: zodResolver(formSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "guests",
  });

  useEffect(() => {
    if (fields.length > 1) {
      // 1人目の情報を基に、2人目以降のフィールドに初期値を設定する
      fields.slice(1).forEach((field, index) => {
        setValue(`guests.${index + 1}.postalCode`, fields[0].postalCode);
        setValue(`guests.${index + 1}.address`, fields[0].address);
        setValue(`guests.${index + 1}.phone`, fields[0].phone);
        setValue(`guests.${index + 1}.email`, fields[0].email);
      });
    }
  }, [fields])

  // フォームの送信時に呼ばれる関数
  const onSubmit = async (data: IFormType) => {
    setLoading(true);
    setServerError(null);
    console.log('フォーム送信', data);

    try {
      await axios.post("https://invite-project.onrender.com/submit", data);
      router.push('/completed');
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error("送信エラー", error);
        const message =
          error.response?.data?.message || // サーバーからのメッセージ
          error.message ||                 // 通常のAxiosエラーメッセージ
          "送信中にサーバーエラーが発生しました。しばらくしてからもう一度お試しください。";
        setServerError(message);
      } else if (error instanceof Error) {
        console.error("その他のエラー", error.message);
        setServerError(error.message);
      } else {
        console.error("予期せぬエラー", error);
        setServerError("予期せぬエラーが発生しました。");
      }
    } finally {
      setLoading(false)
    }
  };

  const onInvalid = (errors: FieldErrors<IFormType>) => {
    console.log('バリデーションエラー', errors);
  };

  const handleBlur = (fieldName: keyof IFormInput, index: number) => {
    trigger(`guests.${index}.${fieldName}`)
  };

  const handleGuestChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const fieldName = `guests[${index}].${name}` as DynamicGuestField
    setValue(fieldName, value);
  };

  const handleRadioChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const fieldName = `guests[${index}].${name}` as DynamicGuestField;
    const booleanValue = value === 'true';
    setValue(fieldName, booleanValue);
  };

  const handleAddGuest = () => {
    // 1人目のデータを取得
    const first = fields[0] ?? {
      name: '',
      kana: '',
      postalCode: '',
      phone: '',
      email: '',
      address: '',
      buildingName: '',
      attendingCeremony: true,
      attendingReception: true,
      useBus: true,
    };

    // 新しいゲストを追加
    append({
      name: '',
      kana: '',
      allergies: first.allergies,
      message: first.message,
      postalCode: first.postalCode || '',
      phone: first.phone || '',
      email: first.email || '',
      address: first.address || '',
      buildingName: first.buildingName || '',
      attendingCeremony: first.attendingCeremony,
      attendingReception: first.attendingReception,
      useBus: first.useBus,
    });
  };

  const handleRemoveGuest = (index: number) => {
    remove(index)
  };

  const handlePostalCodeChange = async (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const postalCode = e.target.value;
    const address = await fetchAddressFromPostalCode(postalCode);
    setValue(`guests.${index}.postalCode`, postalCode);
    setValue(`guests.${index}.address`, address);
  };

  return (
    <Container
      sx={[
        style.container,
        {
          paddingLeft: { xs: `${theme.validTheme.num16}`, sm: `${theme.validTheme.num80}` },
          paddingRight: { xs: `${theme.validTheme.num16}`, sm: `${theme.validTheme.num80}` }
        }
      ]}
    >
      <Typography variant="h6" sx={{ marginBottom: `${theme.validTheme.num48}` }}>
        郵送でのご案内状に代わり、当招待状をお送りしております<br />
        <br />
        お手数ではございますが、出席情報のご登録をお願い申し上げます<br />
        <br />
        また当日のお食事のご用意にあたり<br />
        アレルギー等がある方は、アレルギー欄にご記入くださいますようお願い申し上げます<br />
        <br />
        2025.8.27までに<br />
        ご一報賜りますようお願い申し上げます
      </Typography>

      {serverError && (
        <Typography color="error" sx={{ marginBottom: '2rem', textAlign: 'center' }}>
          {serverError}
        </Typography>
      )}

      <Box
        component="form"
        sx={style.form}
        onSubmit={handleSubmit(onSubmit, onInvalid)}
      >
        {fields.map((field, index) => (
          <div key={field.id}>
            { index !== 0 &&
              (
                <Grid sx={style.title} container>
                  <Typography variant="h6" sx={{ flex: 1 }}>{index + 1}人目</Typography>
                  <IconButton
                    color="primary"
                    onClick={() => handleRemoveGuest(index)}
                    sx={{ marginLeft: 'auto' }}
                  >
                    <DeleteOutlineOutlinedIcon />
                  </IconButton>
                </Grid>
              )
            }

            <Grid
              container
              sx={style.body}
            >
              { index === 0 && (
                <>
                  {/* 挙式への出席 */}
                  <RadioGroupController
                    legend='挙式への出席'
                    name={`guests.${index}.attendingCeremony` as DynamicGuestField}
                    control={control}
                    handleBlur={(e) => handleBlur(e, index)}
                    onChange={(e) => handleRadioChange(index, e)}
                    items={[ { value: "true", label: "出席"}, { value: "false", label: "欠席"} ]}
                  />

                  {/* 披露宴への出席 */}
                  <RadioGroupController
                    legend='披露宴への出席'
                    name={`guests.${index}.attendingReception` as DynamicGuestField}
                    control={control}
                    handleBlur={(e) => handleBlur(e, index)}
                    onChange={(e) => handleRadioChange(index, e)}
                    items={[ { value: "true", label: "出席"}, { value: "false", label: "欠席"} ]}
                  />

                  {/* 披露宴会場へのバス利用 */}
                  <RadioGroupController
                    legend='披露宴会場へのバス利用'
                    handleBlur={(e) => handleBlur(e, index)}
                    onChange={(e) => handleRadioChange(index, e)}
                    name={`guests.${index}.useBus` as DynamicGuestField}
                    control={control}
                    items={[ { value: "true", label: "利用する"}, { value: "false", label: "利用しない"} ]}
                  />
                </>
              )}

              {/* お名前 */}
              <TextFieldController
                label="お名前"
                name={`guests.${index}.name` as DynamicGuestField}
                control={control}
                onChange={(e) => handleGuestChange(index, e)}
                handleBlur={(e) => handleBlur(e, index)}
              />
              {/* かな */}
              <TextFieldController
                label="かな"
                name={`guests.${index}.kana` as DynamicGuestField}
                control={control}
                onChange={(e) => handleGuestChange(index, e)}
                handleBlur={(e) => handleBlur(e, index)}
              />

              {index === 0 && (
                <>
                  {/* 郵便番号 */}
                  <TextFieldController
                    label="郵便番号"
                    name={`guests.${index}.postalCode` as DynamicGuestField}
                    control={control}
                    onChange={(e) => handlePostalCodeChange(index, e)}
                    handleBlur={(e) => handleBlur(e, index)}
                  />

                  {/* 住所 */}
                  <TextFieldController
                    label="住所"
                    name={`guests.${index}.address` as DynamicGuestField}
                    control={control}
                    onChange={(e) => handleGuestChange(index, e)}
                    handleBlur={(e) => handleBlur(e, index)}
                  />
                  {/* 建物名 */}
                  <TextFieldController
                    label="建物名"
                    name={`guests.${index}.buildingName` as DynamicGuestField}
                    control={control}
                    onChange={(e) => handleGuestChange(index, e)}
                    handleBlur={(e) => handleBlur(e, index)}
                  />

                  {/* 電話番号 */}
                  <TextFieldController
                    label="電話番号"
                    name={`guests.${index}.phone` as DynamicGuestField}
                    control={control}
                    onChange={(e) => handleGuestChange(index, e)}
                    handleBlur={(e) => handleBlur(e, index)}
                  />

                  {/* メールアドレス */}
                  <TextFieldController
                    label="メールアドレス"
                    name={`guests.${index}.email` as DynamicGuestField}
                    control={control}
                    onChange={(e) => handleGuestChange(index, e)}
                    handleBlur={(e) => handleBlur(e, index)}
                  />
                </>
              )}

              {/* アレルギー */}
              <Textarea
                control={control}
                label="アレルギー（あれば記入）"
                name={`guests.${index}.allergies` as DynamicGuestField}
                onChange={(e) => handleGuestChange(index, e)}
              />

              {/* メッセージ */}
              <Textarea
                control={control}
                label="メッセージ（自由にどうぞ）"
                name={`guests.${index}.message` as DynamicGuestField}
                onChange={(e) => handleGuestChange(index, e)}
              />
            </Grid>
          </div>
        ))}

        <Grid sx={style.form} container>
          <Grid container spacing={12} sx={style.iconButton}>
            <IconButton
              color="primary"
              onClick={handleAddGuest}
            >
              <AddCircleOutlineIcon />
            </IconButton>
          </Grid>
          <Button variant="contained" color="primary" type="submit" disabled={loading}>
            {loading ? '送信中...' : '送信'}
          </Button>
        </Grid>
      </Box>
    </Container>
  )
}

export default WeddingInvitationForm;