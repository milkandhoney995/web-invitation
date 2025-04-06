/** @jsxImportSource @emotion/react **/
import theme from "@/style/theme";
import { css } from "@emotion/react"
import CardMain from "./CardMain";
import CardBody from "./CardBody";

interface Props  {
  mainTitle?: string
  bodyTitle?: string
  children: React.ReactNode[]
  mainImg: string
  bodyImg: string
  mapUrl: string
}

const CardController = (props: Props) => {
  const { mainTitle, bodyTitle, children, mainImg, bodyImg, mapUrl } = props

  return (
    <div>
      <CardMain
        title={mainTitle}
      >
        {children[0]}
      </CardMain>
      <CardBody
        title={bodyTitle}
        mainImg={mainImg}
        bodyImg={bodyImg}
        mapUrl={mapUrl}
      >
        {children[1]}
      </CardBody>
    </div>
  )
}

export default CardController;