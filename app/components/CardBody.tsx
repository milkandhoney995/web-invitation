/** @jsxImportSource @emotion/react **/
import theme from "@/style/theme";
import { css } from "@emotion/react"
import CardTitle from "./CardTitle";
import CardSubtitle from "./CardSubtitle";
import Image from 'next/image'
import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";

type Props = {
  title?: string
  children?: React.ReactNode
  mainImg: string
  bodyImg: string
}

const style = {
  cardMedia: css({
    filter: "brightness(0.9) contrast(70%)"
  })
}

const CardBody = (props: Props) => {
  const { title, children, mainImg, bodyImg } = props
  return (
    <>
      <Card>
        <CardActionArea>
          <CardMedia
            component="img"
            height="400"
            image={mainImg}
            alt={title}
            css={style.cardMedia}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {title}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {children}
            </Typography>
          </CardContent>
          <CardMedia
            component="img"
            height="400"
            image={bodyImg}
            alt={title}
          />
        </CardActionArea>
      </Card>
    </>
  )
};

export default CardBody;