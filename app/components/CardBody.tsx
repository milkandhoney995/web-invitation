/** @jsxImportSource @emotion/react **/
import theme from "@/style/theme";
import { css } from "@emotion/react"
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";

type Props = {
  title?: string
  children?: React.ReactNode
  mainImg: string
  bodyImg: string
  mapUrl: string
}

const style = {
  contents: css({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.validTheme.num48
  }),
  cardMedia: css({
    filter: "brightness(0.9) contrast(70%)"
  }),
  body: css({
    whiteSpace: 'pre-line'
  }),
  button: css({
    display: "flex",
    justifyContent: "center"
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
        <CardContent sx={style.contents}>
          <Typography gutterBottom variant="h3">
            {title}
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary' }} css={style.body}>
            {children}
          </Typography>
        </CardContent>
        <CardMedia
          component="img"
          image={bodyImg}
          alt={title}
          sx={{
            height: { xs: 200, sm: 300, md: 400 },
            width: '100%',
            objectFit: {
              xs: 'contain',
              sm: 'cover',
            },
            marginBottom: theme.validTheme.num32
          }}
        />
        <CardActions
          sx={style.button}
        >
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