"use client";
import { ThemeProvider } from "@mui/material/styles";
import GlobalStyles from "@/style/GlobalStyles";
import RootStyleRegistry from "./emotion";
import React from "react";
import theme from "@/style/theme";

export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <RootStyleRegistry>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        {children}
      </ThemeProvider>
    </RootStyleRegistry>
  )
}