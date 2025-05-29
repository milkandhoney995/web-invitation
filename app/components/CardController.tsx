/** @jsxImportSource @emotion/react **/
import CardBody from "./CardBody";

interface Props  {
  bodyTitle?: string
  children: React.ReactNode
  mainImg: string
  bodyImg: string
  mapUrl: string
}

const CardController = (props: Props) => {
  const { bodyTitle, children, mainImg, bodyImg, mapUrl } = props

  return (
    <div>
      <CardBody
        title={bodyTitle}
        mainImg={mainImg}
        bodyImg={bodyImg}
        mapUrl={mapUrl}
      >
        {children}
      </CardBody>
    </div>
  )
}

export default CardController;