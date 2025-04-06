/** @jsxImportSource @emotion/react **/
import theme from "@/style/theme";
import { SerializedStyles, css } from "@emotion/react"
import { ReactNode } from "react";

const styles = {
  section: css({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly",
    height: "fit-content",
    padding: "4rem",
    "& h2": {
      color: "#333",
      fontSize: "5rem",
      fontFamily: `${theme.validTheme.fontFamilyEn}`,
      marginBottom: "4rem"
    },
    "& .textContainer": {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      color: "#333",
      fontSize: "16px",
      fontFamily: `${theme.validTheme.fontFamilyJa}`,
    },
  }),
}

type Props = {
  title?: string,
  id?: string,
  children?: ReactNode,
  backgroundColor?: string,
  propCss?: SerializedStyles
}

const Section = (props: Props) => {
  const { title, id, children, backgroundColor, propCss } = props;
  return (
    <section
      id={id}
      css={[
        styles.section,
        css`
          background: ${backgroundColor}
        `,
        propCss
      ]}
    >
      <h2>{title}</h2>
      <div
        className="textContainer"
      >{children}</div>
    </section>
  )
};

export default Section;