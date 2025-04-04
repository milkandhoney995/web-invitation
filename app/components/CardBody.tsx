/** @jsxImportSource @emotion/react **/
import theme from "@/style/theme";
import { css } from "@emotion/react"
import CardTitle from "./CardTitle";
import CardSubtitle from "./CardSubtitle";
import Image from 'next/image'
import { Typography } from "@mui/material";

type Props = {
  title?: string
  children?: React.ReactNode
  img: string
}

const style = {
  card: css({
    display: "flex",
    flexDirection: "column",
    "& h5": {
      fontWeight: "200",
      fontSize: "1.5rem",
      marginBottom: "1rem"
    }
  })
}

const CardBody = (props: Props) => {
  const { title, children, img } = props
  return (
    <div css={style.card}>
      <h5>{title}</h5>
      <Typography variant="body1" gutterBottom>
        {children}
      </Typography>
      <Image
        src={img}
        alt="thanks"
        width={660}
        height={400}
        layout="intrinsic"
        objectFit="cover"
        quality={100}
      />
    </div>
  )
};

export default CardBody;