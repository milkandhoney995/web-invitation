import { Theme, ThemeProvider } from "@mui/material/styles"
import theme from "./theme"
import { Global, css } from "@emotion/react";
import { relative } from "path";

type Props = {}
type Styles = (theme: Theme) => object;

const globalStyles = css({
  html: {
    backgroundColor: `${theme.validTheme.backgroundColor}`,
    fontFamily: `${theme.validTheme.fontFamilyJa}`
  }

})
const resetCss = css({
  "*": {
    margin: "0",
    padding: "0",
    boxSizing: "border-box",
    fontWeight: "normal"
  },
  html: {
    fontFamily: "sans-serif",
    height: "100%",
    margin: "0"
  },
  body: {
    fontFamily: "sans-serif",
    height: "100%",
    margin: "0"
  },
  h4: {
    fontWeight: "normal",
  },
  a: {
    textDecoration: "none"
  },
  ul: {
    listStyle: "none"
  }

})

const GlobalStyles = (props: Props) => {
  return (
    <ThemeProvider theme={theme}>
      <Global styles={[globalStyles, resetCss]} />
    </ThemeProvider>
  )
}

export default GlobalStyles;