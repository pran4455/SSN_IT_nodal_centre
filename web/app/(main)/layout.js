import "../globals.css";
import { GeistSans } from "geist/font/sans";
import Providers from "@/context/DashboardProviders";

export const revalidate = 0

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "SSN Information Technology",
  description: "SSN Information Technology",
};

export default async function RootLayout({
  children,
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body>
        <Providers>
            {children}
        </Providers>
      </body>
    </html>
  );
}
