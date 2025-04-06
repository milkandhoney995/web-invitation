/** @jsxImportSource @emotion/react **/
import theme from '@/style/theme';
import { css } from "@emotion/react"
import { Typography } from '@mui/material';
import Image from 'next/image'

const styles = {
  hero: css({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    height: "100vh",
    color: "#fff",
    fontFamily: `${theme.validTheme.fontFamilyEn}`,
    "& .textContainer": {
      position: "absolute",
      textAlign: "center",
      "&  h1": {
        color: "#fff",
        fontWeight: "100"
      },
      "& h2": {
        color: "#fff",
        fontFamily: `${theme.validTheme.heroSubTitleFont}`,
        fontWeight: "100"
      }
    },
    "& .imageContainer": {
      position: "relative",
      width: "100%",
      height: "100%",
      filter: "opacity(0.6)"
    }
  }),
}

const Hero = () => (
  <section css={styles.hero}>
    <div className='imageContainer'>
      <Image
        src="/images/img_hero.jpg"
        alt="main_visual"
        layout="fill"
        objectFit="cover"
        quality={100} // 高品質で表示
      />
    </div>
    <div className='textContainer'>
      <Typography
        variant="h1"
        sx={{
          fontSize: {
            xs: '6rem',
            sm: '8rem',
            md: '10rem'
          },
        }}
      >Our Wedding</Typography>
      <Typography
        variant="h2"
        sx={{
          fontSize: {
            xs: '2rem',
            sm: '4rem',
            md: '5rem'
          },
        }}
      >TAISHU & UTANO</Typography>
    </div>
  </section>
);

export default Hero;