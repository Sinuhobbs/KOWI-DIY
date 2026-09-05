import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kowi",
  description: "Kowi DIY — shop home and hardware, delivered locally.",
  applicationName: "Kowi",
  appleWebApp: {
    capable: true,
    title: "Kowi",
    statusBarStyle: "black-translucent",
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#d8f59a" },
    { media: "(prefers-color-scheme: dark)", color: "#d8f59a" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light" style={{ colorScheme: "light" }}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
