/** @jsxImportSource @emotion/react **/
"use client";

import theme from '@/style/theme';
import { css } from "@emotion/react"
import { menuItems } from "@/constants/menuItems"
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { AppBar, Toolbar, IconButton, Menu, MenuItem, useMediaQuery, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const styles = {
  navLink: css({
    marginRight: `${theme.validTheme.num32}`,
    color: "#333",
    fontSize: "1.5rem",
    fontFamily: `${theme.validTheme.navigationFont}`,
    textDecoration: "none", // リンクの下線を消す
  }),
  menu: css({
    "& .MuiPaper-root": {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: "center",
      position: 'relative',
      width: '100vw',
      height: '100vh',
      top: 0,
      left: 0,
      backgroundColor: `${theme.validTheme.backgroundColor}`,
    }
  }),
  menuItem: css({
    fontSize: "1.2rem",
    fontFamily: `${theme.validTheme.navigationFont}`,
    padding: "20px 30px",
  }),
  menuIconContainer: css({
    position: 'relative'
  }),
  menuIcon: css({
    position: 'absolute',
    top: 0,
    left: 0,
  }),
  closeButton: css({
    position: 'absolute',
    top: 0,
    left: 0,
  }),
}

const Header = () => {
  const [isSticky, setIsSticky] = useState<boolean>(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openMenu, setOpenMenu] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleScroll = () => {
    if (window.scrollY > 300) setIsSticky(true);
    else setIsSticky(false);
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setOpenMenu(true);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setOpenMenu(false);
  };

  const handleLinkClick = () => {
    if (isMobile) {
      handleMenuClose();
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    // クリーンアップ関数
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
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
      }}
    >
      <Toolbar>
        <div css={{ flexGrow: 1 }} />
        {/* スマホの場合のハンバーガーメニュー */}
        {isMobile ? (
          <>
            <IconButton onClick={handleMenuClick}>
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={openMenu}
              onClose={handleMenuClose}
              sx={styles.menu}
            >

              {/* 閉じるボタン */}
              <IconButton css={styles.closeButton} onClick={handleMenuClose}>
                <CloseIcon />
              </IconButton>
              {menuItems.map((item, index) => (
                <MenuItem key={index} onClick={handleLinkClick} sx={{ width: '100%', textAlign: 'center' }}>
                  <Link href={item.url} css={styles.menuItem}>
                    {item.text}
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </>
        ) : (
          <nav>
            {/* メニューの一覧を表示 (デスクトップ版) */}
            {menuItems.map((item, index) => (
              <Link key={index} href={item.url} css={styles.navLink}>
                {item.text}
              </Link>
            ))}
          </nav>
        )}
      </Toolbar>
    </AppBar>
  )
};

export default Header;