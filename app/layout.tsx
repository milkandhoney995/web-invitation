import React from "react";
import Provider from "./provider";
import Header from "./components/Header";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head></head>
      <body>
        <Header />
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}