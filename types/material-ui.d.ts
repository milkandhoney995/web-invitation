import { Theme, ThemeOptions } from "'@mui/material/styles";
declare module "@mui/material/styles" {
  interface Theme {
    validTheme: {
      // fonts
      fontColorMain: string,

      fontFamilyJa: string,
      fontFamilyEn: string,
      fontFamilySubEn: string,

      // title
      heroSubTitleFont: string,
      // header
      navigationFont: string,

      // card
      cardSubtitleColor: string,

      // form
      formBackground: string,
      formRadius: string,
      formPadding: string,

      // common
      backgroundColor: string,
      backgroundColor1: string,
      buttonColor: string,
      buttonFontColor: string,

      // padding
      num16: string,
      num32: string,
      num48: string,
      num64: string
      num80: string
    }
  }
  interface ThemeOptions {
    validTheme: {}
  }
}