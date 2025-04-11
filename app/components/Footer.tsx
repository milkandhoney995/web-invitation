/** @jsxImportSource @emotion/react **/
"use client";

import React from 'react';
import { Box, Container, Grid, Typography, Link, IconButton } from '@mui/material';
import { css } from '@emotion/react';
import theme from '@/style/theme';

const styles = {
  footerWrapperStyle: css({
    color: "#fff",
    padding: "32px 0",
    marginTop: "auto",
    "& .MuiContainer-root": {
      display: "flex",
      justifyContent: "center"
    }
  }),
}

const Footer: React.FC = () => {
  return (
    <Box sx={styles.footerWrapperStyle}>
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="space-between">
          <Typography variant="body2" sx={{  fontFamily: `${theme.validTheme.fontFamilySubEn}` }}>
            © 2025 Uta-Tai Wedding. All rights reserved.
          </Typography>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;