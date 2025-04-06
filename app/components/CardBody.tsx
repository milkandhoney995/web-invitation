/** @jsxImportSource @emotion/react **/
import theme from "@/style/theme";
import { css } from "@emotion/react"
import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from "@mui/material";

type Props = {
  title?: string
  children?: React.ReactNode
  mainImg: string
  bodyImg: string
  mapUrl: string
}

const style = {
  cardMedia: css({
    filter: "brightness(0.9) contrast(70%)"
  })
}

const CardBody = (props: Props) => {
  const { title, children, mainImg, bodyImg, mapUrl } = props
  return (
    <>
      <Card>
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
        <CardActions>
          <Button
            variant="contained"
            size="small"
            href={mapUrl}
            target="_blank"
            rel="noopener noreferrer"
          >Google Mapを開く</Button>
        </CardActions>
      </Card>
    </>
  )
};

export default CardBody;