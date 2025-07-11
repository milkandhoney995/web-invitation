/** @jsxImportSource @emotion/react **/
import { CEREMONY_INFO_ITEMS, CEREMONY_INFO_TITIE } from "@/constants/eventData";
import theme from "@/style/theme";
import { css } from "@emotion/react"

type Props = {
  titles: string[]
  infos: string[]
}

const style = {
  contents: css({
    lineHeight: "2.5",
    "&:nth-child(2)": {
      // marginLeft: `${theme.validTheme.num48}`
    }
  }),
}

const CardInfo = (props: Props) => {
  const { titles, infos } = props
  return (
    <>
      <div css={style.contents}>
        {titles.map((item, index) => <div key={index} className="">{item}</div> )}
      </div>
      <div css={style.contents}>
        {infos.map((item, index) => <div key={index} className="">{item}</div> )}
      </div>
    </>
  )
};

export default CardInfo;