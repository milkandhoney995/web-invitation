import { useState } from 'react';
import { TextField, Button, Grid, Typography, Container, Radio, RadioGroup, FormControlLabel, TextareaAutosize } from '@mui/material';

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

// ゲストフォームの項目の型を定義
interface Guest {
  name: string;
  kana: string;
  attendingCeremony: boolean;
  attendingReception: boolean;
  postalCode: string;
  address: string;
  buildingName: string;
  phone: string;
  email: string;
  allergies: string;
  message: string;
}

const WeddingInvitationForm = () => {
  const [guests, setGuests] = useState<Guest[]>([
    {
      name: '',
      kana: '',
      attendingCeremony: false,
      attendingReception: false,
      postalCode: '',
      address: '',
      buildingName: '',
      phone: '',
      email: '',
      allergies: '',
      message: '',
    },
  ]);
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

  const handlePostalCodeChange = async (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('送信されたデータ:', guests);
  };

  return (
    <Container>
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

      <form onSubmit={handleSubmit}>
        {guests.map((guest, index) => (
          <div key={index}>
            <Typography variant="h6" gutterBottom>ゲスト {index + 1}</Typography>

            <Grid container spacing={2}>
              {/* 挙式への出席 */}
              <Grid size={12}>
                <RadioGroup row value={String(guest.attendingCeremony)} onChange={(e) => handleRadioChange(index, e)} name="attendingCeremony">
                  <FormControlLabel value="true" control={<Radio />} label="挙式に出席します" />
                  <FormControlLabel value="false" control={<Radio />} label="挙式に出席しません" />
                </RadioGroup>
              </Grid>

              {/* 披露宴への出席 */}
              <Grid size={12}>
                <RadioGroup row value={String(guest.attendingReception)} onChange={(e) => handleRadioChange(index, e)} name="attendingReception">
                  <FormControlLabel value="true" control={<Radio />} label="披露宴に出席します" />
                  <FormControlLabel value="false" control={<Radio />} label="披露宴に出席しません" />
                </RadioGroup>
              </Grid>

              {/* 名前 */}
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="お名前"
                  name="name"
                  value={guest.name}
                  onChange={(e) => handleGuestChange(index, e)}
                  required
                  disabled={index !== 0} // 最初のゲスト以外は名前を入力できないように
                />
              </Grid>

              {/* 名前かな */}
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="お名前（かな）"
                  name="kana"
                  value={guest.kana}
                  onChange={(e) => handleGuestChange(index, e)}
                  required
                  disabled={index !== 0} // 最初のゲスト以外はかなを入力できないように
                />
              </Grid>

              {/* アレルギー */}
              <Grid size={12}>
                <TextareaAutosize
                  minRows={3}
                  placeholder="アレルギー（あれば記入）"
                  name="allergies"
                  value={guest.allergies}
                  onChange={(e) => handleGuestChange(index, e)}
                  style={{ width: '100%' }}
                  disabled={index !== 0} // 最初のゲスト以外はアレルギーを入力できないように
                />
              </Grid>

              {/* 最初のゲスト以外には、以下の項目を表示しない */}
              {index === 0 && (
                <>
                  {/* 郵便番号 */}
                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                      fullWidth
                      label="郵便番号"
                      name="postalCode"
                      value={guest.postalCode}
                      onChange={(e) => handlePostalCodeChange(index, e)}
                      required
                    />
                  </Grid>

                  {/* 住所 */}
                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                      fullWidth
                      label="住所"
                      name="address"
                      value={guest.address}
                      onChange={(e) => handleGuestChange(index, e)}
                      required
                    />
                  </Grid>

                  {/* 建物名 */}
                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                      fullWidth
                      label="建物名"
                      name="buildingName"
                      value={guest.buildingName}
                      onChange={(e) => handleGuestChange(index, e)}
                    />
                  </Grid>

                  {/* 電話番号 */}
                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                      fullWidth
                      label="電話番号"
                      name="phone"
                      value={guest.phone}
                      onChange={(e) => handleGuestChange(index, e)}
                      required
                    />
                  </Grid>

                  {/* メールアドレス */}
                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                      fullWidth
                      label="メールアドレス"
                      name="email"
                      value={guest.email}
                      onChange={(e) => handleGuestChange(index, e)}
                      required
                    />
                  </Grid>

                  {/* メッセージ */}
                  <Grid size={12}>
                    <TextareaAutosize
                      minRows={3}
                      placeholder="メッセージ（自由にどうぞ）"
                      name="message"
                      value={guest.message}
                      onChange={(e) => handleGuestChange(index, e)}
                      style={{ width: '100%' }}
                    />
                  </Grid>
                </>
              )}
            </Grid>

            {index === 0 && (
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleAddGuest}
                style={{ marginTop: '20px' }}
              >
                2人目以降のゲスト情報を追加
              </Button>
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
      </form>
    </Container>
  );
}

export default WeddingInvitationForm;