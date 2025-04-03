import { createTheme, responsiveFontSizes } from "@mui/material"

const themeStyle: { [ key: string ]: any } = {
  default: {
    // fonts
    fontColorMain: "#1e1e1e",

    fontFamilyJa: ` "游明朝体", "Yu Mincho", YuMincho, "ヒラギノ明朝 Pro", "Hiragino Mincho Pro", "MS P明朝", "MS PMincho", serif;`,
    fontFamilyEn: "YuMincho",

    // common
    backgroundColor: "#E8DDD4",
    backgroundColor1: "#FFFBF7",

  }
}

const theme = createTheme({
  validTheme: themeStyle["default"],
})

export default responsiveFontSizes(theme)