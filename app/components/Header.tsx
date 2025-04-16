/** @jsxImportSource @emotion/react **/
"use client";

import theme from '@/style/theme';
import { css } from "@emotion/react";
import { menuItems } from "@/constants/menuItems";
import Link from 'next/link';
import NextLink from 'next/link';
import { useEffect, useState } from 'react';
import { AppBar, Toolbar, IconButton, MenuItem, useMediaQuery, useTheme, Link as MuiLink } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const styles = {
  toolbar: css({
    padding: "0",
    "& div:last-child": {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      height: "100vh",
      width: "100vw",
      backgroundColor: `${theme.validTheme.backgroundColor}`,
      overflow: "hidden"
    },
    "& .MuiMenuItem-root": {
      justifyContent: "center",
    },
  }),
  navLink: css({
    marginRight: `${theme.validTheme.num32}`,
    color: "#333",
    fontSize: "1.5rem",
    fontFamily: `${theme.validTheme.navigationFont}`,
    textDecoration: "none",
  }),
  menu: css({
    "& .MuiPaper-root": {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: "center",
      position: 'fixed',
      top: 0,
      left: 0,
      transform: 'translate(-50%, -50%)',
      width: '100vw',
      height: '100vh',
      backgroundColor: `${theme.validTheme.backgroundColor}`,
      zIndex: 1300,
      opacity: 0,
      animation: 'slideIn 0.5s ease-out forwards',
      "@keyframes slideIn": {
        from: {
          transform: 'translate(-50%, -50%) scale(0.5)',
          opacity: 0,
        },
        to: {
          transform: 'translate(-50%, -50%) scale(1)',
          opacity: 1,
        },
      }
    }
  }),
  menuItem: css({
    fontSize: "1.2rem",
    fontFamily: `${theme.validTheme.navigationFont}`,
    padding: "20px 30px",
  }),
  closeButton: css({
    position: 'absolute',
    top: '20px',
    right: '20px',
    zIndex: 1400,
  }),
  menuIcon: css({
    position: 'absolute',
    top: '20px',
    right: '20px',
    zIndex: 1300,
  }),
  link: css({
    color: 'inherit',
    textDecoration: 'none',
    fontSize: `${theme.validTheme.num48}`,
    fontFamily: `${theme.validTheme.fontFamilyEn}`,
    '&:hover': {
      color: 'inherit',
    }
  })
};

const Header = () => {
  const [isSticky, setIsSticky] = useState<boolean>(false);
  const [openMenu, setOpenMenu] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // クライアントサイドでのみ実行
    setIsClient(true);
  }, []);

  const handleScroll = () => {
    if (window.scrollY > 300) setIsSticky(true);
    else setIsSticky(false);
  };

  const handleMenuClick = () => {
    setOpenMenu(true);
  };

  const handleMenuClose = () => {
    setOpenMenu(false);
  };

  const handleLinkClick = () => {
    if (isMobile) {
      handleMenuClose();
    }
  };

  useEffect(() => {
    // クライアントサイドでのみイベントリスナーを追加
    if (isClient) {
      window.addEventListener('scroll', handleScroll);

      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, [isClient]); // isClientがtrueになるまで待機

  return (
    <AppBar
      position={isSticky ? "fixed" : "absolute"}
      sx={{
        top: 0,
        left: 0,
        right: 0,
        opacity: `${isMobile || isSticky ? '1' : '0'}`,
        backgroundColor: 'transparent',
        boxShadow: 'none',
        padding: `${isMobile ? '0' : '10px 20px'}`,
        transition: "background-color 0.3s ease",
        zIndex: 1200, // AppBar より下に配置
      }}
    >
      <Toolbar css={styles.toolbar}>
        <div css={{ flexGrow: 1 }} />
        {/* モバイル用のメニューアイコン */}
        {isMobile && isClient ? (
          <>
            {/* MenuIcon はメニューが閉じている時のみ表示 */}
            {!openMenu && (
              <IconButton onClick={handleMenuClick} css={styles.menuIcon}>
                <MenuIcon />
              </IconButton>
            )}

            {/* メニューが開かれている場合 */}
            {openMenu && (
              <div css={styles.menu}>
                <IconButton css={styles.closeButton} onClick={handleMenuClose}>
                  <CloseIcon />
                </IconButton>

                {/* メニューアイテム */}
                {menuItems.map((item, index) => (
                  <MenuItem key={index} onClick={handleLinkClick} sx={{ width: '100%', textAlign: 'center' }}>
                    {/* MUIのLinkコンポーネントでNext.jsのLinkをラップ */}
                    <MuiLink
                      component={NextLink} // Next.jsのLinkコンポーネントを使う
                      href={item.url}
                      sx={styles.link}
                    >
                        {item.text}
                    </MuiLink>
                  </MenuItem>
                ))}
              </div>
            )}
          </>
        ) : (
          <nav>
            {/* デスクトップ用のナビゲーションリンク */}
            {menuItems.map((item, index) => (
              <Link key={index} href={item.url} css={styles.navLink}>
                {item.text}
              </Link>
            ))}
          </nav>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;