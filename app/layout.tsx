import type { Metadata, Viewport } from "next";
import { ThemeRuntime } from "./ThemeRuntime";

export const metadata: Metadata = {
  title: "Checktrail",
  description: "Party games powered by Supabase",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="/ui/theme/overrides.css" />
        <script src="/ui/theme/apply-theme.js" />
      </head>
      <body style={{ margin: 0 }}>
        <ThemeRuntime />
        {children}
        <script src="/ui/theme/preview-bridge.js" />
      </body>
    </html>
  );
}
