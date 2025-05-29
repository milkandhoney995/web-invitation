type WeddingEvent = {
  title: string;
  place: string;
  date: string;
  mainImg: string;
  bodyImg: string;
  mapUrl: string;
  access: string;
};


export const WEDDING_EVENTS: WeddingEvent[] = [
  {
    title: '挙式',
    place: '国際基督教大学教会',
    date: '日時　　　2025年9月27日（土）\n受付　　　14時30分\n挙式　　　15時00分',
    mainImg: '/images/church.avif',
    bodyImg: '/images/church_map.png',
    mapUrl: 'https://maps.app.goo.gl/Dp5Fxs2ZkpE51jcH6',
    access: `
    〒181-8585 東京都三鷹市大沢 3-10-2\n
    ＊JR中央線三鷹駅からお越しの場合\n
    南口の5番乗り場から小田急バス「（鷹51）国際基督教大学」行終点下車\n
    ＊JR中央線武蔵境駅からお越しの場合\n
    南口の2番乗り場から小田急バス「（境93）国際基督教大学」行終点下車\n
    ＊調布駅からお越しの場合\n
    北口の14番乗り場から小田急バス「（境91）武蔵境駅南口」行\n
    または「（ 鷹51）三鷹駅（西野御塔坂下経由）」行乗車「富士重工前」下車 徒歩10分`
  },
  {
    title: '披露宴',
    place: 'TERAKOYA',
    date: '日時　　　2025年9月27日（土）\n受付　　　16時30分\n披露宴　　17時00分',
    mainImg: '/images/terakoya.jpeg',
    bodyImg: '/images/terakoya_map.png',
    mapUrl: 'https://maps.app.goo.gl/HynmTCntUGfewvLx7',
    access: `
    〒184-0013 東京都小金井市前原町3-33-32\n
    電話番号: 042-388-9555\n
    挙式後、国際基督教大学教会より送迎バスをご用意しております。\n
    ご利用の方は出欠の回答画面にて、お知らせくださいますようお願い申し上げます。\n`
  }
];