
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'RSVP Reakcijas Tests',
  description: 'RSVP reakcijas tests',
}

export default function RootLayout({ children }) {
  return (
    <html lang="lv">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
