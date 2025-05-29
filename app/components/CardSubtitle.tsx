/** @jsxImportSource @emotion/react **/
import theme from "@/style/theme";
import { css } from "@emotion/react"
import { Typography } from "@mui/material";

type Props = {
  children?: React.ReactNode
}

const style = {
  title: css({
    color: `${theme.validTheme.cardSubtitleColor}`,
    whiteSpace: 'pre-line',
    fontSize: "1.25rem"
  })
}

const CardSubtitle = (props: Props) => {
  const { children } = props
  return <Typography variant="subtitle1" gutterBottom css={style.title}>{children}</Typography>
};

export default CardSubtitle;