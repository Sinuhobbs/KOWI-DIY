import type { Metadata, Viewport } from "next";
import "./globals.css";
import { PullReload } from "@/components/PullReload";

export const metadata: Metadata = {
  title: "Kowi Partner",
  description: "Kowi DIY partner store dashboard",
  applicationName: "Kowi Partner",
  appleWebApp: {
    capable: true,
    title: "Kowi Partner",
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
      <body className="antialiased">
        <PullReload>{children}</PullReload>
      </body>
    </html>
  );
}
