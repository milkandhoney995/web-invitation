/** @jsxImportSource @emotion/react **/
import theme from "@/style/theme";
import { SerializedStyles, css } from "@emotion/react";
import { Grid, Typography } from "@mui/material";
import { ReactNode } from "react";

const styles = {
  section: css({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly",
    padding: "4rem 2rem",
    height: "fit-content",
    "& .textContainer": {
      width: "100%",
      color: "#333",
      fontSize: "16px",
    },
  }),
}

type Props = {
  title?: string
  id?: string
  children?: ReactNode
  backgroundColor?: string
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
      <Typography
        variant="h2"
        component="h2"
        sx={{
          fontSize: { xs: "3rem", sm: "4rem", md: "5rem" },
          fontFamily: `${theme.validTheme.fontFamilyEn}`,
          marginBottom: { xs: "2rem", sm: "3rem", md: "4rem" },
        }}
      >
        {title}
      </Typography>
      <Grid
        container
        spacing={4}
        justifyContent="center"
        alignItems="center"
        className="textContainer"
      >
        {children}
      </Grid>
    </section>
  )
};

export default Section;