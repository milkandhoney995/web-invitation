type WeddingEvent = {
  title: string;
  mainImg: string;
  bodyImg: string;
  mapUrl: string;
  titles: string[];
  infos: string[];
};

export const CEREMONY_INFO_TITIE: string[] = [
  '日　時', '受　付', '挙　式', '場　所', '住　所'
]
export const CEREMONY_INFO_ITEMS: string[] = [
  '2025年9月27日（土）', '14時30分', '15時00分', '国際基督教大学教会', '181-8585\n東京都三鷹市大沢 3-10-2\n\n'
]
export const PARTY_INFO_TITIE: string[] = [
  '日　時', '受　付', '披露宴', '場　所', '住　所', '　', '電話番号'
]
export const PARTY_INFO_ITEMS: string[] = [
  '2025年9月27日（土）', '16時30分', '17時00分', 'TERAKOYA', '184-0013\n東京都小金井市前原町3-33-32', '042-388-9555'
]

export const WEDDING_EVENTS: WeddingEvent[] = [
  {
    title: 'Ceremony',
    mainImg: '/images/church.avif',
    bodyImg: '/images/church_map.png',
    mapUrl: 'https://maps.app.goo.gl/Dp5Fxs2ZkpE51jcH6',
    titles: CEREMONY_INFO_TITIE,
    infos: CEREMONY_INFO_ITEMS
  },
  {
    title: 'Party',
    mainImg: '/images/terakoya.jpeg',
    bodyImg: '/images/terakoya_map.png',
    mapUrl: 'https://maps.app.goo.gl/HynmTCntUGfewvLx7',
    titles: PARTY_INFO_TITIE,
    infos: PARTY_INFO_ITEMS
  }
];