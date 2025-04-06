/** @jsxImportSource @emotion/react **/
import theme from "@/style/theme";
import { SerializedStyles, css } from "@emotion/react"
import { Grid, Typography } from "@mui/material";
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
      // display: "flex",
      // flexDirection: "row",
      alignItems: "center",
      color: "#333",
      fontSize: "16px",
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
      <Typography variant="h2">{title}</Typography>
      <Grid
        container
        spacing={6}
        justifyContent="center"
        className="textContainer"
      >{children}</Grid>
    </section>
  )
};

export default Section;