/** @jsxImportSource @emotion/react **/
import { css } from "@emotion/react"
import CardTitle from "./CardTitle";
import CardSubtitle from "./CardSubtitle";

type Props = {
  title?: string
  children?: React.ReactNode
}

const style = {
  card: css({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: "1rem"
  })
}

const CardMain = (props: Props) => {
  const { title, children } = props
  return (
    <div css={style.card}>
      <CardTitle label={title} />
      <CardSubtitle>{children}</CardSubtitle>
    </div>
  )
};

export default CardMain;