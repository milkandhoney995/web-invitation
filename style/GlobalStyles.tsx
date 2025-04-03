import { Theme, ThemeProvider } from "@mui/material/styles"
import theme from "./theme"
import { Global, css } from "@emotion/react";

type Props = {}
type Styles = (theme: Theme) => object;

const globalStyles = css({
  html: {
    backgroundColor: `${theme.validTheme.backgroundColor}`,
    fontFamily: `${theme.validTheme.fontFamilyJa}`
  }

})

const GlobalStyles = (props: Props) => {
  return (
    <ThemeProvider theme={theme}>
      <Global styles={[globalStyles]} />
    </ThemeProvider>
  )
}

export default GlobalStyles;