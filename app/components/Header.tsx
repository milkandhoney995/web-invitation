/** @jsxImportSource @emotion/react **/
"use client";

import theme from '@/style/theme';
import { css } from "@emotion/react"
import { menuItems } from "@/constants/menuItems"
import Link from 'next/link';
import { useEffect, useState } from 'react';

const styles = {
  header: css({
    display: "flex",
    justifyContent: "flex-end",
    padding: "20px 25px",
    transition: "background-color 0.3s ease",
    "& nav a": {
      marginRight: "2rem",
      color: "#333",
      fontSize: "1.5rem",
      fontFamily: `${theme.validTheme.navigationFont}`
    },
  }),
}

const Header = () => {
  const [isSticky, setIsSticky] = useState<boolean>(false)

  const handleScroll = () => {
    if (window.scrollY > 300) setIsSticky(true);
    else setIsSticky(false);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    // クリーンアップ関数
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <header css={[
      styles.header,
      css`
        opacity: ${isSticky ? '1' : '0'};
        position: ${isSticky ? 'fixed' : 'absolute'};
        top: 0;
        left: 0;
        right: 0;
      `,
      ]}>
      <nav>
        {/* メニューの一覧を表示 */}
        {menuItems.map((item, index) => (
          <Link key={index} href={item.url}>
            {item.text}
          </Link>
        ))}
      </nav>
    </header>
  )
};

export default Header;