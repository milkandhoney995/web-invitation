/** @jsxImportSource @emotion/react **/
"use client";

import { css } from "@emotion/react"
import theme from "@/style/theme";
import { Typography } from "@mui/material";
import { useRouter } from 'next/navigation';
import Section from "@/app/components/Section";

const style = {
  main: css({
    flex: "1"
  }),
  body: css({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "& .MuiTypography-root": {
      marginBottom: `${theme.validTheme.num32}`
    }
  })
}

const MaintenancePage = () => {

  return (
    <Section
      propCss={style.main}
    >
      {/* <Typography variant="h3">メンテナンス中です</Typography> */}
      <div css={style.body}>
        <Typography variant="h4">メンテナンス中です。しばらくお待ちください。</Typography>
      </div>
    </Section>
  );
}

export default MaintenancePage;