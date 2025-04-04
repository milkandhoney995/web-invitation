import { createTheme, responsiveFontSizes } from "@mui/material"
import { Josefin_Sans } from 'next/font/google';
import { Pinyon_Script } from 'next/font/google';
import { Forum } from 'next/font/google';

// Google Fonts (Parisienne) をインポート
const enFont = Josefin_Sans({
  weight: '400', // 使用するウェイトを指定
  subsets: ['latin'],     // 使用するサブセット（必要に応じて指定）
});
const forum = Forum({
  weight: '400', // 使用するウェイトを指定
  subsets: ['latin'],     // 使用するサブセット（必要に応じて指定）
});

const enHeaderTitleFont = Pinyon_Script({
  weight: '400',
  subsets: ['latin'],
})

const themeStyle: { [ key: string ]: any } = {
  default: {
    // fonts
    fontColorMain: "#1e1e1e",

    fontFamilyJa: ` "游明朝体", "Yu Mincho", YuMincho, "ヒラギノ明朝 Pro", "Hiragino Mincho Pro", "MS P明朝", "MS PMincho", serif;`,
    fontFamilyEn: enHeaderTitleFont.style.fontFamily,

    // title
    heroSubTitleFont: forum.style.fontFamily,

    // header
    navigationFont: forum.style.fontFamily,

    // card
    cardSubtitleColor: "#757575",
    // common
    backgroundColor: "#E8DDD4",
    backgroundColor1: "#FFFBF7",


  }
}

const theme = createTheme({
  validTheme: themeStyle["default"],
  typography: {
    fontFamily: `${themeStyle.default.fontFamilyJa}, ${enFont.style.fontFamily}, sans-serif`, // フォントファミリーの設定
    h1: {
      fontFamily: enHeaderTitleFont.style.fontFamily, // ヘッダー用フォント
    },
    h2: {
      fontFamily: forum.style.fontFamily, // サブタイトルやナビゲーション用フォント
    },
    body1: {
      fontFamily: `${themeStyle.default.fontFamilyJa}`, // 本文用フォント
    },
  },
})

export default responsiveFontSizes(theme)