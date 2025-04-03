import { Theme, ThemeOptions } from "'@mui/material/styles";
declare module "@mui/material/styles" {
  interface Theme {
    validTheme: {
      // fonts
      fontColorMain: string,

      fontFamilyJa: string,
      fontFamilyEn: string,

      // title
      heroSubTitleFont: string,
      // header
      navigationFont: string,

      // card
      cardSubtitleColor: string,

      // common
      backgroundColor: string,
      backgroundColor1: string,
    }
  }
  interface ThemeOptions {
    validTheme: {}
  }
}