import { IFormType } from '@/types/FormData';

export const mockGuestFormData: IFormType = {
  guests: [
    {
      name: '山田 太郎',
      kana: 'やまだたろう',
      postalCode: '100-0001',
      address: '東京都千代田区千代田1-1',
      buildingName: '結婚式場ビル3F',
      phone: '09012345678',
      email: 'harada.g17@gmail.com',
      allergies: 'えび',
      message: '楽しみにしています！',
      attendingCeremony: true,
      attendingReception: true,
      useBus: true,
    },
    {
      name: '佐藤 花子',
      kana: 'さとうはなこ',
      postalCode: '150-0001',
      address: '東京都渋谷区渋谷1-1',
      buildingName: '渋谷会場ビル1F',
      phone: '08098765432',
      email: 'harada.g17@gmail.com',
      allergies: 'なし',
      message: 'お祝い申し上げます。',
      attendingCeremony: true,
      attendingReception: false,
      useBus: false,
    },
  ],
};
