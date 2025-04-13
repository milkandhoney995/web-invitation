"use client";
import { Metadata } from 'next';
import { ThemeProvider } from "@mui/material/styles";
import GlobalStyles from "@/style/GlobalStyles";
import RootStyleRegistry from "./emotion";
import React, { useEffect, useState } from "react";
import theme from "@/style/theme";
import dynamic from 'next/dynamic';

// 遅延読み込み（SSR 無効）
const Loading = dynamic(() => import('./components/Loading'), { ssr: false });

export const metadata: Metadata = {
  title: 'Web招待状',
  description: 'Web招待状の詳細ページです。',
};

export default function Provider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loading />
  }
  return (
    <RootStyleRegistry>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        {children}
      </ThemeProvider>
    </RootStyleRegistry>
  )
}