/** @jsxImportSource @emotion/react **/
import theme from '@/style/theme';
import { css } from "@emotion/react"
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
        fontSize: "10rem",
        color: "#fff",
        fontWeight: "100"
      },
      "& h2": {
        fontSize: "3rem",
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
      <h1>Our Wedding</h1>
      <h2>TAISHU & UTANO</h2>
    </div>
  </section>
);

export default Hero;