import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'The Cold Case of Eleanor Ash',
  description: 'A noir detective puzzle game',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Special+Elite&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  )
}
