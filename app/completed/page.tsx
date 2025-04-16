/** @jsxImportSource @emotion/react **/
"use client";

import { css } from "@emotion/react"
import theme from "@/style/theme";
import { Typography, Button } from "@mui/material";
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

const CompletedPage = () => {
  const router = useRouter()
  const handleClick = () => {
    router.push('/');
  }

  return (
    <Section
      propCss={style.main}
    >
      <Typography variant="h3">ご回答ありがとうございます</Typography>
      <div css={style.body}>
        <Typography variant="h4">xxx@gmail.comから送信済みメールをご確認ください。</Typography>
        <Button variant="contained" color="primary" onClick={handleClick}>
          トップに戻る
        </Button>
      </div>
    </Section>
  );
}

export default CompletedPage;