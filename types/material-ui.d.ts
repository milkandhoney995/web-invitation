import "@mui/material/styles";

declare module "@mui/material/styles" {
  interface ValidTheme {
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
  }

  interface Theme {
    validTheme: ValidTheme;
  }

  interface ThemeOptions {
    validTheme?: Partial<ValidTheme>;
  }
}

export {};