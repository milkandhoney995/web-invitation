/** @jsxImportSource @emotion/react **/
import theme from "@/style/theme";
import { css } from "@emotion/react"
import CardTitle from "./CardTitle";
import CardSubtitle from "./CardSubtitle";
import Image from 'next/image'

type Props = {
  title?: string
  children?: React.ReactNode
  img: string
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
  const { title, children, img } = props
  return (
    <div css={style.card}>
      <CardTitle label={title} />
      <CardSubtitle>{children}</CardSubtitle>
      <Image
        src={img}
        alt="thanks"
        width={660}
        height={400}
        layout="intrinsic"
        objectFit="cover"
        quality={100}
        css={css`
          filter: brightness(0.9) contrast(70%);
        `}
      />
    </div>
  )
};

export default CardMain;