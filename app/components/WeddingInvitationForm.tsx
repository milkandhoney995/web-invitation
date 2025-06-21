'use client';

import { useForm, useFieldArray, FieldErrors, useWatch } from 'react-hook-form';
import { css } from "@emotion/react"
import theme from '@/style/theme';
import RadioGroupController from '@/app/components/RadioGroupController';
import TextFieldController from '@/app/components/TextFieldController';
import Textarea from '@/app/components/Textarea';
import FullScreenLoader from '@/app/components/FullScreenLoader';
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
import { RSVP_MESSAGE } from '@/constants/rsvpData';
import { labelData } from '@/constants/labelData';

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
    "& h6": {
      whiteSpace: 'pre-line'
    }
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
        hasAllergies: false,
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

  const guestsData = useWatch({
    control,
    name: "guests",
    defaultValue: defaultValues.guests,
  });

  useEffect(() => {
    if (fields.length > 1) {
      // 1人目の情報を基に、2人目以降のフィールドに初期値を設定する
      fields.slice(1).forEach((field, index) => {
        setValue(`guests.${index + 1}.postalCode`, fields[0].postalCode, { shouldValidate: true, shouldDirty: true });
        setValue(`guests.${index + 1}.address`, fields[0].address, { shouldValidate: true, shouldDirty: true });
        setValue(`guests.${index + 1}.phone`, fields[0].phone, { shouldValidate: true, shouldDirty: true });
        setValue(`guests.${index + 1}.email`, fields[0].email, { shouldValidate: true, shouldDirty: true });
      });
    }
  }, [fields, setValue])

  // フォームの送信時に呼ばれる関数
  const onSubmit = async (data: IFormType) => {
    setLoading(true);
    setServerError(null);
    console.log('フォーム送信', data);

    // hasAllergies を除外した guests データを生成
    const sanitizedGuests = data.guests.map((guest) => {
      const rest = { ...guest };
      delete rest.hasAllergies;
      return rest;
    });

    // APIに送信するデータを整形
    const payload = {
      guests: sanitizedGuests,
    };

    try {
      await axios.post("https://invite-project.onrender.com/submit", payload);
      router.push('/completed');
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error("送信エラー", error);
        const message =
          error.response?.data?.message ||
          error.message ||
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
      setLoading(false);
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
    setValue(fieldName, value, { shouldValidate: true, shouldDirty: true });
  };

  const handleRadioChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const fieldName = `guests[${index}].${name}` as DynamicGuestField;
    const booleanValue = value === 'true';
    setValue(fieldName, booleanValue);
  };

  const handleAddGuest = () => {
    // 1人目のデータを取得し、新しいゲストを追加
    append({
      ...defaultValues.guests[0]
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
        {RSVP_MESSAGE}
      </Typography>

      {serverError && (
        <Typography color="error" sx={{ marginBottom: '2rem', textAlign: 'center' }}>
          {serverError}
        </Typography>
      )}
      {loading && <FullScreenLoader />}
      <Box
        component="form"
        sx={style.form}
        onSubmit={handleSubmit(onSubmit, onInvalid)}
      >
        {fields.map((field, index) => {
          const hasAllergies = guestsData?.[index]?.hasAllergies;

          return (
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
                      legend={labelData.attendingCeremony}
                      name={`guests.${index}.attendingCeremony` as DynamicGuestField}
                      control={control}
                      handleBlur={(e) => handleBlur(e, index)}
                      onChange={(e) => handleRadioChange(index, e)}
                      items={labelData.attendingCeremonyList}
                    />

                    {/* 披露宴への出席 */}
                    <RadioGroupController
                      legend={labelData.attendingReception}
                      name={`guests.${index}.attendingReception` as DynamicGuestField}
                      control={control}
                      handleBlur={(e) => handleBlur(e, index)}
                      onChange={(e) => handleRadioChange(index, e)}
                      items={labelData.attendingReceptionList}
                    />

                    {/* 披露宴会場へのバス利用 */}
                    <RadioGroupController
                      legend={labelData.useBus}
                      handleBlur={(e) => handleBlur(e, index)}
                      onChange={(e) => handleRadioChange(index, e)}
                      name={`guests.${index}.useBus` as DynamicGuestField}
                      control={control}
                      items={labelData.useBusList}
                    />
                  </>
                )}

                {/* お名前 */}
                <TextFieldController
                  label={labelData.name}
                  name={`guests.${index}.name` as DynamicGuestField}
                  control={control}
                  onChange={(e) => handleGuestChange(index, e)}
                  handleBlur={(e) => handleBlur(e, index)}
                />
                {/* かな */}
                <TextFieldController
                  label={labelData.kana}
                  name={`guests.${index}.kana` as DynamicGuestField}
                  control={control}
                  onChange={(e) => handleGuestChange(index, e)}
                  handleBlur={(e) => handleBlur(e, index)}
                />

                {index === 0 && (
                  <>
                    {/* 郵便番号 */}
                    <TextFieldController
                      label={labelData.postalCode}
                      name={`guests.${index}.postalCode` as DynamicGuestField}
                      control={control}
                      onChange={(e) => handlePostalCodeChange(index, e)}
                      handleBlur={(e) => handleBlur(e, index)}
                    />

                    {/* 住所 */}
                    <TextFieldController
                      label={labelData.address}
                      name={`guests.${index}.address` as DynamicGuestField}
                      control={control}
                      onChange={(e) => handleGuestChange(index, e)}
                      handleBlur={(e) => handleBlur(e, index)}
                    />
                    {/* 建物名 */}
                    <TextFieldController
                      label={labelData.buildingName}
                      name={`guests.${index}.buildingName` as DynamicGuestField}
                      control={control}
                      onChange={(e) => handleGuestChange(index, e)}
                      handleBlur={(e) => handleBlur(e, index)}
                    />

                    {/* 電話番号 */}
                    <TextFieldController
                      label={labelData.phone}
                      name={`guests.${index}.phone` as DynamicGuestField}
                      control={control}
                      onChange={(e) => handleGuestChange(index, e)}
                      handleBlur={(e) => handleBlur(e, index)}
                    />

                    {/* メールアドレス */}
                    <TextFieldController
                      label={labelData.email}
                      name={`guests.${index}.email` as DynamicGuestField}
                      control={control}
                      onChange={(e) => handleGuestChange(index, e)}
                      handleBlur={(e) => handleBlur(e, index)}
                    />
                  </>
                )}

                {/* アレルギー */}
                <RadioGroupController
                  legend={labelData.hasAllergies}
                  name={`guests.${index}.hasAllergies` as DynamicGuestField}
                  control={control}
                  handleBlur={(e) => handleBlur(e, index)}
                  onChange={(e) => handleRadioChange(index, e)}
                  items={labelData.allergiesList}
                />
                { hasAllergies && (
                  <>
                    <Textarea
                      control={control}
                      label={labelData.allergies}
                      name={`guests.${index}.allergies` as DynamicGuestField}
                      onChange={(e) => handleGuestChange(index, e)}
                    />
                  </>
                )}

                {/* メッセージ */}
                <Textarea
                  control={control}
                  label={labelData.message}
                  name={`guests.${index}.message` as DynamicGuestField}
                  onChange={(e) => handleGuestChange(index, e)}
                />
              </Grid>
            </div>
          )
        })}

        <Grid sx={style.form} container>
          <Grid container spacing={12} sx={style.iconButton}>
            <IconButton
              color="primary"
              onClick={handleAddGuest}
              data-testid="add-guest-button"
            >
              <AddCircleOutlineIcon />
            </IconButton>
          </Grid>
          <Button variant="contained" color="primary" size='large' type="submit" disabled={loading}>
            {labelData.sendData}
          </Button>
        </Grid>
      </Box>
    </Container>
  )
}

export default WeddingInvitationForm;