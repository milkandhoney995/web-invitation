"use client";

import dynamic from "next/dynamic";
import React from "react";
import Provider from "./provider";

// クライアント専用として動的に読み込む
const Header = dynamic(() => import("@/app/components/Header"), { ssr: false })
const Footer = dynamic(() => import("@/app/components/Footer"), { ssr: false });

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <Provider>
      <Header />
      {children}
      <Footer />
    </Provider>
  );
}