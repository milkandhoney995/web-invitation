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
  html: {
    fontFamily: "sans-serif"
  },
  body: {
    fontFamily: "sans-serif",
    margin: "0",
    padding: "0",
    boxSizing: "border-box"
  },
  h1: {
    margin: "0",
    padding: "0",
    boxSizing: "border-box"
  },
  h2: {
    margin: "0",
    padding: "0",
    boxSizing: "border-box"
  },
  h4: {
    fontWeight: "normal",
  },
  a: {
    textDecoration: "none"
  },
  ul: {
    listStyle: "none"
  },
  img: {
    position: "relative",
    maxWidth: "100%"
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