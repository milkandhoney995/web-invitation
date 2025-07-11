/** @jsxImportSource @emotion/react **/
import CardBody from "./CardBody";

interface Props  {
  bodyTitle?: string
  mainImg: string
  bodyImg: string
  mapUrl: string
  titles: string[]
  infos: string[]
}

const CardController = (props: Props) => {
  const { bodyTitle, mainImg, bodyImg, mapUrl, titles, infos } = props

  return (
    <div>
      <CardBody
        title={bodyTitle}
        mainImg={mainImg}
        bodyImg={bodyImg}
        mapUrl={mapUrl}
        titles={titles}
        infos={infos}
      />
    </div>
  )
}

export default CardController;