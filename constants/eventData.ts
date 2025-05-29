type WeddingEvent = {
  title: string;
  mainImg: string;
  bodyImg: string;
  mapUrl: string;
  access: string;
};


export const WEDDING_EVENTS: WeddingEvent[] = [
  {
    title: '挙式',
    mainImg: '/images/church.avif',
    bodyImg: '/images/church_map.png',
    mapUrl: 'https://maps.app.goo.gl/Dp5Fxs2ZkpE51jcH6',
    access: `
    日時　　　　2025年9月27日（土）
    \n受付　　　　14時30分
    \n挙式　　　　15時00分
    \n場所　　　　国際基督教大学教会
    \n住所　　　　〒181-8585 東京都三鷹市大沢 3-10-2
    \n電話番号　　042-388-9555`
  },
  {
    title: '披露宴',
    mainImg: '/images/terakoya.jpeg',
    bodyImg: '/images/terakoya_map.png',
    mapUrl: 'https://maps.app.goo.gl/HynmTCntUGfewvLx7',
    access: `
    日時　　　　2025年9月27日（土）
    \n受付　　　　16時30分
    \n挙式　　　　17時00分
    \n場所　　　　TERAKOYA
    \n住所　　　　〒184-0013 東京都小金井市前原町3-33-32
    \n電話番号　　042-388-9555`
  }
];