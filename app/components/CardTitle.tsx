/** @jsxImportSource @emotion/react **/
import theme from "@/style/theme";
import { css } from "@emotion/react"

type Props = {
  label?: string
}

const style = css({
  fontSize: "2.5rem",
  marginBottom: "1rem"
})

const CardTitle = (props: Props) => {
  const { label = 'ラベル' } = props
  return <h3 css={style}>{label}</h3>
};

export default CardTitle;