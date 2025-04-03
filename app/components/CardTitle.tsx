/** @jsxImportSource @emotion/react **/
import theme from "@/style/theme";
import { css } from "@emotion/react"

type Props = {
  label?: string
}

const CardTitle = (props: Props) => {
  const { label = 'ラベル' } = props
  return <h3>{label}</h3>
};

export default CardTitle;