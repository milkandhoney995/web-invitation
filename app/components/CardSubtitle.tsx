/** @jsxImportSource @emotion/react **/
import theme from "@/style/theme";
import { css } from "@emotion/react"

type Props = {
  children?: React.ReactNode
}

const style = {
  title: css({
    color: `${theme.validTheme.cardSubtitleColor}`,
    fontSize: "1.75rem",
    marginBottom: "1rem"
  })
}

const CardSubtitle = (props: Props) => {
  const { children } = props
  return <h4 css={style.title}>{children}</h4>
};

export default CardSubtitle;