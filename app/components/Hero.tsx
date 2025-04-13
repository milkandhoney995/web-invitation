/** @jsxImportSource @emotion/react **/
import theme from '@/style/theme';
import { css } from "@emotion/react"
import { Typography } from '@mui/material';
import Image from 'next/image'
import { useState, useEffect } from 'react'
import Logo from '@/app/components/Logo';

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
      position: "absolute",
      width: "100%",
      height: "100%",
      filter: "opacity(0.6)",
      transition: "opacity 1.5s ease, transform 1.5s ease",
      opacity: 0,
      transform: "scale(1.05)",
    },
    "& .imageContainer.visible": {
      opacity: 1,
      transform: "scale(1)",
    }
  }),
};

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const images = [
    "/images/img_hero_1.jpg",
    "/images/img_hero_2.jpg",
    "/images/img_hero_3.jpg"
  ];

  // スライドショーの切り替え
  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        setIsVisible(true);
      }, 1500);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section css={styles.hero}>
      <div className={`imageContainer ${isVisible ? 'visible' : ''}`} key={currentIndex}>
        <Image
          src={images[currentIndex]}
          alt={`hero_image_${currentIndex}`}
          fill
          style={{ objectFit: "cover" }}
          quality={100}
        />
      </div>
      <div className="textContainer">
        <Logo />
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
};

export default Hero;