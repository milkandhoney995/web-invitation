import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { css } from "@emotion/react"
import theme from '@/style/theme';
import { Button, Box, Typography, Container, Grid, IconButton } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RadioGroupController from './RadioGroupController';
import TextFieldController from './TextFieldController';
import Textarea from './Textarea';
import { Guest } from '@/types/Guest';
import { IFormInput } from '@/types/FormData';
import axios from "axios";

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
    alignItems: "center"
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
    fontSize: '1rem',
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
  const [guests, setGuests] = useState<Guest[]>([
    {
      name: '',
      kana: '',
      attendingCeremony: true,
      attendingReception: true,
      useBus: true,
      postalCode: '',
      address: '',
      buildingName: '',
      phone: '',
      email: '',
      allergies: '',
      message: '',
    },
  ]);
  const {
    handleSubmit,
    control,
    formState: { errors },
    trigger, // triggerメソッドを使用
  } = useForm<IFormInput>();

  // フォームの送信時に呼ばれる関数
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log('フォーム送信', data);

    // try {
    //   await axios.post("https://invite-project.onrender.com/submit", guests);
    // } catch (error) {
    //   console.error("送信エラー", error);
    // }
  };

  // バリデーションをonBlur時にも実行
  const handleBlur = async (fieldName: keyof IFormInput) => {
    await trigger(fieldName);
  };

  const handleGuestChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const newGuests = [...guests];
    newGuests[index] = {
      ...newGuests[index],
      [name]: value,
    };
    setGuests(newGuests);

  };

  const handleRadioChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newGuests = [...guests];
    newGuests[index] = {
      ...newGuests[index],
      [name]: value === 'true',
    };
    setGuests(newGuests);
  };

  const handleAddGuest = () => {
    const newGuest = {
      ...guests[0], // 最初のゲストの情報をコピー
      name: '',
      kana: '',
      allergies: '',
      message: '',
    };
    setGuests([...guests, newGuest]);
  };

  const handlePostalCodeChange = async (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const postalCode = e.target.value;
    const address = await fetchAddressFromPostalCode(postalCode);
    const newGuests = [...guests];
    newGuests[index] = {
      ...newGuests[index],
      postalCode,
      address,
    };
    setGuests(newGuests);
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
      <Typography variant="h6" gutterBottom>
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

      <Box
        component="form"
        sx={style.form}
        onSubmit={handleSubmit(onSubmit)}
      >
        {guests.map((guest, index) => (
          <div key={index}>
            { index !== 0 &&
              <Typography variant="h6" gutterBottom>{index + 1}人目</Typography>
            }

            <Grid
              container
              spacing={2}
              sx={style.body}
            >
              {/* 最初のゲスト以外には、以下の項目を表示しない */}
              { index === 0 && (
                <>
                  {/* 挙式への出席 */}
                  <RadioGroupController
                    legend='挙式への出席'
                    name="attendingCeremony"
                    control={control}
                    handleBlur={handleBlur}
                    onChange={(e) => handleRadioChange(index, e)}
                    items={[ { value: "true", label: "出席"}, { value: "false", label: "欠席"} ]}
                  />

                  {/* 披露宴への出席 */}
                  <RadioGroupController
                    legend='披露宴への出席'
                    name="attendingReception"
                    control={control}
                    handleBlur={handleBlur}
                    onChange={(e) => handleRadioChange(index, e)}
                    items={[ { value: "true", label: "出席"}, { value: "false", label: "欠席"} ]}
                  />

                  {/* 披露宴会場へのバス利用 */}
                  <RadioGroupController
                    legend='披露宴会場へのバス利用'
                    handleBlur={handleBlur}
                    onChange={(e) => handleRadioChange(index, e)}
                    name="useBus"
                    control={control}
                    items={[ { value: "true", label: "利用する"}, { value: "false", label: "利用しない"} ]}
                  />
                </>
              )}

              {/* お名前 */}
              <TextFieldController
                label="お名前"
                name="name"
                control={control}
                onChange={(e) => handleGuestChange(index, e)}
                handleBlur={handleBlur}
                errors={errors}
              />
              {/* かな */}
              <TextFieldController
                label="かな"
                name="kana"
                control={control}
                onChange={(e) => handleGuestChange(index, e)}
                handleBlur={handleBlur}
                errors={errors}
              />

              {/* 最初のゲスト以外には、以下の項目を表示しない */}
              {index === 0 && (
                <>
                  {/* 郵便番号 */}
                  <TextFieldController
                    label="郵便番号"
                    name="postalCode"
                    control={control}
                    onChange={(e) => handlePostalCodeChange(index, e)}
                    handleBlur={handleBlur}
                    errors={errors}
                  />

                {/* 住所 */}
                <TextFieldController
                  label="住所"
                  name="address"
                  control={control}
                  onChange={(e) => handleGuestChange(index, e)}
                  handleBlur={handleBlur}
                  errors={errors}
                />
                {/* 建物名 */}
                <TextFieldController
                  label="建物名"
                  name="buildingName"
                  control={control}
                  onChange={(e) => handleGuestChange(index, e)}
                  handleBlur={handleBlur}
                  errors={errors}
                />

                {/* 電話番号 */}
                <TextFieldController
                  label="電話番号"
                  name="phone"
                  control={control}
                  onChange={(e) => handleGuestChange(index, e)}
                  handleBlur={handleBlur}
                  errors={errors}
                />

                  {/* メールアドレス */}
                  <TextFieldController
                    label="メールアドレス"
                    name="email"
                    control={control}
                    onChange={(e) => handleGuestChange(index, e)}
                    handleBlur={handleBlur}
                    errors={errors}
                  />
              </>
            )}

            {/* アレルギー */}
            <Textarea
              control={control}
              label="アレルギー（あれば記入）"
              name="allergies"
              value={guest.allergies}
              onChange={(e) => handleGuestChange(index, e)}
            />

            {/* メッセージ */}
            <Textarea
              control={control}
              label="メッセージ（自由にどうぞ）"
              name="message"
              value={guest.message}
              onChange={(e) => handleGuestChange(index, e)}
            />
          </Grid>

          {index === 0 && (
            <Grid container spacing={12} sx={style.iconButton}>
              <IconButton
                color="primary"
                onClick={handleAddGuest}
              >
                <AddCircleOutlineIcon />
              </IconButton>
            </Grid>
          )}
          </div>
        ))}

        <Grid container spacing={2} style={{ marginTop: '20px' }}>
          <Grid size={12}>
            <Button variant="contained" color="primary" type="submit">
              送信
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default WeddingInvitationForm;