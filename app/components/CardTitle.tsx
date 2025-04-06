/** @jsxImportSource @emotion/react **/
import theme from "@/style/theme";
import { css } from "@emotion/react"
import { Typography } from "@mui/material";

type Props = {
  label?: string
}

const CardTitle = (props: Props) => {
  const { label = 'ラベル' } = props
  return <Typography variant="h3" gutterBottom>{label}</Typography>
};

export default CardTitle;