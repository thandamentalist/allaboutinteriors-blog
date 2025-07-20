import type { Metadata } from "next"
import { Playfair_Display, Inter } from "next/font/google"
import "./globals.css"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  title: "AllAboutInteriors.ai - Beautiful Rabbit Holes for Everyone Who Cares About Spaces",
  description: "Interior design tools, ideas, and opinions—for designers, builders, homeowners, and the obsessed.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-sans antialiased bg-[#FAF9F6] text-[#111111]">
        {children}
      </body>
    </html>
  )
}