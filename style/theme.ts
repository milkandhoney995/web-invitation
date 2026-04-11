import { createTheme, responsiveFontSizes } from "@mui/material"
import { Josefin_Sans } from 'next/font/google';
import { Pinyon_Script } from 'next/font/google';
import { Forum } from 'next/font/google';

type ValidTheme = {
  fontColorMain: string;
  fontFamilyJa: string;
  fontFamilyEn: string;
  fontFamilySubEn: string;
  heroSubTitleFont: string;
  navigationFont: string;
  cardSubtitleColor: string;
  formBackground: string;
  formRadius: string;
  formPadding: string;
  backgroundColor: string;
  backgroundColor1: string;
  buttonColor: string;
  buttonFontColor: string;
  num16: string;
  num32: string;
  num48: string;
  num64: string;
  num80: string;
};

// Google Fonts (Parisienne) をインポート
const enFont = Josefin_Sans({
  weight: '400',
  subsets: ['latin'],
});
const forum = Forum({
  weight: '400',
  subsets: ['latin'],
});

const enHeaderTitleFont = Pinyon_Script({
  weight: '400',
  subsets: ['latin'],
})

const themeStyle: Record<string, ValidTheme> = {
  default: {
    // fonts
    fontColorMain: "#1e1e1e",

    fontFamilyJa: ` "游明朝体", "Yu Mincho", YuMincho, "ヒラギノ明朝 Pro", "Hiragino Mincho Pro", "MS P明朝", "MS PMincho", serif;`,
    fontFamilyEn: enHeaderTitleFont.style.fontFamily,
    fontFamilySubEn: forum.style.fontFamily,

    // title
    heroSubTitleFont: forum.style.fontFamily,

    // header
    navigationFont: forum.style.fontFamily,

    // card
    cardSubtitleColor: "#757575",

    // form
    formBackground: "rgba(255, 255, 255, 0.8)",
    formRadius: "1rem",
    formPadding: "3rem 4rem",

    // common
    backgroundColor: "#E8DDD4",
    backgroundColor1: "#FFFBF7",
    buttonColor: "#FFB4AC",
    buttonFontColor: "#ffffff",

    // padding
    num16: "1rem",
    num32: "2rem",
    num48: "3rem",
    num64: "4rem",
    num80: "5rem",


  }
}

const theme = createTheme({
  validTheme: themeStyle["default"],
  palette: {
    primary: {
      main: themeStyle["default"].buttonColor,
    }
  },
  typography: {
    fontFamily: `${themeStyle.default.fontFamilyJa}, ${enFont.style.fontFamily}, sans-serif`, // フォントファミリーの設定
    h1: {
      fontFamily: enHeaderTitleFont.style.fontFamily, // ヘッダー用フォント
    },
    h2: {
      fontFamily: forum.style.fontFamily, // サブタイトルやナビゲーション用フォント
    },
    h3: {
      fontFamily: `${themeStyle.default.fontFamilyEn}, ${themeStyle.default.fontFamilyJa}, sans-serif`,
    },
    body1: {
      fontFamily: themeStyle.default.fontFamilyJa, // 本文用フォント
    },
  },
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          padding: themeStyle["default"].num16,
          '@media (min-width: 600px)': {
            padding: themeStyle["default"].num32,
          },
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          padding: "0.5rem 2rem",
          '&.MuiButton-containedPrimary': {
            color: themeStyle["default"].buttonFontColor,
            '&:hover': {
              backgroundColor: themeStyle["default"].buttonFontColor,
              color: themeStyle["default"].buttonColor
            },
          },
        },
        sizeLarge: {
          fontSize: '1.5rem',
        },
      }
    },
    MuiLink: {
      styleOverrides: {
        root: {
          fontFamily: themeStyle["default"].fontFamilyEn,
          textDecoration: 'none', // 下線を消す
          color: themeStyle["default"].buttonFontColor,
          '&:hover': {
            color: themeStyle["default"].buttonColor
          },
        },
      },
    },
  }
})

export default responsiveFontSizes(theme)