import { Inter } from "next/font/google";
import { NextIntlClientProvider, useMessages } from "next-intl";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "RSVP Reakcijas Tests",
  description: "RSVP reakcijas tests",
};

export default function RootLayout({ children, params: { locale } }) {
  const messages = useMessages();

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
