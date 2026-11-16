import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: 'Ajaia Docs - AI-Native Collaborative Editor',
  description: 'Lightweight collaborative document editor inspired by Google Docs',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body cz-shortcut-listen="true" className="bg-slate-50 text-slate-900 antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
