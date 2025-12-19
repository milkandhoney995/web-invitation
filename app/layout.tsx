// app/layout.tsx
import React from "react";
import ClientLayout from "./ClientLayout";
import { redirect } from "next/navigation";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const maintenanceMode = false; // メンテナンスモードのフラグ

  // メンテナンスモードなら /maintenance にリダイレクト
  if (maintenanceMode) {
    redirect("/maintenance");
  }

  return (
    <html>
      <head />
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}