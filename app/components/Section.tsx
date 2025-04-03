/** @jsxImportSource @emotion/react **/
import theme from "@/style/theme";
import { css } from "@emotion/react"
import { ReactNode } from "react";

const styles = {
  section: css({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly",
    padding: "15px 20px",
    height: "100vh",
    "& h2": {
      color: "#333",
      fontSize: "3rem",
      fontFamily: `${theme.validTheme.fontFamilyEn}`
    },
    "& .textContainer": {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      color: "#333",
      fontSize: "16px",
      fontFamily: `${theme.validTheme.fontFamilyJa}`,
      "& div:last-child": {
        marginLeft: "2rem"
      }
    },
  }),
}

type Props = {
  title?: string,
  id?: string,
  children?: ReactNode,
  backgroundColor?: string
}

const Section = (props: Props) => {
  const { title = 'ラベル', id, children, backgroundColor } = props;
  return (
    <section
      id={id}
      css={[
        styles.section,
        css`
          background: ${backgroundColor}
        `
      ]}
    >
        <h2>{title}</h2>
        <div className="textContainer">{children}</div>
    </section>
  )
};

export default Section;